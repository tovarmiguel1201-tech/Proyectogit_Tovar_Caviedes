<<<<<<< HEAD
// Desplazamiento suave del menú

const enlaces = document.querySelectorAll("nav a");

enlaces.forEach(function(enlace) {

    enlace.addEventListener("click", function(evento) {

        evento.preventDefault();

        const seccion = document.querySelector(
            this.getAttribute("href")
        );

        seccion.scrollIntoView({
            behavior: "smooth"
        });

    });

});


// Mensaje en la consola

console.log("EVAH - Electrónica Vehicular");
=======
// Desplazamiento suave del menú

const enlaces = document.querySelectorAll("nav a");

enlaces.forEach(function(enlace) {

    enlace.addEventListener("click", function(evento) {

        evento.preventDefault();

        const seccion = document.querySelector(
            this.getAttribute("href")
        );

        seccion.scrollIntoView({
            behavior: "smooth"
        });

    });

});


// Mensaje en la consola

console.log("EVAH - Electrónica Vehicular");
>>>>>>> 7d22bfdf5d86b91c3956494485f878cd3b930fe0
console.log("Página cargada correctamente.");