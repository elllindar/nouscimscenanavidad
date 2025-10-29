// Manejo de la selección de menús
const menu1Radio = document.getElementById('menu1');
const menu2Radio = document.getElementById('menu2');
const menu1Card = document.getElementById('menu1Card');
const menu2Card = document.getElementById('menu2Card');

menu1Radio.addEventListener('change', function() {
    if (this.checked) {
        menu1Card.classList.add('selected');
        menu2Card.classList.remove('selected');
    }
});

menu2Radio.addEventListener('change', function() {
    if (this.checked) {
        menu2Card.classList.add('selected');
        menu1Card.classList.remove('selected');
    }
});

// Hacer que las tarjetas sean clickeables
menu1Card.addEventListener('click', function() {
    menu1Radio.checked = true;
    menu1Card.classList.add('selected');
    menu2Card.classList.remove('selected');
});

menu2Card.addEventListener('click', function() {
    menu2Radio.checked = true;
    menu2Card.classList.add('selected');
    menu1Card.classList.remove('selected');
});

// Manejo del input de archivo
const fileInput = document.getElementById('dni');
const fileInputText = document.querySelector('.file-input-text');

fileInput.addEventListener('change', function(e) {
    const fileName = e.target.files[0]?.name;
    if (fileName) {
        fileInputText.textContent = fileName;
        fileInputText.style.color = '#fe5d52';
        fileInputText.style.fontWeight = '600';
    } else {
        fileInputText.textContent = 'Seleccionar archivo...';
        fileInputText.style.color = '#666';
        fileInputText.style.fontWeight = 'normal';
    }
});

// Hacer clic en el texto para abrir el selector de archivos
fileInputText.addEventListener('click', function() {
    fileInput.click();
});

// Validación del formulario
const form = document.getElementById('orderForm');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const menuSeleccionado = document.querySelector('input[name="menu"]:checked')?.value;
    const alergias = document.getElementById('alergias').value.trim();
    const dniFile = fileInput.files[0];
    
    // Validar que se haya seleccionado un menú
    if (!menuSeleccionado) {
        alert('Por favor, selecciona un menú de Navidad.');
        return;
    }
    
    // Validar tamaño del archivo (5MB)
    if (dniFile && dniFile.size > 5 * 1024 * 1024) {
        alert('El archivo es demasiado grande. El tamaño máximo es 5MB.');
        return;
    }
    
    // Si todo es válido
    if (nombre && apellido && menuSeleccionado && dniFile) {
        // Mostrar página de agradecimiento
        showThankYou();
        
        // Aquí puedes agregar la lógica para enviar los datos al servidor
        // Los datos a enviar serían:
        // - nombre, apellido, menuSeleccionado, alergias, dniFile
        console.log({
            nombre: nombre,
            apellido: apellido,
            menu: menuSeleccionado,
            alergias: alergias || 'Ninguna',
            dni: dniFile.name
        });
    }
});

// Función para mostrar la página de agradecimiento
function showThankYou() {
    const formContainer = document.getElementById('formContainer');
    const thankYouPage = document.getElementById('thankYouPage');
    const thankYouTitle = document.getElementById('thankYouTitle');
    const nombre = document.getElementById('nombre').value.trim();
    
    // Actualizar el título con el nombre del usuario
    thankYouTitle.textContent = `¡Muchas Gracias ${nombre}!`;
    
    formContainer.classList.add('hide');
    thankYouPage.classList.add('show');
    
    // Redirigir después de 5 segundos
    setTimeout(function() {
        window.location.href = 'https://www.nouscims.com/ca/';
    }, 3000);
}

// Función para volver al formulario
function showForm() {
    const formContainer = document.getElementById('formContainer');
    const thankYouPage = document.getElementById('thankYouPage');
    
    thankYouPage.classList.remove('show');
    formContainer.classList.remove('hide');
    
    // Resetear el formulario
    form.reset();
    menu1Card.classList.remove('selected');
    menu2Card.classList.remove('selected');
    fileInputText.textContent = 'Seleccionar archivo...';
    fileInputText.style.color = '#666';
    fileInputText.style.fontWeight = 'normal';
}
