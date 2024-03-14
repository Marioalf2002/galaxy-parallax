// Obtener el canvas y el contexto
var canvas = document.getElementById("starts");
var ctx = canvas.getContext("2d");

// Ajustar el tamaño del canvas al tamaño de la ventana
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var stars = [];

// Función para generar una galaxia
function generateGalaxy() {
  var numStars = 500; // Número de estrellas en la galaxia
  var centerX = canvas.width / 2; // Posición central X de la galaxia
  var centerY = canvas.height / 2; // Posición central Y de la galaxia

  // Dibujar el degradado de fondo
  var gradient = ctx.createRadialGradient(
    centerX,
    centerY,
    0,
    centerX,
    centerY,
    canvas.width
  );
  gradient.addColorStop(0, "rgba(0,0,0,1)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Inicializar estrellas
  for (var i = 0; i < numStars; i++) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var z = Math.random() * canvas.width; // Posición Z aleatoria
    var radius = Math.random() * 2; // Tamaño aleatorio de las estrellas
    var brightness = Math.random() * 0.8 + 0.2; // Brillo aleatorio
    stars.push({ x: x, y: y, z: z, radius: radius, brightness: brightness });
  }
}

// Función para dibujar una estrella
function drawStar(star) {
  // Convertir coordenadas 3D a 2D
  var scale = 1000 / (1000 + star.z); // Factor de escala basado en la posición Z
  var screenX = canvas.width / 2 + (star.x - canvas.width / 2) * scale;
  var screenY = canvas.height / 2 + (star.y - canvas.height / 2) * scale;

  ctx.beginPath();
  ctx.arc(screenX, screenY, star.radius * scale, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 255, 255, " + star.brightness + ")";
  ctx.fill();
}

// Función de animación
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Actualizar la posición Z de las estrellas
  for (var i = 0; i < stars.length; i++) {
    stars[i].z -= 1; // Velocidad de movimiento en el eje Z
    // Reiniciar la posición Z si la estrella sale del canvas
    if (stars[i].z <= 0) {
      stars[i].z = canvas.width;
    }
  }

  // Dibujar estrellas
  for (var i = 0; i < stars.length; i++) {
    drawStar(stars[i]);
  }
}

// Generar la galaxia al cargar la página
generateGalaxy();

// Iniciar la animación
animate();

// Redimensionar el canvas cuando la ventana cambie de tamaño
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  generateGalaxy();
});
