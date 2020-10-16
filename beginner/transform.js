var code = null,
  canvas = null,
  ctx = null;
drawFunctions = {
  none: function (ctx) {
    ctx.save();
    ctx.font = "40px Arial";
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 4;
    ctx.strokeText("Hello world", 100, 100)
    ctx.fillText("Hello world", 100, 100)
    ctx.restore();
  },
  translate: function (ctx) {
    drawFunctions.none(ctx);
    ctx.save();
    ctx.translate(100, 100);
    ctx.font = "40px Arial";
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 4;
    ctx.strokeText("Hello world", 100, 100)
    ctx.fillText("Hello world", 100, 100)
    ctx.restore();
  },
  scale: function (ctx) {
    drawFunctions.none(ctx);
    ctx.save();
    ctx.scale(2,2);
    ctx.font = "40px Arial";
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 4;
    ctx.strokeText("Hello world", 100, 100)
    ctx.fillText("Hello world", 100, 100)
    ctx.restore();
  },
  rotate: function (ctx) {
    drawFunctions.none(ctx);
    ctx.save();
    ctx.rotate(0.5);
    ctx.font = "40px Arial";
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 4;
    ctx.strokeText("Hello world", 100, 100)
    ctx.fillText("Hello world", 100, 100)
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
