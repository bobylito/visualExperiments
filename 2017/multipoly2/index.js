// c  is defined in the window because of the ID of the canvas element
var box = c.getBoundingClientRect();
var W = c.width = 1024;
var H = c.height = 1024 * (box.height / box.width);

var ctx = c.getContext('2d');

ctx.strokeStyle = '#fff';
ctx.fillStyle = '#fff';
// ctx.shadowBlur = 10;
// ctx.shadowColor = '#fff';
ctx.translate(W / 2, H / 2);

var f = 0;

requestAnimationFrame(function render() {
  try {
    requestAnimationFrame(render);
    f++;
    var poly = multipoly(f);

    ctx.clearRect(-W / 2, -H / 2, W, H);

    drawPoly(poly);
  } catch(e) {
    alert(e.toString());
  }
});

function drawPoly(s) {
  ctx.beginPath();
  s.forEach(p => {
    ctx.lineTo(p[0], p[1]);
  });
  ctx.closePath();
  ctx.fill();
}

function manySquares(f) {
  var squares = [];
  for(var i = 0; i < 25; i++) {
    squares.push(square(20 * i + 13, Math.PI / 700 * f * i + Math.PI / 3 * i));
    squares.push(square(20 * i + 13, - Math.PI / 700 * f  * i+ Math.PI / 2 + Math.PI / 7 * i));
  }
  return squares;
}

function multipoly(f) {
  var points = square(100, Math.PI / 700 * f).
    concat(square(100, - Math.PI / 700 * f));
  return pointsToPath(points);
}

function pointsToPath(pts) {
  const ptsWithAngle = pts.map(p => ({
    ...p,
    angle: Math.atan2(p[1], p[0])
  }));
  ptsWithAngle.sort((a, b) => b.angle - a.angle);
  return ptsWithAngle;

  // get angle of all points
  // sort by angle
}

function distance(a, b) {
  return (b[0] - a[0]) / (b[1] - a[1]);
}

function square(w, i) {
  return rotate(
    translate(
    [
      [0, 0],
      [0, w],
      [w, w],
      [w, 0],
    ], 
    [-0.5 * w, -0.5 * w]),
    i);
}

function translate(poly, v) {
  poly.forEach(p => { 
    p[0] = p[0] + v[0];
    p[1] = p[1] + v[1];
  });
  return poly;
}  

function rotate(poly, t) {
  return poly.map(p => [
    Math.cos(t) * p[0] - p[1] * Math.sin(t),
    Math.cos(t) * p[1] + p[0] * Math.sin(t)
  ]);
}
