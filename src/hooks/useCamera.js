import { useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';

import CanvasContext from '../contexts/CanvasContext';
import useMap from './useMap';
import { selectDir, selectSteps } from '../redux/slices/player';
import { selectLight } from '../redux/slices/map';
import { circle, hand, isMobile, skybox, speaker, wall } from '../constants';

const cameraWidth = window.innerWidth;
const cameraHeight = window.innerHeight;
const resolution = isMobile ? 256 : 512;
const spacing = cameraWidth / resolution;
const focalLen = cameraHeight / cameraWidth;
const range = isMobile ? 9 : 18;
const lightRange = 9;
const scale = cameraWidth / 1200;

const useCamera = () => {
  const dir = useSelector(selectDir);
  const ambient = useSelector(selectLight);
  const steps = useSelector(selectSteps);
  const canvasContext = useContext(CanvasContext);
  const map = useMap();

  const drawSky = useCallback(() => {
    const width = skybox.width * (cameraHeight / skybox.height) * 2;
    const left = (dir / circle) * -width;

    canvasContext.save();
    canvasContext.drawImage(skybox.image, left, 0, width, cameraHeight);
    if (left < width - cameraWidth) {
      canvasContext.drawImage(
        skybox.image,
        left + width,
        0,
        width,
        cameraHeight
      );
    }
    if (ambient > 0) {
      canvasContext.fillStyle = '#fff';
      canvasContext.globalAlpha = ambient * 0.1;
      canvasContext.fillRect(
        0,
        cameraHeight * 0.5,
        cameraWidth,
        cameraHeight * 0.5
      );
    }
    canvasContext.restore();
  }, [ambient, canvasContext, dir]);

  const project = useCallback((height, angle, dist) => {
    const z = dist * Math.cos(angle);
    const wallH = (cameraHeight * height) / z;
    const bottom = (cameraHeight / 2) * (1 + 1 / z);

    return {
      top: bottom - wallH,
      height: wallH,
    };
  }, []);

  const drawCol = useCallback(
    (col, ray, angle) => {
      const left = Math.floor(col * spacing);
      const width = Math.ceil(spacing);
      let hit = -1;

      // Find the next wall hit.
      while (++hit < ray.length && ray[hit].height <= 0);

      // Draw the wall sections and rain drops.
      for (let i = ray.length - 1; i >= 0; i--) {
        const step = ray[i];
        let drops = Math.pow(Math.random(), 100) * i;
        const rain = drops > 0 && project(0.2, angle, step.dist);

        const tex = step.type === 1 ? wall : speaker;

        if (i === hit) {
          const texX = Math.floor(tex.width * step.offset);
          const wall = project(step.height, angle, step.dist);

          canvasContext.globalAlpha = 1;
          canvasContext.drawImage(
            tex.image,
            texX,
            0,
            1,
            tex.height,
            left,
            wall.top,
            width,
            wall.height
          );

          canvasContext.fillStyle = '#000';
          canvasContext.globalAlpha = Math.max(
            (step.dist + step.shading) / lightRange - ambient,
            0
          );
          canvasContext.fillRect(left, wall.top, width, wall.height);
        }

        canvasContext.fillStyle = '#fff';
        canvasContext.globalAlpha = 0.15;
        while (--drops > 0) {
          canvasContext.fillRect(
            left,
            Math.random() * rain.top,
            1,
            rain.height
          );
        }
      }
    },
    [canvasContext, ambient, project]
  );

  const drawCols = useCallback(() => {
    canvasContext.save();
    for (let col = 0; col < resolution; col++) {
      const x = col / resolution - 0.5;
      const angle = Math.atan2(x, focalLen);
      const ray = map.cast(dir + angle, range);
      drawCol(col, ray, angle);
    }
    canvasContext.restore();
  }, [canvasContext, drawCol, dir, map]);

  const drawHand = useCallback(() => {
    const scaleFactor = scale * 6;
    const xScale = Math.cos(steps * 2);
    const yScale = Math.sin(steps * 4);
    const bobX = xScale * scaleFactor;
    const bobY = yScale * scaleFactor;
    const x = cameraWidth - hand.width * scale + scaleFactor + bobX;
    const y = cameraHeight - hand.height * scale + scaleFactor + bobY;
    const w = hand.width * scale;
    const h = hand.height * scale;
    canvasContext.drawImage(hand.image, x, y, w, h);
  }, [canvasContext, steps]);

  const render = useCallback(() => {
    if (canvasContext) {
      drawSky();
      drawCols();
      drawHand();
    }
  }, [canvasContext, drawCols, drawHand, drawSky]);

  return { render };
};

export default useCamera;
