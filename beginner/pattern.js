var code = '',
  canvas = null,
  ctx = null,
  offCan = null;
drawFunctions = {
  repeat: function (ctx) {
    var pattern = ctx.createPattern(offCan,'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 150, 160);
  },
  repeatX: function (ctx) {
    var pattern = ctx.createPattern(offCan, 'repeat-x');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 150, 160);
  },
  repeatY: function (ctx) {
    var pattern = ctx.createPattern(offCan, 'repeat-y');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 150, 160);
  },
  noRepeat: function (ctx) {
    var pattern = ctx.createPattern(offCan, 'no-repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 150, 160);
  },
}

function init() {
  canvas = document.getElementById('can');
  ctx = canvas.getContext('2d');
  var select = document.getElementById('select');
  Object.keys(drawFunctions).forEach(function (key) {
    code = code || key;
    createOptoin(key, select);
  });
  select.onchange = function () {
    code = select.value;
    draw();
  }
  offCan = document.createElement('canvas');
  offCan.width = offCan.height = 22;
  offCtx = offCan.getContext('2d');
  offCtx.arc(11,11,10,0,Math.PI * 2);
  offCtx.fillStyle = 'pink';
  offCtx.fill();
  draw();
}

function createOptoin(value, select) {
  var option = document.createElement('option');
  option.innerText = value;
  option.setAttribute('value', value);
  select && (select.appendChild(option));
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var drawFunction = drawFunctions[code];
  if (drawFunction) {
    drawFunction(ctx);
  }
}
