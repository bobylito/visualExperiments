function loop(fn) {
  let f = 0;
  requestAnimationFrame(function render() {
    try {
      requestAnimationFrame(render);
      f++;

      fn(f);
    } catch(e) {
      alert(e.toString());
    }
  });
}

function drawPoly(ctx, s) {
  ctx.beginPath();
  s.forEach(p => {
    ctx.lineTo(p[0], p[1]);
  });
  ctx.closePath();
  ctx.stroke();
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
