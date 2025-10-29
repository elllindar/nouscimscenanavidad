// =====================
// Selección de menús
// =====================
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


// =====================
// Input de archivo
// =====================
const fileInput = document.getElementById('dni');
const fileInputText = document.querySelector('.file-input-text');

fileInput.addEventListener('change', function(e) {
    const fileName = e.target.files[0]?.name;
    if (fileName) {
        fileInputText.textContent = fileName;
        fileInputText.style.color = '#ae895d'; // var(--accent)
        fileInputText.style.fontWeight = '600';
    } else {
        fileInputText.textContent = 'Seleccionar archivo...';
        fileInputText.style.color = '#6B7280'; // var(--muted)
        fileInputText.style.fontWeight = 'normal';
    }
});

// Hacer clic en el texto para abrir el selector de archivos
fileInputText.addEventListener('click', function() {
    fileInput.click();
});


// =====================
// Envío a Google Sheets
// =====================
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyy4aYFQkvsrrJeyO0F88wN4hR8xBBatybjBu3hf151FvxkrRXsRSyMhkolcOutrC96sA/exec';

async function enviarAGoogleSheets(datos) {
    // Usamos 'no-cors' para evitar problemas CORS desde GitHub Pages
    // En 'no-cors' la respuesta es opaca; asumimos éxito tras el fetch.
    try {
        await fetch(WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });
        return true;
    } catch (err) {
        console.error('Error al enviar a Google Sheets:', err);
        return false;
    }
}


// =====================
// Validación + submit
// =====================
const form = document.getElementById('orderForm');

form.addEventListener('submit', async function(e) {
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

    // Según tu requisito: si manda el form, 100% subió el DNI
    if (!dniFile) {
        alert('Por favor, adjunta el DNI antes de enviar.');
        return;
    }
    
    // Si todo es válido, solo enviamos NOMBRE y APELLIDOS a Sheets.
    const payload = { nombre, apellido };

    const ok = await enviarAGoogleSheets(payload);

    if (ok) {
        // Mostrar página de agradecimiento y redirigir
        showThankYou();
    } else {
        alert('Hubo un error al enviar. Inténtalo de nuevo más tarde.');
    }
});


// =====================
// Pantalla de “Gracias”
// =====================
function showThankYou() {
    const formContainer = document.getElementById('formContainer');
    const thankYouPage = document.getElementById('thankYouPage');
    const thankYouTitle = document.getElementById('thankYouTitle');
    const nombre = document.getElementById('nombre').value.trim();
    
    thankYouTitle.textContent = `¡Muchas Gracias ${nombre}!`;
    
    formContainer.classList.add('hide');
    thankYouPage.classList.add('show');
    
    setTimeout(function() {
        window.location.href = 'https://www.nouscims.com/ca/';
    }, 3000);
}

// Volver al formulario (si lo usas)
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
    fileInputText.style.color = '#6B7280'; // var(--muted)
    fileInputText.style.fontWeight = 'normal';
}
