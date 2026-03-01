/**
 * Valida si un campo de texto tiene contenido (no está vacío).
 * @param {HTMLElement} campo - El input a validar.
 * @param {HTMLElement} errorElement - El elemento donde se mostrará el mensaje de error.
 * @param {string} mensaje - El mensaje a mostrar si falla la validación.
 * @returns {boolean} True si es válido, False de lo contrario.
 */
function validarCampoObligatorio(campo, errorElement, mensaje) {
    if (!campo || !errorElement) return false;
    if (campo.value.trim() === '') {
        errorElement.textContent = mensaje;
        errorElement.classList.remove('d-none');
        return false;
    } else {
        errorElement.textContent = '';
        errorElement.classList.add('d-none');
        return true;
    }
}

/**
 * Valida que la longitud del texto en un campo esté dentro de un rango.
 * @param {HTMLElement} campo - El input a validar.
 * @param {HTMLElement} errorElement - Elemento de error.
 * @param {number} min - Longitud mínima permitida.
 * @param {number} max - Longitud máxima permitida.
 * @param {string} mensaje - Mensaje de error.
 * @returns {boolean}
 */
function validarLongitud(campo, errorElement, min, max, mensaje) {
    if (!campo || !errorElement) return false;
    if (campo.value.length < min || campo.value.length > max) {
        errorElement.textContent = mensaje;
        errorElement.classList.remove('d-none');
        return false;
    } else {
        errorElement.textContent = '';
        errorElement.classList.add('d-none');
        return true;
    }
}

/**
 * Valida que el formato del correo electrónico sea correcto usando Regex.
 * @param {HTMLElement} campo - El input de correo.
 * @param {HTMLElement} errorElement - Elemento de error.
 * @param {string} mensaje - Mensaje de error.
 * @returns {boolean}
 */
function validarCorreoGeneral(campo, errorElement, mensaje) {
    if (!campo || !errorElement) return false;
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(campo.value)) {
        errorElement.textContent = mensaje;
        errorElement.classList.remove('d-none');
        return false;
    } else {
        errorElement.textContent = '';
        errorElement.classList.add('d-none');
        return true;
    }
}

/**
 * Valida que al menos un radio button de género haya sido seleccionado.
 * @param {NodeList} genero - Lista de elementos radio button.
 * @param {HTMLElement} errorElement - Elemento de error.
 * @param {string} mensaje - Mensaje de error.
 * @returns {boolean}
 */
function validarGenero(genero, errorElement, mensaje) {
    if (!genero || !errorElement) return false;
    let seleccionado = false;
    for (let i = 0; i < genero.length; i++) {
        if (genero[i].checked) {
            seleccionado = true;
            break;
        }
    }

    if (!seleccionado) {
        errorElement.textContent = mensaje;
        errorElement.classList.remove('d-none');
        return false;
    } else {
        errorElement.textContent = '';
        errorElement.classList.add('d-none');
        return true;
    }
}

/**
 * Valida que un checkbox (ej. términos y condiciones) esté marcado.
 * @param {HTMLElement} checkbox - El elemento checkbox.
 * @param {HTMLElement} errorElement - Elemento de error.
 * @param {string} mensaje - Mensaje de error.
 * @returns {boolean}
 */
function validarCheckbox(checkbox, errorElement, mensaje) {
    if (!checkbox || !errorElement) return false;
    if (!checkbox.checked) {
        errorElement.textContent = mensaje;
        errorElement.classList.remove('d-none');
        return false;
    } else {
        errorElement.textContent = '';
        errorElement.classList.add('d-none');
        return true;
    }
}

/**
 * Muestra un mensaje flotante de éxito usando la librería Toastify.
 * @param {string} mensaje - El texto a mostrar.
 */
function mostrarMensajeExito(mensaje) {
    Toastify({
        text: mensaje || "✅ ¡Registro exitoso!",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "rgba(0, 128, 0, 0.8)",
            color: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            padding: "12px 20px"
        },
        stopOnFocus: true,
    }).showToast();
}

/**
 * Función principal que orquestal la validación de todo el formulario de registro.
 * Se ejecuta al hacer clic en el botón de "Registrar Usuario".
 * @param {Event} event - El evento del formulario.
 * @returns {boolean} True si todo es válido.
 */
