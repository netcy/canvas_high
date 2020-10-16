 function init() {
   var space = document.getElementById("surface");
   var surface = space.getContext("2d");

   var particles = [];
   var particle_count = 150;
   for (var i = 0; i < particle_count; i++) {
     particles.push(new particle());
   }
   var time = 0;
   var canvasWidth = 480;
   var canvasHeight = 480;
  

   function particle() {

     this.speed = {
       x: -1 + Math.random() * 2,
       y: -5 + Math.random() * 5
     };
     canvasWidth = (document.getElementById("surface").width);
     canvasHeight = (document.getElementById("surface").height);
     this.location = {
       x: canvasWidth / 2,
       y: (canvasHeight / 2) + 35
     };

     this.radius = 1.5 + Math.random() * 1;

     this.life = 10 + Math.random() * 10;
     this.death = this.life;

     this.r = 255;
     this.g = Math.round(Math.random() * 155);
     this.b = 0;
   }

   function ParticleAnimation() {
     surface.globalCompositeOperation = "source-over";
     surface.fillStyle = "rgba(0, 0, 0, 1)";
     surface.fillRect(0, 0, canvasWidth, canvasHeight);
     surface.clearRect(0, 0, canvasWidth, canvasHeight);
     surface.globalCompositeOperation = "lighter";

     for (var i = 0; i < particles.length; i++) {
       var p = particles[i];

       surface.beginPath();
       p.opacity = Math.round(p.death / p.life * 100) / 100
       var gradient = surface.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);
       gradient.addColorStop(0, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")");
       gradient.addColorStop(0.5, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")");
       gradient.addColorStop(1, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", 0)");
       surface.fillStyle = gradient;
       surface.arc(p.location.x, p.location.y, p.radius, Math.PI * 2, false);
       surface.fill();
       p.death--;
       p.radius++;
       p.location.x += (p.speed.x);
       p.location.y += (p.speed.y);

       //regenerate particles
       if (p.death < 0 || p.radius < 0) {
         //a brand new particle replacing the dead one
         particles[i] = new particle();
       }
     }

     requestAnimFrame(ParticleAnimation);

   }
   ParticleAnimation();
 }

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 6000 / 60);
      };
})();