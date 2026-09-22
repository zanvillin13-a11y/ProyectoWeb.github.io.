/* =========================================
   AÑO AUTOMÁTICO
========================================= */

const anio = document.getElementById("anio");

anio.textContent = new Date().getFullYear();


/* =========================================
   MENÚ RESPONSIVE
========================================= */

const menuBtn = document.getElementById("menuBtn");

const menu = document.getElementById("menu");


menuBtn.addEventListener("click", function () {

    menu.classList.toggle("activo");

});


/* =========================================
   CERRAR MENÚ AL HACER CLIC
========================================= */

const enlaces = document.querySelectorAll("#menu a");


enlaces.forEach(function (enlace) {

    enlace.addEventListener("click", function () {

        menu.classList.remove("activo");

    });

});


/* =========================================
   BOTÓN VOLVER ARRIBA
========================================= */

const botonArriba = document.getElementById("arriba");


window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        botonArriba.style.display = "block";

    } else {

        botonArriba.style.display = "none";

    }

});


/* =========================================
   VOLVER ARRIBA
========================================= */

botonArriba.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});