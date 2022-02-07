import { useContext, useState } from "react";

import GameContext from "../contexts/GameContext";
import { circle, isMobile } from '../constants'

const useCamera = (cameraResolution) => {
  const {state: {canvas, canvasContext, map, player}} = useContext(GameContext);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, ] = useState(window.innerHeight);
  canvas.height = height;
  canvas.width = width;
  const [resolution, ] = useState(cameraResolution);
  const focalLen = height / width;
  const spacing = width / resolution;
  const range = isMobile ? 9 : 18;
  
  const lightRange = 9;
  const scale = canvas.width / 1200;
    

  const drawSky = () => {
    const dir = player.dir;
    const sky = map.skybox;
    const ambient = map.light;
    setWidth(sky.width * (height / sky.height) * 2);
    const left = (dir / circle) * -width;

    canvasContext.save();
    canvasContext.drawImage(sky.image, left, 0, width, height); 
    if (left < width - width) {
      canvasContext.drawImage(sky.image, left + width, 0, width, height);
    }
    if (ambient > 0) {
      canvasContext.fillStyle = '#fff';
      canvasContext.globalAlpha = ambient * 0.1;
      canvasContext.fillRect(0, height * 0.5, width, height * 0.5);
    }
    canvasContext.restore();
  }

  const drawCols = () => {
    let x, angle, ray;

    canvasContext.save();

    for (let col=0; col<resolution; col++) {
      x = col / resolution - 0.5;
      angle = Math.atan2(x, focalLen);
      ray = map.cast(player, player.dir + angle, range);

      drawCol(col, ray, angle);
    }

    canvasContext.restore();
  }

  const drawCol = (col, ray, angle) => {
    let step, drops, rain, texX, wall;
    const tex1 = map.wall;
    const tex2 = map.speaker;
    const left = Math.floor(col * spacing);
    const width = Math.ceil(spacing);
    let hit = -1;

    // Find the next wall hit.
    while (++hit < ray.length && ray[hit].height <= 0);

    // Draw the wall sections and rain drops.
    for (let i=ray.length - 1; i>=0; i--) {
      step = ray[i];
      drops = Math.pow(Math.random(), 100) * i;
      rain = (drops > 0) && project(0.2, angle, step.dist);

      var tex = (step.type === 1) ? tex1 : tex2;

      if (i === hit) {
        texX = Math.floor(tex.width * step.offset);
        wall = project(step.height, angle, step.dist);

        canvasContext.globalAlpha = 1;
        canvasContext.drawImage(tex.image, texX, 0, 1, tex.height, left, wall.top, width, wall.height);

        canvasContext.fillStyle = '#000';
        canvasContext.globalAlpha = Math.max((step.dist + step.shading) / lightRange - map.light, 0);
        canvasContext.fillRect(left, wall.top, width, wall.height);
      }

      canvasContext.fillStyle = '#fff';
      canvasContext.globalAlpha = 0.15;
      while (--drops > 0) {
        canvasContext.fillRect(left, Math.random() * rain.top, 1, rain.height);
      }
    }
  }


  const drawHand = () => {
    const hand = player.hand;
    const steps = player.steps;
    const scaleFactor = scale * 6;

    // Calculate the position of each hand relative to the steps taken.
    const xScale = Math.cos(steps * 2);
    const yScale = Math.sin(steps * 4);
    const bobX = xScale * scaleFactor;
    const bobY = yScale * scaleFactor;
    const x = (canvas.width - (hand.width * scale) + scaleFactor) + bobX;
    const y = (canvas.height - (hand.height * scale) + scaleFactor) + bobY;
    const w = hand.width * scale;
    const h = hand.height * scale;

    canvasContext.drawImage(hand.image, x, y, w, h);
  }

  const project = (height, angle, dist) => {
    var z = dist * Math.cos(angle);
    var wallH = height * height / z;
    var bottom = height / 2 * (1 + 1 / z);

    return {
      top: bottom - wallH,
      height: wallH
    };
  }

  const render = () =>{
    drawSky();
    drawCols();
    drawHand();
  }

  return {drawSky, drawCols, drawHand, render};
};

export default useCamera;
