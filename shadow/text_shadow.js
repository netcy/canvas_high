var code = '',
  canvas = null,
  ctx = null;
var points = [];
var drawFunctions = {
  '立体文字': function () {
    ctx.save();
    ctx.shadowColor = 'blue';
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 3;
    ctx.fillStyle = 'red';
    ctx.font = "100px Arial";
    ctx.fillText('立体文字效果',100,100);
    ctx.restore();
  },
  '红蓝文字': function (ctx) {
    ctx.save();
     ctx.translate(100, 100);
     ctx.font = "30px sanif"
     var text = '红蓝文字效果';
     ctx.fillStyle = '#000'
     ctx.shadowBlur = 0;
     ctx.shadowColor = 'red';
     ctx.shadowOffsetX = -3;
     ctx.fillText(text, 0, 0);

     ctx.fillStyle = '#000'
     ctx.shadowBlur = 0;
     ctx.shadowColor = 'cyan';
     ctx.shadowOffsetX = 3;
     ctx.fillText(text, 0, 0);
     ctx.restore();
  },
  '霓虹灯文字':function () {
     var shadows = '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff00de, 0 0 70px #ff00de, 0 0 80px #ff00de, 0 0 100px #ff00de, 0 0 150px #ff00de'; //霓虹灯效果
      var parseShadows = parseShadow(shadows);
      console.log(parseShadows);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.translate(100, 100);
      ctx.font = "60px  Helvetica, sans-serif"
      var text = '霓虹灯文字';
      ctx.fillStyle = '#fff';
      for (var i = 0; i < parseShadows.length; i++) {
        var shadow = parseShadows[i];
        ctx.shadowBlur = shadow.blur; //* window.devicePixelRatio;

        var width = 0;

        ctx.shadowOffsetX = shadow.x + width;
        ctx.shadowOffsetY = shadow.y;
        ctx.shadowColor = shadow.color;
        ctx.fillText(text, -width, 0);
      }
  }
};

function parseShadow(shadows) {
  shadows = shadows.split(", ");
  var ret = [];
  for (var n = 0, length = shadows.length; n < length; n++) {
    var shadow = shadows[n].split(" ");
    var type = shadow[0].replace(parseFloat(shadow[0]), "");
    if (type == "em") {
      var obj = {
        x: metrics.em * parseFloat(shadow[0]),
        y: metrics.em * parseFloat(shadow[1])
      };
    } else {
      var obj = {
        x: parseFloat(shadow[0]),
        y: parseFloat(shadow[1])
      };
    }
    if (shadow[3]) {
      obj.blur = parseFloat(shadow[2]);
      obj.color = shadow[3];
    } else {
      obj.blur = 0;
      obj.color = shadow[2];
    }
    ret.push(obj);
  }
  return ret;
};

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
  for (var i = 0; i < 5; i++) {
    points.push({
      x: Math.random() * (canvas.width - 200) + 100,
      y: Math.random() * (canvas.height - 200) + 100,
    });
  }
  draw();
}

function drawRect(ctx, rect_width, rect_height) {
  ctx.beginPath();
  ctx.rect(-rect_width / 2, -rect_height / 2, rect_width, rect_height);
  ctx.stroke();
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
