// c  is defined in the window because of the ID of the canvas element
var box = c.getBoundingClientRect();
var W = c.width = 1024;
var H = c.height = 1024 * (box.height / box.width);

var ctx = c.getContext('2d');

ctx.strokeStyle = '#fff';
ctx.fillStyle = '#fff';
ctx.translate(W / 2, H / 2);
ctx.shadowColor = '#fff';

// ctx.globalCompositeOperation = 'xor';

const baseRadius = 50;
const baseFacets = 100;
const steps = 50;
let polygons = [];
let destPolygons = [];
for(var i = 0; i < 12; i++) {
  polygons.push(poly(baseRadius * i, baseFacets + i * 10));
  destPolygons.push(poly2(baseRadius * i, baseFacets + i * 10));
}

loop(frame => {
  ctx.clearRect(-W / 2, -H / 2, W, H);
  polygons = polygons.map((p, i) => morph(p, destPolygons[i], steps));
  polygons.reverse().forEach((p, i) => {
    ctx.fillStyle = palette(i);
    fillPoly(ctx, p)
  });
  polygons.reverse();
  if(frame % steps === 0) {
    destPolygons = destPolygons.map((_, i) => poly2(baseRadius * i, baseFacets + i * 10));
  }
});

function poly2(w, n) {
  const angle = (Math.PI * 2) / n;
  let poly = [];
  for(let i = 0; i < n; i++) {
    const r = 60 * (1.5 - Math.random());
    poly.push([
      (w + r) * Math.cos(i * angle),
      (w + r) * Math.sin(i * angle)
    ]);
  }
  return poly;
}

function morph(polyA, polyB, steps) {
  return polyA.map((pA, i) => {
    const pB = polyB[i % polyB.length];
    const d = dir(pA, pB);
    const b = mul(1 / steps, d);
    return add(pA, b);
  })
}

function palette(i) {
  return 'hsl(' + (i * 20 + 190) + ', 60%, 60%)';
}
