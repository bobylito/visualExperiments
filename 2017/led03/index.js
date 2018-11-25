try {
  // c  is defined in the window because of the ID of the canvas element
  const box = c.getBoundingClientRect();
  const W = c.width = 1024;
  const H = c.height = 1024 * (box.height / box.width);

  const ctx = c.getContext('2d');
  // ctx.strokeStyle = '#fff';
  // ctx.fillStyle = '#fff';
  // ctx.translate(W / 2, H / 2);

  // init off canvas for smaller size diplay
  const offC = document.createElement('canvas');
  offC.width = 50;
  offC.height = 50 * H / W;
  const offCtx = offC.getContext('2d');

  // ctx.font = "100px monospace";
  // ctx.textBaseline = 'middle';
  // ctx.textAlign = 'left';
  // const txt ='LED fantastic technology, <3     ';
  // const txtLength = ctx.measureText(txt).width;

  const maxFrameToReset = 300;

  loop(frame => {
    ctx.clearRect(-W / 2, -H / 2, W, H);
    // Move faster
    const f = frame * 2;

    //const steppedFrame = div(f, 20) * 20;

    offCtx.clearRect(0, 0, offC.width, offC.height);
    offCtx.fillStyle = '#fff';
    offCtx.fillRect(9 + f, 0 , 10, 7);

    ctx.putImageData(offCtx.getImageData(0, 0, offC.width, offC.height), 10, 10);
    
    // ctx.fillStyle = 'rgb(254, 170, 58)';
    // ctx.fillRect(-196 + (steppedFrame + 100) % maxFrameToReset, -50, 100, 100);

    // ctx.fillStyle = 'rgb(47, 255, 32)';
    // ctx.fillRect(-196 + (steppedFrame + 200) % maxFrameToReset, -50, 100, 100);

    // ctx.fillStyle = '#000';
    // ctx.fillText('LED fantastic technology, <3', 180 - steppedFrame % txtLength, 5);

    const pixels = offCtx.getImageData(0, 0, offC.width, offC.height);

    let out = '';
    for(let i = 0; i < offC.height; i++) {
      for(let j = 0; j < offC.width; j++) {
        const cursor = (i * offC.width + j) * 4;
        const pixel = [
          pixels.data[cursor],
          pixels.data[cursor + 1],
          pixels.data[cursor + 2],
          // pixels.data[cursor + 3] / 255,
        ];
        const color = 'rgb(' + [255, i, 255].join(',') + ')';// 'rgba(' + pixel.join(',') + ')';
        // out += JSON.stringify(pixel);
        // out += ' - ' + [i, j, cursor].join('/');
        ctx.fillStyle = color;
        drawDisc(ctx, [j * 7 + 50, i * 7 + 50], 2);
        ctx.fill();
      }
      // out += '\n';
    }
    // alert(out);
    // alert('are we there? ' + f);
    throw new Error();
  });

  /*
   * ctx: canvas 2d context
   */
  function drawGrid(ctx) {
    const yMax = 20 * H / W;
    for(let x = -10; x < 10; x++) {
      for(let y = -yMax / 2; y < yMax / 2; y++) {
        drawDisc(ctx, [x * 10 , y * 10], 4);
      }
    }
  }
  // 
  function drawDisc(ctx, pos, d) {
    ctx.moveTo(pos[0], pos[1]);
    ctx.arc(pos[0], pos[1], d, 0, 2 * Math.PI);
  }

  function div(a, b) {
    return Math.trunc(a/b);
  }
} catch(e) {
  alert(e);
}
