var code = null,
  canvas = null,
  ctx = null;
drawFunctions = {
  stroke: function (ctx) {
    ctx.font = "40px Arial";
    ctx.strokeText("Hello world", 200, 200)
  },
  fill: function (ctx) {
    ctx.font = "40px Arial";
    ctx.fillText("Hello world", 200, 200);
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
