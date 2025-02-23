let aseguradoras = [];
let editMode = false;
let currentId = null;

const aseguradorasTable = document.getElementById("aseguradorasTable").getElementsByTagName("tbody")[0];
const aseguradoraForm = document.getElementById("aseguradoraForm");
const cancelarEdicionBtn = document.getElementById("cancelarEdicion");

document.addEventListener("DOMContentLoaded", () => {
    renderAseguradoras();
});

aseguradoraForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const comision = parseFloat(document.getElementById("comision").value);
    const estado = document.getElementById("estado").checked;

    const aseguradora = { id: Date.now(), nombre, comision, estado };

    if (editMode) {
        actualizarAseguradora(currentId, aseguradora);
    } else {
        agregarAseguradora(aseguradora);
    }

    resetForm();
    renderAseguradoras();
});

cancelarEdicionBtn.addEventListener("click", () => {
    resetForm();
});

function renderAseguradoras() {
    limpiarHTML();
    aseguradoras.forEach(aseguradora => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${aseguradora.nombre}</td>
            <td>${aseguradora.comision.toFixed(2)}%</td>
            <td>${aseguradora.estado ? "Activo" : "Inactivo"}</td>
            <td class="actions">
                <button onclick="editarAseguradora(${aseguradora.id})">Editar</button>
                <button onclick="eliminarAseguradora(${aseguradora.id})">Eliminar</button>
            </td>
        `;
        aseguradorasTable.appendChild(row);
    });
}

function limpiarHTML() {
    while (aseguradorasTable.firstChild) {
        aseguradorasTable.removeChild(aseguradorasTable.firstChild);
    }
}

function agregarAseguradora(aseguradora) {
    aseguradoras.push(aseguradora);
}

function actualizarAseguradora(id, aseguradora) {
    const index = aseguradoras.findIndex(a => a.id === id);
    if (index !== -1) {
        aseguradoras[index] = { ...aseguradoras[index], ...aseguradora };
    }
}

function eliminarAseguradora(id) {
    if (confirm("¿Estás seguro de eliminar esta aseguradora?")) {
        aseguradoras = aseguradoras.filter(a => a.id !== id);
        renderAseguradoras();
    }
}

function editarAseguradora(id) {
    const aseguradora = aseguradoras.find(a => a.id === id);
    if (aseguradora) {
        editMode = true;
        currentId = id;
        cancelarEdicionBtn.style.display = "inline-block";
        document.getElementById("nombre").value = aseguradora.nombre;
        document.getElementById("comision").value = aseguradora.comision;
        document.getElementById("estado").checked = aseguradora.estado;
    }
}

function resetForm() {
    aseguradoraForm.reset();
    editMode = false;
    currentId = null;
    cancelarEdicionBtn.style.display = "none";
}