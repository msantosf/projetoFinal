# JOGO DA MEMÓRIA - Projeto Final Nanodegree Fundamentos Web Front-End

## Sobre o jogo

  O jogo consiste em um tabuleiro com um total de 8 pares de cartas distribuídas de forma aleatória. Os pares de cartas possuem imagens onde o jogador ao abrir uma carta, deve encontrar o seu par com a mesma imagem.

  Vence o jogo que achar os 8 pares.

  ### Sistema de Pontuação

  Cada par encontrado vale 1 ponto, logo a pontuação máxima atingida será de 8 pontos. O que diferenciará cada jogador será o sistema de qualificação por estrelas:

  * 3 estrelas: atingiu a pontuação máxima com menos de 14 jogadas;
  * 2 estrelas: atingiu a pontuação máxima com mais de 14 jogadas e com menos de 20 jogadas;
  * 1 estrela: atingiu a pontuação máxima com mais de 20 jogadas;

  Ao encontrar os 8 pares, junto da pontuação será apresentado o tempo levado para finalizar o jogo.

## Sobre o código

### index.html

HTML foi estruturado com tags semânticas como ```<main></main> , <header><header>``` e ```<section></section>```

O placar se encontra na tag ```<section></section>``` onde são encontrados:

 * os ícones das estrelas (```<li class="fa fa-star"></li>```);
 * o botão reiniciar (```<i class="fa fa-repeat"></i>```);
 * o cronômetro que marca o tempo do jogador (```<p id="tempo"></p>```). Vale ressaltar que todo o funcionamento do cronômetro é feito pelo arquivo JavaScript 'app.css' .

As cartas feitas no jogo são feitas pela tag ```<li></li>``` :

```<li class="carta">
  <i></i>
</li>```

As atribuições dos ícones das cartas e a randomização das mesmas é feita no arquivo 'app.css', nas funções ```iniciaTabuleiro()``` e ```shuffle(array)``` .

Ao final do arquivo poderá do arquivo HTML poderá ser visto a tag ```<div></div>``` sendo usada para a criação do modal com as estatísticas do vencedor do jogo.

## app.js

Arquivo responsável por efetuar toda a tratativa do jogo. A seguir um pouco das funções e eventos sendo explicados suas responsabilidades:

### Eventos

#### ```tabuleiro.addEventListener('click', function (evento)```

Evento principal do jogo. A partir dele que se desencadeia o jogo já que dentro de sua função possui a verificação:

```if (evento.target.nodeName === 'LI')```

Ou seja, se jogador clicou em uma carta iniciar processo do jogo. Processos esses que incluirão desde atribuição de classe CSS para tornar carta vísivel, comparação de cartas iguais e etc.


### Funções

#### ```shuffle(array)```

Função responsável por randomizar o array ```arrayClassIcon``` que contem as os nomes das classes CSS de cada imagem atribuída as cartas.

Tal função é chamada dentro da função ```iniciaTabuleiro``` .

Função reaproveitada do link: http://stackoverflow.com/a/2450976

#### ```iniciaTabuleiro()```

Função que com o próprio nome diz inicia o jogo e ao utilizar a função mencionada acima, distribui as cartas randomizadas no tabuleiro.

#### ```chamaModal()```

Função responsável por criar adicionar elementos ao modal das estatísticas do jogo.

Após a criação das váriaveis...

* ```const modal = document.getElementById('modalVitoria');```
* ```const subtitulo = document.createElement('h3');```
* ```const numVitoria = document.createElement('p');```
* ```const numJogadas = document.createElement('p');```
* ```const btnReiniciar = document.createElement('button');```
* ```const estrelaModal = document.createElement('p');```
* ```const contModal = document.querySelector('.modalContent');```

... a função através dos metódos como ```appendChild```, ```ìnnerHTML``` e ```textContent``` cria o necessário para que as estatísticas finais do jogador sejam apresentadas.
