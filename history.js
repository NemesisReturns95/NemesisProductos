// Clase para manejar el historial de cambios
class HistoryManager {
    constructor() {
        this.history = [];
        this.currentStep = -1;
        this.maxHistory = 20; // Máximo número de cambios que se guardan
    }

    // Guardar un cambio
    saveChange(element, action, data) {
        // Si hay cambios futuros, los eliminamos
        this.history = this.history.slice(0, this.currentStep + 1);
        
        // Guardar el nuevo cambio
        this.history.push({
            element: element,
            action: action,
            data: data,
            timestamp: Date.now()
        });
        
        this.currentStep++;
        
        // Si excede el límite, eliminar el cambio más antiguo
        if (this.history.length > this.maxHistory) {
            this.history.shift();
            this.currentStep--;
        }
    }

    // Deshacer el último cambio
    undo() {
        if (this.currentStep < 0) return null;

        const change = this.history[this.currentStep];
        this.currentStep--;

        return change;
    }

    // Rehacer un cambio
    redo() {
        if (this.currentStep >= this.history.length - 1) return null;

        this.currentStep++;
        const change = this.history[this.currentStep];

        return change;
    }
}

// Crear una instancia del HistoryManager
const historyManager = new HistoryManager();

// Función para guardar el estado de un elemento
function saveElementState(element, action) {
    const data = {
        html: element.outerHTML,
        position: {
            x: element.style.transform ? 
                parseFloat(element.style.transform.match(/translate\((-?\d+\.?\d*)px/)[1]) : 0,
            y: element.style.transform ? 
                parseFloat(element.style.transform.match(/translate\(-?\d+\.?\d*px, (-?\d+\.?\d*)px/)[1]) : 0
        }
    };
    
    historyManager.saveChange(element, action, data);
}

// Función para restaurar el estado de un elemento
function restoreElementState(change) {
    if (!change) return;

    const { element, action, data } = change;
    
    if (action === 'delete') {
        const newElement = document.createElement('div');
        newElement.innerHTML = data.html;
        element.parentElement.insertBefore(newElement.firstChild, element);
        element.remove();
        makeDraggableAndRemovable(newElement.firstChild);
    } else if (action === 'move') {
        element.style.transform = `translate(${data.position.x}px, ${data.position.y}px)`;
    }
}

// Agregar botones de deshacer y rehacer
document.addEventListener('DOMContentLoaded', () => {
    // Crear contenedor para los botones
    const historyContainer = document.createElement('div');
    historyContainer.className = 'history-container';
    historyContainer.innerHTML = `
        <button class="history-button undo">Undo</button>
        <button class="history-button redo">Redo</button>
    `;
    document.body.appendChild(historyContainer);

    // Estilos para los botones
    const style = document.createElement('style');
    style.textContent = `
        .history-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            display: flex;
            gap: 10px;
        }
        .history-button {
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            background: var(--accent-color);
            color: white;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        .history-button:hover {
            background: var(--accent-color-hover);
        }
        .history-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    `;
    document.head.appendChild(style);

    // Manejar clics en los botones
    const undoButton = document.querySelector('.history-button.undo');
    const redoButton = document.querySelector('.history-button.redo');

    undoButton.addEventListener('click', () => {
        const change = historyManager.undo();
        if (change) {
            restoreElementState(change);
        }
        updateButtonsState();
    });

    redoButton.addEventListener('click', () => {
        const change = historyManager.redo();
        if (change) {
            restoreElementState(change);
        }
        updateButtonsState();
    });

    // Actualizar el estado de los botones
    function updateButtonsState() {
        undoButton.disabled = historyManager.currentStep < 0;
        redoButton.disabled = historyManager.currentStep >= historyManager.history.length - 1;
    }

    // Actualizar el estado inicial de los botones
    updateButtonsState();
});
