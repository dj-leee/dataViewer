import { data as datosIniciales } from "./date-array.js";

// ============================================
// LOCAL STORAGE - Explicación paso a paso
// ============================================

// PASO 1: Función para CARGAR datos del localStorage
// Si hay datos guardados, los usamos. Si no, usamos los datos iniciales.
function cargarDatos() {
    const datosGuardados = localStorage.getItem('contactos');
    
    // Si existe algo guardado en localStorage...
    if (datosGuardados) {
        // Convertimos el string JSON a un array de objetos
        return JSON.parse(datosGuardados);
    }
    
    // Si no hay nada guardado, usamos los datos iniciales
    return datosIniciales;
}

// PASO 2: Función para GUARDAR datos en localStorage
function guardarDatos() {
    // Convertimos el array a string JSON y lo guardamos
    localStorage.setItem('contactos', JSON.stringify(data));
}

let data = cargarDatos();
// PASO 3: Inicializamos 'data' con los datos cargados

// ============================================


const tbody = document.getElementById("datos-tabla");
const inputBusqueda = document.getElementById("filtro-busqueda");
const btnAnadir = document.getElementById("btn-anadir");


    // Solo añadimos el evento si el input existe
    inputBusqueda.addEventListener('input', manejarBusqueda);
    

    
    // Renderizado INICIAL (Para ver los datos al entrar)
    renderTable(data);


function manejarBusqueda(event) {
    const textoBusqueda = event.target.value.toLowerCase();

    const datosFiltrados = data.filter(contacto => {
        const nombreMinusculas = contacto.nombre.toLowerCase();
        
        const ciudadMinusculas = contacto.info.ciudad.toLowerCase();

        const emailMinusculas = contacto.info.email.toLowerCase();


        return nombreMinusculas.includes(textoBusqueda) ||
               ciudadMinusculas.includes(textoBusqueda) ||
               emailMinusculas.includes(textoBusqueda);
            });
            
            renderTable(datosFiltrados);
}

function renderTable(dataParaMostrar) { 
    // Limpiar la tabla antes de renderizar (evita duplicados)
    tbody.innerHTML = '';
    
    dataParaMostrar.forEach(contacto => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${contacto.nombre}</td>
            <td>${contacto.edad}</td>
            <td>${contacto.info.email}</td>
            <td>${contacto.info.ciudad}</td>
            <td><input type="checkbox" id="input-check"></td>
            
        `;
        tbody.appendChild(fila);
    });
}
document.getElementById('input-check').addEventListener('click', ()=> {
    const popupEliminarContacto = document.createElement('div')
    popupEliminarContacto.classList.add('popupEliminarContacto')
    popupEliminarContacto.innerHTML = ``
})

// funcion para añadir nuevo contacto
btnAnadir.addEventListener('click', () => {
    // crear un nuevo contacto desde cero, creando un pop-up div
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
        <form class="popup-content">
            <h3>Añadir Nuevo Contacto</h3>
            <label class="label-popup">Nombre: <input class="input-popup" type="text" id="nuevo-nombre" required></label><br><br> 
            <label class="label-popup">Edad: <input class="input-popup" type="number" id="nuevo-edad" required></label><br><br>
            <label class="label-popup">Email: <input class="input-popup" type="email" id="nuevo-email" required></label><br><br>
            <label class="label-popup">Ciudad: <input class="input-popup" type="text" id="nuevo-ciudad" required></label><br><br>
            <button class="btn-gardar-contacto" type="submit" id="guardar-contacto">Guardar</button>
            <button class="btn-cancelar-contacto" id="cancelar">Cancelar</button>
        </form>
    `;
    document.body.appendChild(popup);
    popup.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault(); // ← ¡IMPORTANTE! Evita que la página se recargue
        
        const nuevoContacto = {
            id: Math.max(...data.map(c => c.id), 0) + 1,
            nombre: document.getElementById('nuevo-nombre').value,
            edad: parseInt(document.getElementById('nuevo-edad').value),
            info: {
                email: document.getElementById('nuevo-email').value,
                ciudad: document.getElementById('nuevo-ciudad').value
            }
        };
        data.push(nuevoContacto);
        // PASO 4: Guardamos en localStorage cada vez que añadimos un contacto
        guardarDatos();
        renderTable(data);
        document.body.removeChild(popup);
    });
    
    document.getElementById('cancelar').addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir que el botón cancelar envíe el form
        document.body.removeChild(popup);
    });
});