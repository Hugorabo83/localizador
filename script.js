// Función para actualizar la hora y fecha en tiempo real
function actualizarHora() {
    const ahora = new Date();
    const fecha = ahora.toLocaleDateString("es-ES", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const hora = ahora.toLocaleTimeString("es-ES", { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    document.getElementById("fecha").textContent = fecha;
    document.getElementById("hora").textContent = hora;
}

// Llamar a la función cada segundo
setInterval(actualizarHora, 1000);
actualizarHora(); // Llamada inicial

// Función para obtener la ubicación del usuario
function obtenerUbicacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (posicion) => {
                const lat = posicion.coords.latitude;
                const lon = posicion.coords.longitude;

                // Llamar a la API de geolocalización para obtener ciudad y país
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
                    .then(response => response.json())
                    .then(data => {
                        const ciudad = data.address.city || data.address.town || "Ubicación desconocida";
                        const pais = data.address.country || "País desconocido";
                        document.getElementById("ubicacion").textContent = `${ciudad}, ${pais}`;
                    })
                    .catch(() => {
                        document.getElementById("ubicacion").textContent = "No se pudo obtener la ubicación.";
                    });
            },
            () => {
                document.getElementById("ubicacion").textContent = "Permiso denegado.";
            }
        );
    } else {
        document.getElementById("ubicacion").textContent = "Geolocalización no soportada.";
    }
}

// Llamar a la función de ubicación
obtenerUbicacion();


