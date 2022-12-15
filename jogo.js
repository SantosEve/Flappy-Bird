const sprites = new Image()
sprites.src = './sprites.png';

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d');

//Desenhando o pássaro
const flappyBird = {
    spriteX : 0,
    spriteY: 0,
    largura: 35,
    altura: 25,
    x: 10,
    y: 50,
    desenha(){
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY, 
            flappyBird.largura, flappyBird.altura,
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura,
        );
    }
}
//Desenhando o céu
contexto.fillStyle = '#70c5ce';
contexto.fillRect(0,0, canvas.width, canvas.height)

const fundo = {
    spriteA : 420,
    spriteB: 10,
    largura: 279,
    altura: 100,
    a: 0,
    b: 100,
    desenha(){
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
        );
    }
}

function loop(){
    flappyBird.desenha();
    fundo.desenha();
    chao.desenha();
        requestAnimationFrame(loop);
    }
    loop();
