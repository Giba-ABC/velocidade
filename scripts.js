const texto      = document.querySelector('#texto')
const entrada    = document.querySelector('#entrada')
const reiniciarBTN  = document.querySelector('#reiniciar')
const historico  = document.querySelector('#historico')
const resultado  = document.querySelector('#resultado')
const alternarTemaBTN = document.querySelector('#alternarTema')


const textos = [
    "exemplo de texto",
    "Outro exemplo de texto",
    "mais um",
    "pronto",
    "quase lá"
];

function novoTexto() {
    const index = Math.floor(Math.random() * textos.length);
    texto.textContent = textos[index];
}

function atualizarTeste() {
    iniciar()

    if (entrada.value === texto.textContent) {
        verificar();
    }
}

function iniciar() {
    const statusdoTeste = JSON.parse(localStorage.getItem("testeAndamento"));
    if (!statusdoTeste) {
        localStorage.setItem("tempoinicial", new Date().getTime());
        localStorage.setItem("testeAndamento", true)
    }
}

function verificar() {

    const tempoFinal = new Date().getTime()
    const tempoInicial = parseInt(localStorage.getItem('tempoinicial'))
    const tempogasto = (tempoFinal - tempoInicial) / 1000
    resultado.textContent = `Parabens !!! voce levou ${tempogasto} segundos !!! `
    localStorage.setItem('testeAndamento', false);

    adicionarHistorico(texto.textContent, tempogasto);
    entrada.value = "";
    novoTexto()
}

function adicionarHistorico(texto, tempo) {
    const itemHistorico = document.createElement("p")
    itemHistorico.textContent = `Texto "${texto}" - Tempo : ${tempo} em segundos `
    historico.appendChild(itemHistorico)
}

function reiniciar() {
    entrada.value = ""
    resultado.textContent = ""
    novoTexto()
    localStorage.setItem('testeAndamento', false)
    historico.innerHTML = ""
}

function alternarTema() {
    const body = document.body;
    body.classList.toggle("claro");
    body.classList.toggle("escuro") 
}

alternarTemaBTN.addEventListener("click", alternarTema)
entrada.addEventListener("keyup", atualizarTeste)
reiniciarBTN.addEventListener("click", reiniciar)

novoTexto();