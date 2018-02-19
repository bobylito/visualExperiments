// c  is defined in the window because of the ID of the canvas element
var box = c.getBoundingClientRect();
var W = c.width = 1024;
var H = c.height = 1024 * (box.height / box.width);

var ctx = c.getContext('2d');

ctx.strokeStyle = '#fff';
ctx.fillStyle = '#fff';
ctx.translate(W / 2, H / 2);

const maxFrameToReset = 300;

ctx.font = "100px monospace";
const txt ='LED fantastic technology, <3     ';
const txtLength = ctx.measureText(txt).width;

ctx.textBaseline = 'middle';
ctx.textAlign = 'left';

drawGrid(ctx);
ctx.fillStyle = '#fff';
ctx.clip();

loop(frame => {
  ctx.clearRect(-W / 2, -H / 2, W, H);
  // Move faster
  const f = frame * 2;

  const steppedFrame = div(f, 20) * 20;

  ctx.fillStyle = '#f00';
  ctx.fillRect(-196 + steppedFrame % maxFrameToReset, -50 , 100, 100);

  ctx.fillStyle = 'rgb(254, 170, 58)';
  ctx.fillRect(-196 + (steppedFrame + 100) % maxFrameToReset, -50, 100, 100);

  ctx.fillStyle = 'rgb(47, 255, 32)';
  ctx.fillRect(-196 + (steppedFrame + 200) % maxFrameToReset, -50, 100, 100);

  ctx.fillStyle = '#000';
  ctx.fillText('LED fantastic technology, <3', 180 - steppedFrame % txtLength, 5);
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
  // 7 > 2 Pi but doesn't rely on a float constant
  ctx.arc(pos[0], pos[1], d, 0, 2 * Math.PI);
}

function div(a, b) {
  return Math.trunc(a/b);
}
