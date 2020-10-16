var code = null,
  canvas = null,
  ctx = null;
drawFunctions = {
  linear: function (ctx) {
    var grd = ctx.createLinearGradient(100, 100, 500, 100)
    grd.addColorStop(0, '#E55D87');
    grd.addColorStop(1, '#5FC3E4');
    ctx.fillStyle = grd;
    ctx.fillRect(100, 100, 400, 300);
  },
  radial: function (ctx) {
    var grd = ctx.createRadialGradient(200, 200, 50, 200, 200, 100);
    grd.addColorStop(0.1, '#F09819');
    grd.addColorStop(1, '#EDDE5D');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(200, 200, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  },

  radial2: function (ctx) {
    var grd = ctx.createRadialGradient(150, 200, 50, 200, 200, 100);
    grd.addColorStop(0.1, '#F09819');
    grd.addColorStop(1, '#EDDE5D');
    ctx.fillStyle = grd;
    ctx.fillRect(0,0,1000,1000);
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
