const sprites = new Image()
sprites.src = './sprites.png';

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d');

//Desenhando o pássaro
const som_punch = new Audio();
som_punch.src = './som/cruzeiro-radio-globo.mp3';

let animation_frame = 0;

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
        if((animation_frame % 10)  === 0){
            flappyBird.frameAtual = flappyBird.frameAtual + 1;
            flappyBird.frameAtual = flappyBird.frameAtual % flappyBird.movimentos.length;
            flappyBird.spriteX = flappyBird.movimentos[flappyBird.frameAtual].spriteX;
            flappyBird.spriteY = flappyBird.movimentos[flappyBird.frameAtual].spriteY;
        }
        },
    }

const fundo = {
    spriteA : 420,
    spriteB: 0,
    largura: 239,
    altura: 200,
    a: 0,
    b: 230,
    desenha(){
    //Desenhando o céu
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height)
        contexto.drawImage(
            sprites,
            fundo.spriteA, fundo.spriteB, 
            fundo.largura, fundo.altura,
            fundo.a, fundo.b,
            fundo.largura, fundo.altura
        )
        contexto.drawImage(
            sprites,
            fundo.spriteA, fundo.spriteB, 
            fundo.largura, fundo.altura,
            fundo.a + fundo.largura, fundo.b,
            fundo.largura, fundo.altura
        )
        contexto.drawImage(
            sprites,
            fundo.spriteA, fundo.spriteB, 
            fundo.largura, fundo.altura,
            fundo.a + fundo.largura + fundo.largura, fundo.b,
            fundo.largura, fundo.altura
        )
    },
    atualiza() {
        fundo.a = fundo.a - 0.5;
        fundo.a = fundo.a % (fundo.largura);
        }
}

//Desenhando o chão
const chao = {
    spriteC : 0,
    spriteD: 611,
    largura: 223,
    altura: 111,
    c: 0,
    d: 380,
    desenha(){
        contexto.drawImage(
            sprites,
            chao.spriteC, chao.spriteD, 
            chao.largura, chao.altura,
            chao.c, chao.d,
            chao.largura, chao.altura
        )
        contexto.drawImage(
            sprites,
            chao.spriteC, chao.spriteD, 
            chao.largura, chao.altura,
            chao.c+chao.largura, chao.d,
            chao.largura, chao.altura
        )
        },
    atualiza() {
        chao.c = chao.c - 2;
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
        fundo.atualiza();
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
        animation_frame = animation_frame + 1;
    }
    loop();

