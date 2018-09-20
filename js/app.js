/* Armazena o nó com a classe tabuleiro que será útil para evento de click */
const tabuleiro = document.querySelector('.tabuleiro');
/* Cria um array de nós contendo cada carta */
const cartaArr = document.querySelectorAll('.carta');
/* Array que armazema as classes que serão os os ícones de cada carta */
const arrayClassIcon = [
  'fa-diamond' , 'fa-paper-plane-o' , 'fa-anchor' , 'fa-bolt' ,
  'fa-cube' , 'fa-leaf' , 'fa-bicycle' , 'fa-bomb'
];
/* Array criado para concatenar o arrayClassIcon fazendo assim a criação dos 8 pares de cartas */
const doisBaralhos = arrayClassIcon.concat(arrayClassIcon);
/* Array para armazenar valor da carta selecionada */
let cartaAberta = [];
/* Variável que armazema pontuação do jogo */
let pontuacao = 0;
/* Variável que armazena a pontuação máxima do jogo */
let pontMax = cartaArr.length / 2;
/* Variáveis para armazenar a quantidade de jogadas */
let jogadas = 0;
let movimentos = document.querySelector('.jogadas');
/* Variável para a manipulação das estrelas do placas */
let estrela = document.querySelector('.estrela');
let estrelaMax = 3;
/* Variável para reiniciar o jogo */
const reinicia = document.querySelector('.reiniciar');
/* Criando variáveis necessárias ao modal */
const modal = document.getElementById('modalVitoria');
const subtitulo = document.createElement('h3');
const numVitoria = document.createElement('p');
const numJogadas = document.createElement('p');
const btnReiniciar = document.createElement('button');
const estrelaModal = document.createElement('p');
const contModal = document.querySelector('.modalContent');
/* Criando variáveis necessárias ao cronômetro */
let tempoElem = document.getElementById('tempo');
let tempoInicio = false;
let minutos = 0;
let segundos = 0;

/* Função que embaralha as cartas */
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

/* Reinicia o jogo */
reinicia.onclick = function () {
  document.location.reload(true);
}

/* Adicionando evento de click na carta */
tabuleiro.addEventListener('click', function (evento){
  if (evento.target.nodeName === 'LI') {
    if (tempoInicio === false) {
      tempoInicio = true;
      iniciaTempo();
    }
    /* Se o click for em uma carta,
    chama a função que atribui as classes CSS '.aberta' e
    '.visualizar' tornando vísivil assim a carta */
    atribuiClassesCartas();
  }

  function atribuiClassesCartas () {
    // Adiciona a carta selecionada as classes para mostrar a carta
    evento.target.classList.add('aberta', 'visualizar');

    // Teste para adicionar apenas 2 valores ao array para comparação
    if (cartaAberta.length < 2) {
      // Caso o tamanho do array seja menor que 2, adiciona o ícone da carta ao array
      cartaAberta.push(evento.target.querySelector('i'));
      // Garantindo que a mesma carta não seja clicada mais de uma vez
      evento.target.style.pointerEvents = "none";
    }

    // Teste para desabilitar a abertura de novas cartas caso já existam 2 abertas
    if (cartaAberta.length === 2) {
      // Desabilita click que poderia abrir uma nova carta enquantoa comparação é feita
      document.body.style.pointerEvents = "none";
      // Chama função que fará a comparação das duas cartas no array
      comparacao();
    }
  }
});

/* Função efetua os testes necessários se cartas são iguais ou não */
function comparacao () {
  // Testa igualdade das cartas
  if (cartaAberta[0].className === cartaAberta[1].className) {
    // Cartas iguais, logo é atribuída a classe CSS '.match' que valida visualmente o acerto
    cartaAberta[0].parentElement.classList.add('match');
    cartaAberta[1].parentElement.classList.add('match');

    // Cartas iguais, o array é reiniciado para receber novas cartas
    cartaAberta = [];

    // Habilita o mouse novamente para continuar o jogo
    document.body.style.pointerEvents = "auto";

    // Se cartas iguais, incrementa pontuação e jogadas
    pontuacao ++;
    jogadas ++;
    movimentos.innerHTML ++;
    movimentosEstrela();
    // Teste se pontuação chegar ao máximo permitido, finaliza o jogo
    if (pontuacao === pontMax){
      paraTempo();
      chamaModal();
    }
  } else if (cartaAberta[0].className !== cartaAberta[1].className) {
    cartaAberta[0].parentElement.classList.add('unmatch');
    cartaAberta[1].parentElement.classList.add('unmatch');
    jogadas ++;
    movimentos.innerHTML ++;
    movimentosEstrela();
    setTimeout(removeClasseCarta,1500);
  }
}

function removeClasseCarta () {
  cartaAberta[0].parentElement.classList.remove('aberta', 'visualizar', 'unmatch');
  // Permitindo que a carta volte a ser clicada
  cartaAberta[0].parentElement.removeAttribute("style");
  cartaAberta[1].parentElement.classList.remove('aberta', 'visualizar', 'unmatch');
  // Permitindo que a carta volte a ser clicada
  cartaAberta[1].parentElement.removeAttribute("style");
  // Permitindo novamente o click
  document.body.style.pointerEvents = "auto";
  // Esvazia array de cartas para nova comparação
  cartaAberta = [];
}

function movimentosEstrela () {
    if (jogadas >= 14 && jogadas < 20) {
      estrela.children[2].classList.remove('fa' , 'fa-star');
      if (jogadas === 14) {
          estrelaMax --;
      }
    }

    if (jogadas >= 20) {
      estrela.children[1].classList.remove('fa' , 'fa-star' );
      if (jogadas === 20) {
          estrelaMax --;
      }
    }
}

/* Função que cria o modal, criando os elementos necessários para informação
de estatísticas */
function chamaModal () {
  modal.style.display = 'block';
  subtitulo.textContent = 'Vencedor!!!';
  contModal.appendChild(subtitulo);
  numVitoria.textContent = 'Pontuação: ' + pontuacao;
  contModal.appendChild(numVitoria);
  estrelaModal.innerHTML = estrelaMax + " estrelas";
  contModal.appendChild(estrelaModal);
  numJogadas.textContent = 'Movimentos: ' + jogadas;
  contModal.appendChild(numJogadas);
  tempoElem.innerHTML = minutos + " minutos e " + segundos + " segundos!";
  contModal.appendChild(tempoElem);
  btnReiniciar.innerHTML = '<span>Reiniciar jogo? <i class="fa fa-repeat"></i></span>';
  contModal.appendChild(btnReiniciar);
  btnReiniciar.onclick = function () {
    document.location.reload(true);
  }
  // Fechar modal ao clicar fora do mesmo
  window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	};
}

function iniciaTempo () {
  tempo = setInterval (function () {
    segundos ++;
    if (segundos === 60) {
      minutos ++;
      segundos = 0 ;
    }
    tempoElem.innerHTML = minutos + ":" + segundos ;
  },1000);
}

function paraTempo () {
  clearInterval(tempo);
}

/* Função responsável por atribuir os ícones randomizados as cartas */
function iniciaTabuleiro () {
  shuffle(doisBaralhos);
  movimentos.innerHTML = 0;
  cartaAberta = [];
  for (let cont = 0 ; cont <= cartaArr.length ; cont ++) {
    cartaArr[cont].querySelector('i').classList.add('fa', doisBaralhos[cont]);
  }
}
iniciaTabuleiro();
