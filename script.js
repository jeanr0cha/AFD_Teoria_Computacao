const conjuntoEstados = document.getElementById('conjuntoEstados');
const conjuntoEstadosInput = document.getElementById('conjuntoEstadosInput');

let estados = [];



function addEstado() {
    const estadoText = conjuntoEstadosInput.value.trim();
    if (estadoText !== "") {

        // --- VERIFICAÇÃO DO TIPO DE ESTADO ---
        // if (estadoText.includes('{q0')) {
        //     console.log("Identificado: Estado Inicial!");
        // } else if (estadoText.includes('{qf')) {
        //     console.log("Identificado: Estado Final!");
        // }
        // ------------------------------------

        const maxText = estadoText.substring(0, 35);
        estados.push(maxText); 
        console.log("Adicionou -->:", estados); 
        
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

function mostrarLista(){
    console.log(estados);
}




function editEstado(button) {
    const li = button.parentElement;
    const span = li.querySelector("span");
    const oldText = span.textContent;
    const newText = prompt("Editar Estado:", oldText);
    // se nao estiver vazio, atualiza o texto
    if (newText !== null && newText.trim() !== "") {
        const newTextTrimmed = newText.trim();
        span.textContent = newTextTrimmed;

        const index = estados.indexOf(oldText);
        if (index !== -1) {
            estados[index] = newTextTrimmed;
        }
        console.log("editou -->", estados);

    }
}

function deleteEstado(button) {
    const li = button.parentElement;
    const textToRemove = li.querySelector("span").textContent;
    const index = estados.indexOf(textToRemove);
    if (index !== -1) {
        estados.splice(index, 1);
    }
    conjuntoEstados.removeChild(li);
    console.log("deletou -->:", estados);
}

