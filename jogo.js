const sprites = new Image()
sprites.src = './sprites.png';

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d');

//Desenhando o pássaro
const som_punch = new Audio();
som_punch.src = './som/punch.wav';
function fazColisao(){
    if (flappyBird.y+flappyBird.altura>chao.d){
        return true;
}
    else{
        return false;
    }
}
const flappyBird = {
    spriteX : 0,
    spriteY: 0,
    largura: 35,
    altura: 25,
    x: 10,
    y: 50,

    pulo : 4.6,
    pula (){
        flappyBird.velocidade = - flappyBird.pulo;},
    desenha(){
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY, 
            flappyBird.largura, flappyBird.altura,
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura,
        );
    },
    gravidade: 0.25,
    velocidade: 0,
        
    atualiza(){
        if(fazColisao()==true){
            som_punch.play();
            telaAtiva = TelaInicio;
            return;
        }
        flappyBird.velocidade += flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
        flappyBird.atualizaFrame();
    },
    movimentos: [
        {spriteX: 0, spriteY: 0, }, //asa pra cima
        {spriteX: 0, spriteY: 26, }, //asa no meio
        {spriteX: 0, spriteY: 52, }, //asa pra baixo
        {spriteX: 0, spriteY: 26, }, //asa no meio

    ],
    frameAtual: 0,
    atualizaFrame(){
        flappyBird.frameAtual = flappyBird.frameAtual + 1;
        flappyBird.frameAtual = flappyBird.frameAtual % flappyBird.movimentos.length;
        flappyBird.spriteX = flappyBird.movimentos[flappyBird.frameAtual].spriteX;
        flappyBird.spriteY = flappyBird.movimentos[flappyBird.frameAtual].spriteY;
    
    }
}

const fundo = {
    spriteA : 420,
    spriteB: 10,
    largura: 279,
    altura: 100,
    a: 0,
    b: 100,
    desenha(){
    //Desenhando o céu
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height)
        contexto.drawImage(
            sprites,
            fundo.spriteA, fundo.spriteB, 
            fundo.largura, fundo.altura,
            fundo.a, fundo.b,
            370, 250,
        );
    }
}

//Desenhando o chão
const chao = {
    spriteC : 0,
    spriteD: 611,
    largura: 225,
    altura: 111,
    c: 0,
    d: 330,
    desenha(){
        contexto.drawImage(
            sprites,
            chao.spriteC, chao.spriteD, 
            chao.largura, chao.altura,
            chao.c, chao.d,
            327, 150,
        )
        contexto.drawImage(
            sprites,
            chao.spriteC, chao.spriteD, 
            chao.largura, chao.altura,
            chao.c+chao.largura, chao.d,
            327, 150,
        )
        },
    atualiza() {
        chao.c = chao.c - 1;
        chao.c = chao.c % (chao.largura / 2);
        }
    }

const inicio = {
    spriteE: 130,
    spriteF: 0,
    largura: 180,
    altura: 152,
    e: 70,
    f: 70,
    desenha(){
        contexto.drawImage(
            sprites,
            inicio.spriteE, inicio.spriteF,
            inicio.largura, inicio.altura,
            inicio.e, inicio.f,
            inicio.largura, inicio.altura,
        );
    }

}
const TelaInicio = {
    desenha(){
        fundo.desenha();
        chao.desenha();
        flappyBird.desenha();
        inicio.desenha();
    },
    click(){
        telaAtiva = TelaJogo;
    }
}

const TelaJogo = {
    desenha(){
        fundo.desenha();
        chao.desenha();
        chao.atualiza();
        flappyBird.desenha();
        flappyBird.atualiza()
    },
    click(){
        flappyBird.pula();
    }
}

var telaAtiva = TelaInicio;

function mudaTelaAtiva(){
    telaAtiva.click();
}

window.addEventListener("click", mudaTelaAtiva);

function loop(){
    telaAtiva.desenha()
        requestAnimationFrame(loop);
    }
    loop();

