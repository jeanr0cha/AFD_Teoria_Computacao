const conjuntoEstados = document.getElementById('conjuntoEstados');
const conjuntoEstadosInput = document.getElementById('conjuntoEstadosInput');

function addEstado() {
    const estadoText = conjuntoEstadosInput.value.trim();
    if (estadoText !== "") {

        const maxText = estadoText.substring(0, 35);
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${maxText}</span>
            <button class="editButton" onclick="editEstado(this)">Editar</button>
            <button class="deleteButton" onclick="deleteEstado(this)">Remover</button>
        `;
        conjuntoEstados.appendChild(li); // Adiciona o novo estado à lista
        conjuntoEstadosInput.value = ""; // Limpa o campo de entrada
    
    }

}

function editEstado(button) {
    const li = button.parentElement;
    const span = li.querySelector("span");
    const newText = prompt("Editar Estado:", span.textContent);
    // se nao estiver vazio, atualiza o texto
    if (newText !== null && newText.trim() !== "") {
        span.textContent = newText.trim();

    }
}

function deleteEstado(button) {
    const li = button.parentElement;
    conjuntoEstados.removeChild(li);
}