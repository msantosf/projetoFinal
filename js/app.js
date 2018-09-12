/* ARMAZENA O NÓ COM A CLASSE TABULEIRO QUE SERÁ ÚTIL PARA EVENTO DE CLICK */
const tabuleiro = document.querySelector('.tabuleiro');
/*CRIA UM ARRAY DE NÓS CONTENDO CADA CARTA*/
const cartaArr = document.querySelectorAll('.carta');
/*ARRAY QUE ARMAZENA AS CLASSES QUE SERÃO OS ÍCONES DE CADA CARTA*/
const arrayClassIcon = [
  'fa-diamond' , 'fa-paper-plane-o' , 'fa-anchor' , 'fa-bolt' ,
  'fa-cube' , 'fa-leaf' , 'fa-diamond' , 'fa-paper-plane-o' ,
  'fa-anchor' , 'fa-bolt' , 'fa-cube' , 'fa-leaf'
];
/* ARRAY PARA ARMAZENAR VALOR DA CARTA SELECIONADA*/
let cartaAberta = [];

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
    //Testando funcionalidade
    console.log(evento.target.nodeName + ' foi clicado');
    /* SE O CLICK FOR EM UMA CARTA,
    CHAMA A FUNÇÃO QUE ATRIBUI AS CLASSES CSS 'aberta'
    'visualizar' TORNANDO VISÍVEL ASSIM A CARTA*/
    atribuiClassesCartas();
  }

  function atribuiClassesCartas () {
    evento.target.classList.add('aberta', 'visualizar');
    cartaAberta.push(evento.target.querySelector('i'));
    //Teste de funcionalidade
    if (cartaAberta.length < 3) {
        console.log(cartaAberta);
    }

  }

});

/* FUNÇÃO RESPONSÁVEL POR ATRIBUIR OS ÍCONES RANDOMIZADOS AS CARTAS */
function iniciaTabuleiro () {
  shuffle(arrayClassIcon);
  for (let cont = 0 ; cont <= cartaArr.length ; cont ++) {
    cartaArr[cont].querySelector('i').classList.add('fa', arrayClassIcon[cont]);
  }
}
iniciaTabuleiro();
