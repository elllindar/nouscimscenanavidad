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
    const apellido = document.getElementById('apellidos').value.trim();
    const primerPlato = document.getElementById('primerPlato').value;
    const segundoPlato = document.getElementById('segundoPlato').value;
    const dniFile = fileInput.files[0];
    
    // Validar tamaño del archivo (5MB)
    if (dniFile && dniFile.size > 5 * 1024 * 1024) {
        alert('El archivo es demasiado grande. El tamaño máximo es 5MB.');
        return;
    }
    
    // Si todo es válido
    if (nombre && apellido && primerPlato && segundoPlato && dniFile) {
        alert(`¡Pedido enviado con éxito!\n\nNombre: ${nombre} ${apellido}\nPrimer plato: ${primerPlato}\nSegundo plato: ${segundoPlato}\nDNI: ${dniFile.name}`);
        
        // Aquí puedes agregar la lógica para enviar los datos al servidor
        // Por ejemplo, usando FormData y fetch()
        
        // Resetear el formulario
        form.reset();
        fileInputText.textContent = 'Seleccionar archivo...';
        fileInputText.style.color = '#666';
        fileInputText.style.fontWeight = 'normal';
    }
});
