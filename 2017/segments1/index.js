// c  is defined in the window because of the ID of the canvas element
var box = c.getBoundingClientRect();
var W = c.width = 1024;
var H = c.height = 1024 * (box.height / box.width);

var ctx = c.getContext('2d');

ctx.strokeStyle = '#fff';
ctx.fillStyle = '#fff';
ctx.translate(W / 2, H / 2);
ctx.shadowColor = '#fff';
ctx.shadowBlur = 10;
ctx.shadowColor = '#fff';

const polyPath = rotate(polyAngle(200, 5, Math.PI * 4/5), Math.PI * 3 / 2).reverse();
const speed = 10;

loop(frame => {
  ctx.clearRect(-W / 2, -H / 2, W, H);

  ctx.strokeStyle = palette(frame);
  strokePoly(ctx, flare(frame, speed), true);
  ctx.strokeStyle = palette(frame + 20);
  strokePoly(ctx, flare(frame + 20, speed), true);
  ctx.strokeStyle = palette(frame + 40);
  strokePoly(ctx, flare(frame + 40, speed), true);
});

function flare(frame, speed) {
  const facetA = getCurrentFacet(polyPath, frame / speed);
  const facetB = getCurrentFacet(polyPath, (frame +  speed / 5) / speed);
  const pointA = inSegment(facetA, (frame % speed) / speed);
  const pointB = inSegment(facetB, ((frame + speed / 5) % speed) / speed);

  const sameFacet = facetA[0] === facetB[0]
    && facetA[1] === facetB[1] 
  const pathPoly = sameFacet
    ? [pointA, pointB]
    : [pointA, facetB[0], pointB];

  return pathPoly;
}

function getCurrentFacet(polygon, pos) {
  const startPointIndex = Math.trunc(pos) % polygon.length;
  const endPointIndex = (startPointIndex + 1) % polygon.length;
  return [
    polygon[startPointIndex],
    polygon[endPointIndex]
  ];
}


function inSegment(segment, pos) {
  const a = segment[0];
  const b = segment[1];
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  return [
    a[0] + pos * dx,
    a[1] + pos * dy
  ];
}

function polyAngle(w, n, angle) {
  let poly = [];
  for(let i = 0; i < n; i++) {
    poly.push([
      w * Math.cos(i * angle),
      w * Math.sin(i * angle)
    ]);
  }
  return poly;
}

function fillPoint(ctx, point) {
  ctx.beginPath();
  ctx.arc(point[0], point[1], 5, 0, 7);
  ctx.fill();
}

function palette(i) {
  return 'hsl(' + (i * 20 + 190) + ', 60%, 60%)';
}
