function loop(fn) {
  let f = 0;
  requestAnimationFrame(function render() {
    try {
      requestAnimationFrame(render);
      f++;

      fn(f);
    } catch(e) {
      alert('Error: ' + e.message + '. In ' + e.fileName + ' at l.' + e.lineNumber);
    }
  });
}

function polyToPath(ctx, s, pathOpen) {
  ctx.beginPath();
  s.forEach(p => {
    ctx.lineTo(p[0], p[1]);
  });
  if(!pathOpen) ctx.closePath();
}

function fillPoly(ctx, s) {
  polyToPath(ctx, s);
  ctx.fill();
}

function strokePoly(ctx, s, pathOpen) {
  polyToPath(ctx, s, pathOpen);
  ctx.stroke();
}

var drawPoly = strokePoly;

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

function poly(w, n) {
  const angle = (Math.PI * 2) / n;
  let poly = [];
  for(let i = 0; i < n; i++) {
    poly.push([
      w * Math.cos(i * angle),
      w * Math.sin(i * angle)
    ]);
  }
  return poly;
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

function pointsToPath(pts) {
  const ptsWithAngle = pts.map(p => ({
    ...p,
    angle: Math.atan2(p[1], p[0])
  }));
  ptsWithAngle.sort((a, b) => b.angle - a.angle);
  return ptsWithAngle;
}

function dir(a, b) {
  return [
    b[0] - a[0],
    b[1] - a[1]
  ];
}

function mul(scal, v) {
  return v.map(x => scal * x);
}

function add(v1, v2) {
  if(v1.length !== v2.length) throw new Error('Cannot add vectors, must have the same size');
  return v1.map((p1, i) => p1 + v2[i]);
}
