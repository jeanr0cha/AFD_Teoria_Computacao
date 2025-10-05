const conjuntoEstados = document.getElementById('conjuntoEstados');
const conjuntoEstadosInput = document.getElementById('conjuntoEstadosInput');

const coonjuntoAlfabeto = document.getElementById('conjuntoAlfabeto');
const conjuntoAlfabetoInput = document.getElementById('conjuntoAlfabetoInput');

let estados = [];
let alfabeto = [];

//ALFABETO
function addAlfabeto() {
    const alfabetoText = conjuntoAlfabetoInput.value.trim(); // limpa espaços em branco
    if (alfabetoText !== "") { 
        alfabeto.push(alfabetoText);
        console.log("Adicionou -->:", alfabeto);

        const criaAlfabeto = document.createElement('li');
        criaAlfabeto.innerHTML = `
            <span>${alfabetoText}</span>
            <button class="editButton" onclick="editAlfabeto(this)">Editar</button>
            <button class="deleteButton" onclick="deleteAlfabeto(this)">Remover</button>
        `
        coonjuntoAlfabeto.appendChild(criaAlfabeto); // Adiciona o novo estado à lista
        conjuntoAlfabetoInput.value = ""; // Limpa o campo de entrada 

        
    }
}

function mostrarListaAlfabeto(){
    console.log(alfabeto);
}

function editAlfabeto(button) {
    const criaAlfabeto = button.parentElement;
    const span = criaAlfabeto.querySelector("span");
    const oldText = span.textContent;
    const newText = prompt("Editar Alfabeto:", oldText);
    // se nao estiver vazio, atualiza o texto
    if (newText !== null && newText.trim() !== "") {
        const newTextTrimmed = newText.trim();
        span.textContent = newTextTrimmed;

        const index = alfabeto.indexOf(oldText);
        if (index !== -1) {
            alfabeto[index] = newTextTrimmed;
        }
        console.log("editou -->", alfabeto);

    }
}

function deleteAlfabeto(button) {
    const criaAlfabeto = button.parentElement;
    const textToRemove = criaAlfabeto.querySelector("span").textContent;
    const index = alfabeto.indexOf(textToRemove);
    if (index !== -1) {
        alfabeto.splice(index, 1);
    }
    conjuntoEstados.removeChild(criaAlfabeto);
    console.log("deletou -->:", alfabeto);
}



//ESTADO

function addEstado() {
    const estadoText = conjuntoEstadosInput.value.trim();
    if (estadoText !== "") {

        const maxText = estadoText.substring(0, 35);
        estados.push(maxText); 
        console.log("Adicionou -->:", estados); 
        
        const criaEstadoLista = document.createElement('li');
        criaEstadoLista.innerHTML = `
            <span>${maxText}</span>
            <button class="editButton" onclick="editEstado(this)">Editar</button>
            <button class="deleteButton" onclick="deleteEstado(this)">Remover</button>
        `;
        conjuntoEstados.appendChild(criaEstadoLista); // Adiciona o novo estado à lista
        conjuntoEstadosInput.value = ""; // Limpa o campo de entrada    
    }    

}

function mostrarLista(){
    console.log(estados);
}




function editEstado(button) {
    const criaEstadoLista = button.parentElement;
    const span = criaEstadoLista.querySelector("span");
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
    const criaEstadoLista = button.parentElement;
    const textToRemove = criaEstadoLista.querySelector("span").textContent;
    const index = estados.indexOf(textToRemove);
    if (index !== -1) {
        estados.splice(index, 1);
    }
    conjuntoEstados.removeChild(criaEstadoLista);
    console.log("deletou -->:", estados);
}

