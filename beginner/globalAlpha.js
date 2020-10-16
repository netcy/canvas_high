var code = null,
  canvas = null,
  ctx = null;
drawFunctions = {
  globalAlpha: function (ctx) {
    ctx.save();
    ctx.fillStyle = 'red';
    ctx.fillRect(100,100,200,100);
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = 'blue';
    ctx.fillRect(200, 150, 200, 100);
    ctx.restore();
  },
  colorAlpha: function (ctx) {
    ctx.save();
    ctx.fillStyle = 'red';
    ctx.fillRect(100, 100, 200, 100);
    ctx.fillStyle = 'rgba(0,0,255,0.5)';
    ctx.fillRect(200, 150, 200, 100);
    ctx.restore();
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
