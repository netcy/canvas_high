// https://developer.mozilla.org/zh-CN/docs/Web/API/OffscreenCanvas
// https: //developers.google.com/web/updates/2018/08/offscreen-canvas

function init() {
    var canvasInWindow = document.getElementById('canvas-window');
    var ctx = canvasInWindow.getContext('2d');
    var circle = new Circle(ctx);
    circle.animate();
    canvasInWindow.addEventListener('click', function () {
      circle.changeColor();
    });

    var canvasInWorker = document.getElementById('canvas-worker');
    // var ctxInWorkder = canvasInWorker.getContext('2d');
    var offscreen = canvasInWorker.transferControlToOffscreen();
    var worker = new Worker('./worker.js');
    worker.postMessage({ msg: 'start', canvas: offscreen }, [offscreen]);

    canvasInWorker.addEventListener('click', function () {
      worker.postMessage({msg:'changeColor'});
    });
    // canvasInWorker.getContext('2d'); // 会报错
}

function heavyTask() {
   fibonacci(41);
}

function fibonacci(num) {
  return (num <= 1) ? 1 : fibonacci(num - 1) + fibonacci(num - 2);
}

class Circle {
   constructor(ctx){
     this.ctx = ctx;
     this.r = 0;
     this.rMax = 50;
     this.color = 'black';
     this.bindAnimate = this.animate.bind(this);
   }

   draw(){
     this.ctx.fillStyle = this.color;
     this.ctx.beginPath();
     this.ctx.arc(this.ctx.canvas.width/2,this.ctx.canvas.height/2,this.r,0,Math.PI*2);
     this.ctx.fill();
   }

   animate(){
      
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.r =  this.r + 1;
      if(this.r > this.rMax){
        this.r = 0;
      }
      this.draw();
      requestAnimationFrame(this.bindAnimate);
   }

   changeColor(){
     fibonacci(41);
     if(this.color == 'black'){
       this.color = 'blue';
     }else{
       this.color = 'black';
     }
     this.r = 0;
   }
}

