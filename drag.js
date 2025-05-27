// Función para hacer un elemento arrastrable y eliminable
function makeDraggableAndRemovable(element) {
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    // Agregar botón de eliminar
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.innerHTML = '🗑️';
    deleteButton.style.position = 'absolute';
    deleteButton.style.right = '5px';
    deleteButton.style.top = '5px';
    deleteButton.style.backgroundColor = 'transparent';
    deleteButton.style.border = 'none';
    deleteButton.style.fontSize = '1.2rem';
    deleteButton.style.cursor = 'pointer';
    deleteButton.style.color = '#ff4444';
    deleteButton.style.opacity = '0';
    deleteButton.style.transition = 'opacity 0.3s ease';
    
    element.appendChild(deleteButton);

    // Mostrar/ocultar botón de eliminar al pasar el mouse
    element.addEventListener('mouseenter', () => {
        deleteButton.style.opacity = '1';
    });

    element.addEventListener('mouseleave', () => {
        deleteButton.style.opacity = '0';
    });

    // Función de eliminación
    deleteButton.addEventListener('click', () => {
        element.remove();
    });

    element.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target === element || e.target.closest('.draggable')) {
            isDragging = true;
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();

            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, element);
        }
    }

    function dragEnd() {
        isDragging = false;
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }
}

// Función para hacer todos los elementos del documento arrastrables y eliminables
document.addEventListener('DOMContentLoaded', () => {
    // Hacer todos los elementos arrastrables y eliminables
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
        // Evitar hacer arrastrables elementos que podrían causar problemas
        if (!element.classList.contains('no-drag') && 
            element.tagName !== 'SCRIPT' && 
            element.tagName !== 'STYLE' && 
            element.tagName !== 'HTML' && 
            element.tagName !== 'BODY' && 
            element.tagName !== 'HEAD') {
            
            element.classList.add('draggable');
            makeDraggableAndRemovable(element);
        }
    });
});
