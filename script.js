const conjuntoEstados = document.getElementById("conjuntoEstados");
const conjuntoEstadosInput = document.getElementById("conjuntoEstadosInput");
const conjuntoAlfabeto = document.getElementById("conjuntoAlfabeto");
const conjuntoAlfabetoInput = document.getElementById("conjuntoAlfabetoInput");

let estados = [];
let alfabeto = [];
let transicoes = {};

// ALFABETO
function addAlfabeto() {
    const alfabetoText = conjuntoAlfabetoInput.value.trim();
    if (alfabetoText) {
        alfabeto = alfabetoText.split(",").map(s => {
            s = s.trim().replace(/\s+/g, "");
            if (s === "" || s.toLowerCase() === "vazio") return "λ";
            return s;
        }).filter(s => s.length > 0);
        conjuntoAlfabeto.innerHTML = "";
        alfabeto.forEach(symbol => {
            const li = document.createElement("li");
            li.textContent = symbol;
            conjuntoAlfabeto.appendChild(li);
        });
    }
    conjuntoAlfabetoInput.value = "";
}

function mostrarListaAlfabeto() { console.log(alfabeto); }
function editAlfabeto(button) {}
function deleteAlfabeto(button) {}

// ESTADOS
function addEstado() {
    const estadoText = conjuntoEstadosInput.value.trim();
    if (estadoText) {
        estados = estadoText.split(",").map(s => s.trim().replace(/\s+/g, "")).filter(s => s.length > 0);
        conjuntoEstados.innerHTML = "";
        estados.forEach(estado => {
            const li = document.createElement("li");
            li.classList.add("state-item");
            li.textContent = estado;
            conjuntoEstados.appendChild(li);
        });
    }
    conjuntoEstadosInput.value = "";
}

function mostrarLista() { console.log(estados); }
function editEstado(index) {}
function deleteEstado(index) {}

// TABELA DE TRANSIÇÃO (AFN: MÚLTIPLOS DESTINOS)
function gerarTabelaTransicao() {
    if (estados.length === 0 || alfabeto.length === 0) {
        alert("Defina o conjunto de estados e o alfabeto antes de gerar a tabela de transição.");
        return;
    }
    const container = document.getElementById("tabelaTransicaoContainer");
    const salvarBtn = document.getElementById("salvarTransicoesBtn");

    let tableHTML = '<table class="transition-table"><thead><tr><th>δ</th>';
    alfabeto.forEach(symbol => { tableHTML += `<th>${symbol}</th>`; });
    tableHTML += '</tr></thead><tbody>';

    estados.forEach(estado => {
        tableHTML += `<tr><td>${estado}</td>`;
        alfabeto.forEach(symbol => {
            const optionsHTML = estados.map(destino =>
                `<option value="${destino}">${destino}</option>`
            ).join('');
            tableHTML += `<td>
                <select multiple class="transition-select" data-from-state="${estado}" data-on-symbol="${symbol}">
                    ${optionsHTML}
                </select>
            </td>`;
        });
        tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
    salvarBtn.style.display = "block";
}

function salvarTransicoes() {
    transicoes = {};
    const selects = document.querySelectorAll(".transition-select");
    selects.forEach(select => {
        const fromState = select.dataset.fromState;
        const onSymbol = select.dataset.onSymbol;
        const destinos = Array.from(select.selectedOptions).map(opt => opt.value);
        if (!transicoes[fromState]) transicoes[fromState] = {};
        transicoes[fromState][onSymbol] = destinos;
    });
    alert("Função de transição salva! Transições não preenchidas são consideradas inexistentes.");
    console.log("Estrutura da Função de Transição:", transicoes);
}

// DIAGRAMA DO AUTÔMATO
function desenharAutomatoSimples() {
    const estadoInicial = document.getElementById("estadoInicialInput").value.trim().replace(/\s+/g, "");
    const estadosFinaisInput = document.getElementById("estadosFinaisInput").value.trim();
    const estadosFinais = estadosFinaisInput.split(",").map(s => s.trim().replace(/\s+/g, "")).filter(s => s.length > 0);

    if (!estadoInicial || estados.length === 0 || Object.keys(transicoes).length === 0) {
        alert("Defina o estado inicial, o conjunto de estados e as transições antes de desenhar.");
        return;
    }

    let mermaidString = "stateDiagram-v2\n";
    mermaidString += "direction LR\n";
    mermaidString += `[*] --> ${estadoInicial}\n`;

    Object.keys(transicoes).forEach(fromState => {
        Object.keys(transicoes[fromState]).forEach(onSymbol => {
            const destinos = transicoes[fromState][onSymbol];
            destinos.forEach(toState => {
                if (toState && toState.length > 0) {
                    mermaidString += `${fromState} --> ${toState} : ${onSymbol}\n`;
                }
            });
        });
    }); 

        // Definir estilo dos estados finais (fundo azul, texto branco)
    if (estadosFinais.length > 0) {
        mermaidString += 'classDef finalState fill:#2196f3,stroke:#21f6f3,color:#000000;\n';
        
        estadosFinais.forEach(finalState => {
            if (finalState && finalState.length > 0) {
                // Aplica a classe "finalState" ao estado final
                mermaidString += `class ${finalState} finalState fill:#2196f3,stroke:#21f6f3,color:#000000;\n`;
            }
        });
    }



    console.log("Mermaid:\n" + mermaidString);

    const container = document.getElementById("diagramaContainer");
    container.innerHTML = mermaidString;
    container.removeAttribute('data-processed');
    mermaid.initialize({ startOnLoad: true });
    mermaid.run();
}
// SIMULAÇÃO DE CADEIA (AFN)
function testarCadeia() {
    const cadeia = document.getElementById("inputCadeia").value.trim();
    const estadoInicial = document.getElementById("estadoInicialInput").value.trim().replace(/\s+/g, "");
    const estadosFinaisInput = document.getElementById("estadosFinaisInput").value.trim();
    const estadosFinais = estadosFinaisInput.split(",").map(s => s.trim().replace(/\s+/g, "")).filter(s => s.length > 0);

    let estadosAtuais = [estadoInicial];

    for (const simbolo of cadeia) {
        let proximosEstados = [];
        estadosAtuais.forEach(estado => {
            if (transicoes[estado] && transicoes[estado][simbolo]) {
                proximosEstados = proximosEstados.concat(transicoes[estado][simbolo]);
            }
        });
        estadosAtuais = [...new Set(proximosEstados)];
        if (estadosAtuais.length === 0) break;
    }

    const aceita = estadosAtuais.some(e => estadosFinais.includes(e));
    document.getElementById("resultadoCadeia").textContent = aceita ? "ACEITA" : "REJEITA";
}
