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
console.log("Página cargada correctamente.");