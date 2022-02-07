const Camera = (resolution) => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  resolution = resolution;
  spacing = width / resolution;
  focalLen = height / width;
  range = isMobile ? 9 : 18;
  lightRange = 9;
  scale = canvas.width / 1200;
    

  const drawSky = () => {
    dir = game.player.dir;
    sky = game.map.skybox;
    ambient = game.map.light;
    width = sky.width * (height / sky.height) * 2;
    left = (dir / circle) * -width;

    ctx.save();
    ctx.drawImage(sky.image, left, 0, width, height);
    if (left < width - width) {
      ctx.drawImage(sky.image, left + width, 0, width, height);
    }
    if (ambient > 0) {
      ctx.fillStyle = '#fff';
      ctx.globalAlpha = ambient * 0.1;
      ctx.fillRect(0, height * 0.5, width, height * 0.5);
    }
    ctx.restore();
  }

  const drawCols = () => {
    let x, angle, ray;

    ctx.save();

    for (var col=0; col<resolution; col++) {
      x = col / resolution - 0.5;
      angle = Math.atan2(x, focalLen);
      ray = game.map.cast(game.player, game.player.dir + angle, range);

      drawCol(col, ray, angle);
    }

    ctx.restore();
  }

  const drawCol = (col, ray, angle) => {
    var step, drops, rain, texX, wall;
    var tex1 = game.map.wall;
    var tex2 = game.map.speaker;
    var left = Math.floor(col * spacing);
    var width = Math.ceil(spacing);
    var hit = -1;

    // Find the next wall hit.
    while (++hit < ray.length && ray[hit].height <= 0);

    // Draw the wall sections and rain drops.
    for (var i=ray.length - 1; i>=0; i--) {
      step = ray[i];
      drops = Math.pow(Math.random(), 100) * i;
      rain = (drops > 0) && project(0.2, angle, step.dist);

      var tex = (step.type === 1) ? tex1 : tex2;

      if (i === hit) {
        texX = Math.floor(tex.width * step.offset);
        wall = project(step.height, angle, step.dist);

        ctx.globalAlpha = 1;
        ctx.drawImage(tex.image, texX, 0, 1, tex.height, left, wall.top, width, wall.height);

        ctx.fillStyle = '#000';
        ctx.globalAlpha = Math.max((step.dist + step.shading) / lightRange - game.map.light, 0);
        ctx.fillRect(left, wall.top, width, wall.height);
      }

      ctx.fillStyle = '#fff';
      ctx.globalAlpha = 0.15;
      while (--drops > 0) {
        ctx.fillRect(left, Math.random() * rain.top, 1, rain.height);
      }
    }
  }


  const drawHand = () => {
    var hand = game.player.hand;
    var steps = game.player.steps;
    var scaleFactor = scale * 6;

    // Calculate the position of each hand relative to the steps taken.
    var xScale = Math.cos(steps * 2);
    var yScale = Math.sin(steps * 4);
    var bobX = xScale * scaleFactor;
    var bobY = yScale * scaleFactor;
    var x = (canvas.width - (hand.width * scale) + scaleFactor) + bobX;
    var y = (canvas.height - (hand.height * scale) + scaleFactor) + bobY;
    var w = hand.width * scale;
    var h = hand.height * scale;

    ctx.drawImage(hand.image, x, y, w, h);
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
};

