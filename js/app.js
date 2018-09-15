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
/* ARRAY PARA ARMAZENAR VALOR DA CARTA SELECIONADA*/
let cartaAberta = [];
//VARIÁVEL QUE ARMAZENA A PONTUÇÃO DO JOGO
let pontuacao = 0;
//VARIÁVEL QUE ARMAZENA A PONTUAÇÃO MÁXIMA DO JOGO
let pontMax = cartaArr.length / 2;
let jogadas = 0;

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
    jogadas ++
    // TESTE SE PONTUAÇÃO CHEGAR AO MÁXIMO PERMITIDO, FINALIZA O JOGO
    if (pontuacao === pontMax){
      console.log('vencedor!!');
    }
    console.log('Cartas Iguais');
  } else if (cartaAberta[0].className !== cartaAberta[1].className) {
    console.log('Cartas diferentes!');
    setTimeout(removeClasseCarta,1500);
    jogadas ++;
    document.body.style.pointerEvents = "auto";
  }
}

function removeClasseCarta () {
  cartaAberta[0].parentElement.classList.remove('aberta', 'visualizar');
  cartaAberta[1].parentElement.classList.remove('aberta', 'visualizar');
  cartaAberta = [];
}

/* FUNÇÃO RESPONSÁVEL POR ATRIBUIR OS ÍCONES RANDOMIZADOS AS CARTAS */
function iniciaTabuleiro () {
  shuffle(arrayClassIcon);
  for (let cont = 0 ; cont <= cartaArr.length ; cont ++) {
    cartaArr[cont].querySelector('i').classList.add('fa', arrayClassIcon[cont]);
  }
}
iniciaTabuleiro();
