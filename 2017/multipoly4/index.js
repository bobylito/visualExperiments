// c  is defined in the window because of the ID of the canvas element
var box = c.getBoundingClientRect();
var W = c.width = 1024;
var H = c.height = 1024 * (box.height / box.width);

var ctx = c.getContext('2d');

ctx.strokeStyle = '#fff';
ctx.fillStyle = '#fff';
ctx.translate(W / 2, H / 2);

loop(frame => {
  ctx.clearRect(-W / 2, -H / 2, W, H);
  for(let i = 0; i < 20; i++) {
    drawPoly(ctx, rotate(poly(100 + i * 10, 8), (i % 2 ? 1 : -1) * frame / 60 + 100 + i * 100)); 
  }

});
