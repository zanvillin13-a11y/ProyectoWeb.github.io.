// ============================================================
//  PARTE A — CARRITO DE COMPRAS
// ============================================================

// ====== 1. Referencias a los elementos del HTML ======
const btnAbrirCarrito = document.getElementById("btn-abrir-carrito");
const btnCerrarCarrito = document.getElementById("btn-cerrar-carrito");
const panelCarrito = document.getElementById("panel-carrito");
const listaCarrito = document.getElementById("lista-carrito");
const carritoVacioMsg = document.getElementById("carrito-vacio");
const totalCarritoEl = document.getElementById("total-carrito");
const contadorCarritoEl = document.getElementById("contador-carrito");
const btnVaciarCarrito = document.getElementById("btn-vaciar-carrito");
const botonesAgregar = document.querySelectorAll(".btn-agregar");

// ====== 2. Estado del carrito ======
// "carrito" es un arreglo de objetos. Cada objeto representa UN
// producto distinto con su cantidad, por ejemplo:
// { id: "A001", nombre: "Disco SSD 1TB", precio: 160, cantidad: 2 }
//
// Lo cargamos desde localStorage (memoria del navegador) para que,
// si el usuario cierra la página y vuelve, su carrito siga ahí.
// JSON.parse convierte el texto guardado de vuelta en un arreglo real.
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ====== 3. Guardar el carrito en localStorage ======
// JSON.stringify hace lo contrario a JSON.parse: convierte el
// arreglo de JavaScript en texto para poder guardarlo.
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ====== 4. Agregar un producto al carrito ======
function agregarAlCarrito(id, nombre, precio) {
    // "find" busca si ese producto ya está en el carrito.
    const productoExistente = carrito.find((item) => item.id === id);

    if (productoExistente) {
        // Si ya existe, solo aumentamos la cantidad.
        productoExistente.cantidad += 1;
    } else {
        // Si es nuevo, lo agregamos al arreglo con cantidad 1.
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    guardarCarrito();
    renderizarCarrito();
}

// ====== 5. Quitar un producto del carrito por completo ======
function quitarDelCarrito(id) {
    // "filter" crea un nuevo arreglo que excluye al producto con ese id.
    carrito = carrito.filter((item) => item.id !== id);
    guardarCarrito();
    renderizarCarrito();
}

// ====== 6. Vaciar todo el carrito ======
function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    renderizarCarrito();
}

// ====== 7. Dibujar el contenido del carrito en pantalla ======
function renderizarCarrito() {
    // Limpiamos la lista antes de volver a dibujarla.
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        carritoVacioMsg.style.display = "block";
    } else {
        carritoVacioMsg.style.display = "none";
    }

    let total = 0;
    let totalUnidades = 0;

    carrito.forEach((item) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        totalUnidades += item.cantidad;

        // Creamos un <li> por cada producto en el carrito.
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${item.nombre} &times; ${item.cantidad} — S/ ${subtotal.toFixed(2)}</span>
            <button data-id="${item.id}">Quitar</button>
        `;
        listaCarrito.appendChild(li);
    });

    // Actualizamos el total en soles y el contador del botón flotante.
    totalCarritoEl.textContent = `S/ ${total.toFixed(2)}`;
    contadorCarritoEl.textContent = totalUnidades;
}

// ====== 8. Conectar los botones "Agregar al carrito" ======
// Cada botón trae la info del producto en sus atributos data-*
// (los escribimos en el HTML: data-id, data-nombre, data-precio).
botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", () => {
        const id = boton.dataset.id;
        const nombre = boton.dataset.nombre;
        const precio = parseFloat(boton.dataset.precio);
        agregarAlCarrito(id, nombre, precio);
    });
});

// ====== 9. Delegación de eventos para los botones "Quitar" ======
// Los <li> del carrito se crean dinámicamente, así que en vez de
// ponerle un listener a cada uno, escuchamos los clics en la lista
// completa y revisamos si el clic vino de un botón "Quitar".
listaCarrito.addEventListener("click", (evento) => {
    if (evento.target.tagName === "BUTTON") {
        quitarDelCarrito(evento.target.dataset.id);
    }
});

// ====== 10. Abrir / cerrar el panel del carrito ======
btnAbrirCarrito.addEventListener("click", () => {
    panelCarrito.classList.add("abierto");
});

btnCerrarCarrito.addEventListener("click", () => {
    panelCarrito.classList.remove("abierto");
});

btnVaciarCarrito.addEventListener("click", vaciarCarrito);

// ====== 11. Dibujar el carrito apenas carga la página ======
// (por si ya había productos guardados de una visita anterior)
renderizarCarrito();


// ============================================================
//  PARTE B — EFECTO DE IMAGEN: MODAL / LIGHTBOX
// ============================================================
// Además del zoom que ya hace el CSS al pasar el mouse (:hover),
// aquí agregamos que al HACER CLIC en la imagen, se abra en grande
// sobre un fondo oscuro.

const imagenesProducto = document.querySelectorAll(".img-producto");
const modalImagen = document.getElementById("modal-imagen");
const modalImagenGrande = document.getElementById("modal-imagen-grande");
const btnCerrarModal = document.getElementById("btn-cerrar-modal");

imagenesProducto.forEach((img) => {
    img.addEventListener("click", () => {
        // data-full guarda la ruta de la imagen en tamaño completo.
        modalImagenGrande.src = img.dataset.full;
        modalImagenGrande.alt = img.alt;
        modalImagen.classList.add("abierto");
    });
});

function cerrarModal() {
    modalImagen.classList.remove("abierto");
}

btnCerrarModal.addEventListener("click", cerrarModal);

// También cerramos el modal si el usuario hace clic en el fondo
// oscuro (fuera de la imagen), no solo en la "X".
modalImagen.addEventListener("click", (evento) => {
    if (evento.target === modalImagen) {
        cerrarModal();
    }
});

// Y si presiona la tecla Escape.
document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
        cerrarModal();
    }
});