function validarFormularioNuevo(event) {
    event.preventDefault(); // Evita el envío real del formulario

    // Obtención de elementos del DOM
    const inputNombres = document.getElementById('nombres');
    const inputApellidos = document.getElementById('apellidos');
    const inputCorreo = document.getElementById('correo');
    const inputGenero = document.getElementsByName('genero');
    const inputTerminos = document.getElementById('terminos');

    const errorNombres = document.getElementById('errorNombres');
    const errorApellidos = document.getElementById('errorApellidos');
    const errorCorreo = document.getElementById('errorCorreo');
    const errorGenero = document.getElementById('errorGenero');
    const errorTerminos = document.getElementById('errorTerminos');

    // Ejecución de validaciones individuales
    const nombresValidos = validarLongitud(inputNombres, errorNombres, 1, 50, 'El nombre es obligatorio.');
    const apellidosValidos = validarLongitud(inputApellidos, errorApellidos, 1, 50, 'El apellido es obligatorio.');
    const correoValido = validarCorreoGeneral(inputCorreo, errorCorreo, 'Ingrese un correo electrónico válido.');
    const generoValido = validarGenero(inputGenero, errorGenero, 'Seleccione un género.');
    const terminosValidos = validarCheckbox(inputTerminos, errorTerminos, 'Debe aceptar los términos y condiciones.');

    // Verificación final
    if (nombresValidos && apellidosValidos && correoValido && generoValido && terminosValidos) {
        mostrarMensajeExito("✅ Usuario registrado con éxito. Se enviará confirmación a su correo.");
        const formulario = document.getElementById('formRegistroUsuario');
        formulario.classList.add("was-validated"); // Estilo visual de éxito
        
        // Resetear el formulario tras una pausa
        setTimeout(() => {
            formulario.reset();
            formulario.classList.remove("was-validated");
        }, 2000);
        return true;
    } else {
        alert('Por favor, complete correctamente los campos obligatorios del formulario.');
        return false;
    }
}

/**
 * Configura los eventos de 'blur' y 'change' para validar en tiempo real.
 */
function configurarEventosFormulario() {
    const inputNombres = document.getElementById('nombres');
    const inputApellidos = document.getElementById('apellidos');
    const inputCorreo = document.getElementById('correo');
    const inputGenero = document.getElementsByName('genero');
    const inputTerminos = document.getElementById('terminos');

    if (!inputNombres) return; // Validación de existencia

    const errorNombres = document.getElementById('errorNombres');
    const errorApellidos = document.getElementById('errorApellidos');
    const errorCorreo = document.getElementById('errorCorreo');
    const errorGenero = document.getElementById('errorGenero');
    const errorTerminos = document.getElementById('errorTerminos');

    // Eventos al perder el foco (blur)
    inputNombres.addEventListener('blur', () => validarLongitud(inputNombres, errorNombres, 1, 50, 'El nombre es obligatorio.'));
    inputApellidos.addEventListener('blur', () => validarLongitud(inputApellidos, errorApellidos, 1, 50, 'El apellido es obligatorio.'));
    inputCorreo.addEventListener('blur', () => validarCorreoGeneral(inputCorreo, errorCorreo, 'Ingrese un correo electrónico válido.'));
    
    // Eventos para la selección de género
    Array.from(inputGenero).forEach(input => {
        input.addEventListener('change', () => validarGenero(inputGenero, errorGenero, 'Seleccione un género.'));
        input.addEventListener('blur', () => validarGenero(inputGenero, errorGenero, 'Seleccione un género.'));
    });
    
    // Evento para los términos
    inputTerminos.addEventListener('change', () => validarCheckbox(inputTerminos, errorTerminos, 'Debe aceptar los términos y condiciones.'));
}

/**
 * Agrega interactividad a la lista de especialidades para mostrar sus descripciones.
 */
function configurarEventosEspecialidades() {
    const items = document.querySelectorAll('#lista-especialidades .list-group-item');
    const descBox = document.getElementById('desc-box');

    if (!descBox) return;

    items.forEach(item => {
        item.addEventListener('click', function() {
            // Eliminar clase active de todos los items
            items.forEach(i => i.classList.remove('active', 'bg-primary', 'text-white'));
            
            // Añadir clase active al elemento actual
            this.classList.add('active', 'bg-primary', 'text-white');
            
            // Extraer y mostrar la descripción almacenada en data-desc
            const desc = this.getAttribute('data-desc');
            if (desc) {
                descBox.textContent = desc;
                descBox.classList.remove('d-none');
            }
        });
    });
}

// Inicialización de funciones cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    configurarEventosFormulario();
    configurarEventosEspecialidades();
});
