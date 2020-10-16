

function init() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  var img = new Image();
  
  img.src = './d.png';
  // img.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png';
  img.onload = function () {
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0, 200, 200);

    ctx.mozImageSmoothingEnabled = true;
    ctx.webkitImageSmoothingEnabled = true;
    ctx.msImageSmoothingEnabled = true;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "low";
    ctx.drawImage(img, 201,0, 200, 200);

    ctx.imageSmoothingQuality = "medium";
    ctx.drawImage(img, 0, 201, 200, 200);

    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 201, 201, 200, 200);
  };
 
}

