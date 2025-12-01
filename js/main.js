import { data } from "./date-array.js";

const tbody = document.getElementById("datos-tabla");
const inputBusqueda = document.getElementById("filtro-busqueda");


    // Solo añadimos el evento si el input existe
    inputBusqueda.addEventListener('input', manejarBusqueda);
    
    // Renderizado INICIAL (Para ver los datos al entrar)
    


function manejarBusqueda(event) {
    const textoBusqueda = event.target.value.toLowerCase();

    const datosFiltrados = data.filter(contacto => {
        const nombreMinusculas = contacto.nombre.toLowerCase();
      
        const ciudadMinusculas = contacto.info.ciudad ? contacto.info.ciudad.toLowerCase() : "";

        const emailMinusculas = contacto.info.email ? contacto.info.email.toLowerCase() : "";


        return nombreMinusculas.includes(textoBusqueda) ||
               ciudadMinusculas.includes(textoBusqueda);
    });

    renderTable(datosFiltrados);
}

function renderTable(dataParaMostrar) { 
    tbody.innerHTML = "";

    dataParaMostrar.forEach(contacto => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${contacto.nombre}</td>
            <td>${contacto.edad}</td>
            <td>${contacto.info.email}</td>
            <td>${contacto.info.ciudad}</td>
        `;
        tbody.appendChild(fila);
    });
}