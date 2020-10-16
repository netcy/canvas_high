var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var plane = {
  width: 500, // 宽
  height: 500, // 高
  normal: [0, 0, 1], // 朝向，即法向量
  color: {
    r: 255,
    g: 0,
    b: 0
  } // 颜色为红色
}

var pointLight = {
  position: [250, 250, 60],
  color: {
    r: 255,
    g: 255,
    b: 255,
    a: 255,
  }
}

var imageData = ctx.createImageData(plane.width, plane.height);

var image = new Image();
image.onload = function () {
  image.__loaded = true;
};
image.src = "diffuse.png";

function draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canvas.width,canvas.height);
    if (image.__loaded) {
      ctx.drawImage(image, 10, 10, 500, 500);
    }
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (var x = 0; x < imageData.width; x++) {
      for (var y = 0; y < imageData.height; y++) {
        var index = y * imageData.width + x;

        var position = [x, y, 0];
        var normal = [0, 0, 1];

        var currentToLight = normalize(sub(pointLight.position, position));
        var light = dot(currentToLight, normal);

        var r = imageData.data[index * 4];
        var g = imageData.data[index * 4 + 1];
        var b = imageData.data[index * 4 + 2];
        var a = imageData.data[index * 4 + 3];

        // imageData.data[ index * 4 ] = Math.min( 255, ( pointLight.color.r + r ) * light );
        // imageData.data[ index * 4 + 1 ] =  Math.min( 255, ( pointLight.color.g + g ) * light );
        // imageData.data[ index * 4 + 2 ] =  Math.min( 255, ( pointLight.color.b + b ) * light );
        // imageData.data[ index * 4 + 3 ] = 255;

        imageData.data[index * 4] = Math.min(255, (pointLight.color.r * r) / 255 * light);
        imageData.data[index * 4 + 1] = Math.min(255, (pointLight.color.g * g) / 255 * light);
        imageData.data[index * 4 + 2] = Math.min(255, (pointLight.color.b * b) / 255 * light);
        imageData.data[index * 4 + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);
}

document.addEventListener('mousemove', function (e) {
  pointLight.position[0] = e.clientX - 100
  pointLight.position[1] = e.clientY - 100
  draw()
}, false)

document.addEventListener('wheel', function (e) {
  pointLight.position[2] += e.deltaY * 0.04;

  draw()
}, false)

draw();

function sub(v1, v2) {
  return [
    v1[0] - v2[0],
    v1[1] - v2[1],
    v1[2] - v2[2]
  ]
}

function dot(v1, v2) {
  return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
}

function length(v) {
  var len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  return len;
}

function normalize(v) {
  var len = length(v);
  return [
    v[0] / len,
    v[1] / len,
    v[2] / len
  ]
}