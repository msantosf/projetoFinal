const listaNo = document.querySelectorAll('.carta');
const cartaArr= [];
const arrayClassIcon = [
  'fa-diamond' , 'fa-paper-plane-o' , 'fa-anchor' , 'fa-bolt' ,
  'fa-cube' , 'fa-leaf' , 'fa-diamond' , 'fa-paper-plane-o' ,
  'fa-anchor' , 'fa-bolt' , 'fa-cube' , 'fa-leaf'
];

listaNo.forEach(function (item,index){
  cartaArr[index] = item;
});

// EMBARALHA AS CARTAS
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

// ATRIBUI OS ICONES AS CARTAS E OS EVENTOS DE CLICK
function atribuiClassesCartas () {
  shuffle(arrayClassIcon);
  for(let cont = 0; cont <= cartaArr.length ; cont ++) {
    cartaArr[cont].querySelector('i').classList.add('fa',arrayClassIcon[cont]);
    cartaArr[cont].addEventListener('click',function () {
      cartaArr[cont].classList.add('aberta','visualizar');
    });
  }
}

function teste () {
  for (let cont = 0 ; cont <= cartaArr.length ; cont ++) {

  }
}

atribuiClassesCartas();
teste();
