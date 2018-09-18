/* ARMAZENA O NÓ COM A CLASSE TABULEIRO QUE SERÁ ÚTIL PARA EVENTO DE CLICK */
const tabuleiro = document.querySelector('.tabuleiro');
/*CRIA UM ARRAY DE NÓS CONTENDO CADA CARTA*/
const cartaArr = document.querySelectorAll('.carta');
/*ARRAY QUE ARMAZENA AS CLASSES QUE SERÃO OS ÍCONES DE CADA CARTA*/
const arrayClassIcon = [
  'fa-diamond' , 'fa-paper-plane-o' , 'fa-anchor' , 'fa-bolt' ,
  'fa-cube' , 'fa-leaf' , 'fa-diamond' , 'fa-paper-plane-o' ,
  'fa-anchor' , 'fa-bolt' , 'fa-cube' , 'fa-leaf',
  'fa-bicycle' , 'fa-bomb' , 'fa-bicycle' , 'fa-bomb'
];
/* ARRAY PARA ARMAZENAR VALOR DA CARTA SELECIONADA */
let cartaAberta = [];
/* VARIÁVEL QUE ARMAZENA A PONTUÇÃO DO JOGO */
let pontuacao = 0;
/* VARIÁVEL QUE ARMAZENA A PONTUAÇÃO MÁXIMA DO JOGO */
let pontMax = cartaArr.length / 2;
/* VARIÁVEIS PARA ARMAZENAR QUANTIDADE DE JOGADAS */
let jogadas = 0;
let movimentos = document.querySelector('.jogadas');
/* VARIÁVEL PARA MANIPULAÇÃO DAS ESTRELAS DO PLACAR */
let estrela = document.querySelector('.estrela');
/* VARIÁVEL PARA REINICIAR JOGO */
const reinicia = document.querySelector('.reiniciar');
// CRIANDO VARIÁVEIS NECESSÁRIAS AO MODAL
const modal = document.getElementById('modalVitoria');
const subtitulo = document.createElement('h3');
const numVitoria = document.createElement('p');
const numJogadas = document.createElement('p');
const btnReiniciar = document.createElement('button');
const contModal = document.querySelector('.modalContent');


/* EMBARALHA AS CARTAS */
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

/* REINICIA O JOGO */
reinicia.onclick = function () {
  document.location.reload(true);
}

/* ADICIONANDO EVENTO DE CLICK NA CARTA */
tabuleiro.addEventListener('click', function (evento){
  if (evento.target.nodeName === 'LI') {
    /* SE O CLICK FOR EM UMA CARTA,
    CHAMA A FUNÇÃO QUE ATRIBUI AS CLASSES CSS 'aberta'
    'visualizar' TORNANDO VISÍVEL ASSIM A CARTA*/
    atribuiClassesCartas();
  }

  function atribuiClassesCartas () {
    //ADICIONA A CARTA SELECIONADA AS CLASSES PARA MOSTRAR A CARTA
    evento.target.classList.add('aberta', 'visualizar');

    //TESTE PARA ADICIONAR APENAS 2 VALORES AO ARRAY PARA COMPARAÇÃO
    if (cartaAberta.length < 2) {
      //CASO O TAMANHO DO ARRAY SEJA MENOR QUE 2, ADICIONA O ICONE DA CARTA AO ARRAY
      cartaAberta.push(evento.target.querySelector('i'));
      //GARANTINDO QUE A MESMA CARTA NÃO SEJA CLICADA MAIS DE UMA VEZ
      evento.target.style.pointerEvents = "none";
    }

    //TESTE PARA DESABILITAR A ABERTURA DE NOVAS CARTAS CASO JÁ EXISTAM 2 ABERTAS
    if (cartaAberta.length === 2) {
      //DESABILTA CLICK QUE PODERIA ABRIR UMA NOVA CARTA ENQUANTO A COMPARAÇÃO É FEITA
      document.body.style.pointerEvents = "none";
      // CHAMA FUNÇÃO QUE FARÁ A COMPARAÇÃO DAS DUAS CARTAS NO ARRAY
      comparacao();
    }
  }
});

/* FUNÇÃO EFETUA OS TESTES NECESSÁRIOS SE CARTAS SÃO IGUAIS OU NÃO*/
function comparacao () {
  //TESTA IGUALDADE DAS CARTAS
  if (cartaAberta[0].className === cartaAberta[1].className) {
    // CARTAS IGUAIS, LOGO É ATRIBUÍDA A CLASSE CSS MATH QUE VALIDA VISUALMENTE O ACERTO
    cartaAberta[0].parentElement.classList.add('match');
    cartaAberta[1].parentElement.classList.add('match');

    //CARTAS IGUAIS, O ARRAY É REINICIADO PARA RECEBER NOVAS CARTAS
    cartaAberta = [];

    //HABILITA O MOUSE NOVAMENTE PARA CONTINUAR O JOGO
    document.body.style.pointerEvents = "auto";

    // SE CARTAS IGUAIS, INCREMENTA PONTUAÇÃO E JOGADAS
    pontuacao ++;
    jogadas ++;
    movimentos.innerHTML ++;
    movimentosEstrela();
    // TESTE SE PONTUAÇÃO CHEGAR AO MÁXIMO PERMITIDO, FINALIZA O JOGO
    if (pontuacao === pontMax){
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
  // PERMITINDO QUE A CARTA VOLTE A SER CLICADA
  cartaAberta[0].parentElement.style.pointerEvents = "auto";
  cartaAberta[1].parentElement.classList.remove('aberta', 'visualizar', 'unmatch');
  // PERMITINDO QUE A CARTA VOLTE A SER CLICADA
  cartaAberta[1].parentElement.style.pointerEvents = "auto";
  //PERMITINDO NOVAMENTE O CLICK
  document.body.style.pointerEvents = "auto";
  //ESVAZIA ARRAY DE CARTAS PARA NOVA COMPARAÇÃO
  cartaAberta = [];
}

function movimentosEstrela () {
    if (jogadas >= 14 && jogadas < 20) {
      estrela.children[2].classList.remove('fa' , 'fa-star');
    }

    if (jogadas >= 20) {
      estrela.children[1].classList.remove('fa' , 'fa-star' );
    }
}

function chamaModal () {
  modal.style.display = 'block';
  subtitulo.textContent = 'Vencedor!!!';
  contModal.appendChild(subtitulo);
  numVitoria.textContent = 'Pontuação: ' + pontuacao;
  contModal.appendChild(numVitoria);
  numJogadas.textContent = 'Movimentos: ' + jogadas;
  contModal.appendChild(numJogadas);
  btnReiniciar.innerHTML = '<span>Reiniciar jogo? <i class="fa fa-repeat"></i></span>';
  contModal.appendChild(btnReiniciar);
  btnReiniciar.onclick = function () {
    document.location.reload(true);
  }
}

/* FUNÇÃO RESPONSÁVEL POR ATRIBUIR OS ÍCONES RANDOMIZADOS AS CARTAS */
function iniciaTabuleiro () {
  shuffle(arrayClassIcon);
  movimentos.innerHTML = 0;
  cartaAberta = [];
  for (let cont = 0 ; cont <= cartaArr.length ; cont ++) {
    cartaArr[cont].querySelector('i').classList.add('fa', arrayClassIcon[cont]);
  }
}
iniciaTabuleiro();
