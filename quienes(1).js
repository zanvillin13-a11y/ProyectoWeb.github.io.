// ====== 1. Datos de la galería ======
// Guardamos las rutas de todas las fotos en un arreglo (array).
// Es más fácil de mantener que escribir 10 etiquetas <img> repetidas
// en el HTML: si mañana agregas una foto 11.jpg, solo la agregas aquí.
const fotos = [
    "quienes/vision.jpg",
    "quienes/misiom.jpg",
    "quienes/trabajocooperativo.jpg",
    "quienes/tecnologiaconia.jpg",
    "quienes/Ia.jpg",
    "quienes/Tecnologiaportatil.jpg",
    "quienes/ciberseguridad.jpg",
    "quienes/desarrolloweb.jpg",
    "quienes/galeria.jpg",
    "quienes/Noticiastec.jpg",
];

// ====== 2. Referencias a los elementos del HTML ======
// document.getElementById busca en la página el elemento que tiene
// ese "id" exacto, para que podamos leerlo o modificarlo desde JS.
const imagenSlider = document.getElementById("imagen-slider");
const contador = document.getElementById("contador");
const btnAnterior = document.getElementById("btn-anterior");
const btnSiguiente = document.getElementById("btn-siguiente");

// ====== 3. Variable de estado ======
// "indiceActual" recuerda cuál foto del arreglo se está mostrando.
// Empieza en 0 porque los arreglos en JavaScript se cuentan desde 0.
let indiceActual = 0;

// Tiempo (en milisegundos) entre cada cambio automático de foto.
// 3000 ms = 3 segundos.
const INTERVALO_MS = 3000;

// ====== 4. Función que dibuja la foto actual en pantalla ======
function mostrarFoto(indice) {
    // 1) Añadimos la clase "fade-out": la CSS que ya escribimos hace
    //    que la imagen baje su opacidad a 0 (se desvanece).
    imagenSlider.classList.add("fade-out");

    // 2) Esperamos a que termine esa transición (300ms) antes de
    //    cambiar la imagen, para que el cambio no se vea brusco.
    setTimeout(() => {
        imagenSlider.src = fotos[indice];
        // Actualizamos el texto "3 / 10"
        contador.textContent = `${indice + 1} / ${fotos.length}`;
        // 3) Quitamos la clase para que la nueva imagen aparezca
        //    (vuelve a opacity: 1 gracias a la transición CSS).
        imagenSlider.classList.remove("fade-out");
    }, 300);
}

// ====== 5. Avanzar una imagen hacia adelante ======
function irSiguiente() {
    // El operador % (módulo) hace que, al llegar a la última foto,
    // volvamos automáticamente a la primera (efecto "carrusel").
    indiceActual = (indiceActual + 1) % fotos.length;
    mostrarFoto(indiceActual);
}

// ====== 6. Retroceder una imagen ======
function irAnterior() {
    // Sumamos fotos.length antes de restar 1 para evitar índices
    // negativos cuando estamos en la primera foto.
    indiceActual = (indiceActual - 1 + fotos.length) % fotos.length;
    mostrarFoto(indiceActual);
}

// ====== 7. Conectar los botones con las funciones ======
btnSiguiente.addEventListener("click", () => {
    irSiguiente();
    reiniciarAutoplay(); // si el usuario hace clic, reiniciamos el conteo automático
});

btnAnterior.addEventListener("click", () => {
    irAnterior();
    reiniciarAutoplay();
});

// ====== 8. Movimiento automático: "una tras otra" ======
// setInterval ejecuta una función repetidamente cada X milisegundos.
// Esto es lo que hace que las fotos avancen solas, sin que el usuario
// tenga que hacer clic.
let temporizador = setInterval(irSiguiente, INTERVALO_MS);

// Si el usuario interactúa manualmente, reiniciamos el temporizador
// para que no cambie de foto justo después de haber hecho clic.
function reiniciarAutoplay() {
    clearInterval(temporizador);
    temporizador = setInterval(irSiguiente, INTERVALO_MS);
}

// ====== 9. Mostrar el contador correcto desde el inicio ======
contador.textContent = `1 / ${fotos.length}`;