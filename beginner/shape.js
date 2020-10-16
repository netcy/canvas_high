var code = 'path1',
  canvas = null,
  ctx = null;
drawFunctions = {
  path1: function (ctx) {
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(500, 500);
    ctx.lineTo(500, 100);
    ctx.lineTo(100, 100);
    ctx.stroke();
  },
  path2:function (ctx) {
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(500, 500);
    ctx.lineTo(500, 100);
    ctx.closePath();
    ctx.stroke();
  },
  rect1: function (ctx) {
    ctx.beginPath();
    ctx.rect(100, 100, 100, 100);
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(300, 100, 100, 100);
    ctx.fill();
  },
  rect2: function (ctx) {
    ctx.beginPath();
    ctx.strokeRect(100, 100, 100, 100);
    ctx.fillRect(300, 100, 100, 100);
  },
  circle:function (ctx) {
    ctx.beginPath();
    ctx.arc(300, 300, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }
}

function init() {
  canvas = document.getElementById('can');
  ctx = canvas.getContext('2d');
  draw();
  var select = document.getElementById('select');
  Object.keys(drawFunctions).forEach(function (key) {
    createOptoin(key, select);
  });
  select.onchange = function () {
    code = select.value;
    draw();
  }
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
