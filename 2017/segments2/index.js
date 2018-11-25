// c  is defined in the window because of the ID of the canvas element
const box = c.getBoundingClientRect();
const W = c.width = 1024;
const H = c.height = 1024 * (box.height / box.width);
const screen = {
  width: W,
  height: H,
  bottomLeft: [-W / 2, -H / 2],
  topRight: [W / 2, H / 2]
};
const margins = [50, 30];

const ctx = c.getContext('2d');

ctx.strokeStyle = '#fff';
ctx.fillStyle = '#000';
ctx.translate(W / 2, H / 2);
ctx.lineWidth = 1;

let lines = makeLines(screen, margins, 20, 5);

loop(frame => {
  ctx.clearRect(screen.bottomLeft[0], screen.bottomLeft[1], W, H);

  lines.forEach(l => {
    fillPoly(ctx, l);
    strokePoly(ctx, l, true);
  });
});

function makeLines(screen, margins, nbLines, nbPieces) {
  const displayHeight = (screen.height - 2 * margins[1]);
  const verticalLineSpacing = displayHeight / nbLines;
  let lines = [];
  for(let i = nbLines - 1; i > 0; i--) {
    const y = screen.bottomLeft[1] + margins[1] + i * verticalLineSpacing;
    lines.push(makeLine(screen, margins, y, nbPieces));
  }
  return lines;
}

function makeLine(screen, margins, y, nbPieces) {
  const displayWidth = (screen.width - 2 * margins[0]);
  const pieceWidth = displayWidth / nbPieces;
  const startX = screen.bottomLeft[0] + margins[0];
  let path = [];
  for(var i = 0; i < nbPieces; i++) {
    const entropy = Math.tan(i);
    path.push([Math.trunc(startX + i * pieceWidth), Math.trunc(y)]);
  }
  path.push([Math.trunc(startX + i * pieceWidth + 1), Math.trunc(y)])
  return path;
}


function fillPoint(ctx, point) {
  ctx.beginPath();
  ctx.arc(point[0], point[1], 5, 0, 7);
  ctx.fill();
}

function palette(i) {
  return 'hsl(' + (i * 20 + 190) + ', 60%, 60%)';
}
