//parâmetros circle
let x = 300;
let y = 200;
let d = 15;
let r = d / 2;

//velocidade 
let velocidadeXBolinha = 8;
let velocidadeYBolinha = 8;

//variáveis da raquete
let xR = 5;
let yR = 150;
let w = 10;
let h = 70;

//variáveis do oponente
let xROP = 585;
let yROP = 150;
let velocidadeYOP;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

let chanceDeErrar = 0;

function preload() {
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  mostBolinha();
  movBolinha();
  coliBorda();
  raquete();
  raqueteOP();
  movRaquete();
  movRaqueteOP();
  //coliRaquete();
  colisaoRaquete();
  colisaoRaqueteOP();
  incluiPlacar();
  marcaPonto();
  calculaChanceDeErrar();
  bolinhaNaoFicaPresa();
}

function mostBolinha(){
  circle(x, y, d);
}

function movBolinha(){
  x += velocidadeXBolinha;
  y += velocidadeYBolinha;
}

function coliBorda(){
  if (x + r > width || x - r < 0) {
    velocidadeXBolinha *= -1;
  }
  
  if (y + r > height || y - r < 0){
    velocidadeYBolinha *= -1;
  }
}

function raqueteOP(){
  rect(xR, yR, w, h);
}


function raquete(){
  rect(xROP, yROP, w, h);
}

function movRaquete(){
  if (keyIsDown(UP_ARROW)){
    yR -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yR += 10;
  }
}

function coliRaquete (){
  if (x - r < xR + w && y - r < yR + h && y + r > yR){
    velocidadeXBolinha *= -1;
  }
}

function colisaoRaquete(){
colidiu = collideRectCircle(xR, yR, w, h, x, y, r);
    if (colidiu) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}

function movRaqueteOP(){
  velocidadeYOP = y - yROP - h /2 - 30;
  yROP += velocidadeYOP
  calculaChanceDeErrar()
}


function colisaoRaqueteOP(){
colidiu = collideRectCircle(xROP, yROP, w, h, x, y, r);
    if (colidiu) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}

function incluiPlacar() {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
    if (x > 590) {
        meusPontos += 1;
        ponto.play();
    }
    if (x < 10) {
        pontosDoOponente += 1;
        ponto.play();
    }
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function bolinhaNaoFicaPresa(){
    if (x - r < 0){
    x = 23
    }
}
