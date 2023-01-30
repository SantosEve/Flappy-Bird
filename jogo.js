const sprites = new Image()
sprites.src = './sprites.png';

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d');

//Desenhando o pássaro
const som_punch = new Audio();
som_punch.src = 'o-rei.mp3';

let animation_frame = 0;

const jogo = {};
function inicializa() {
    jogo.flappyBird = criaFlappyBird();
    jogo.planoDeFundo = criaPlanoDeFundo();
    jogo.chao = criaChao();
    jogo.canos = criaCanos();
    jogo.placar = criaPlacar();
    }

function fazColisao() {
if (jogo.flappyBird.y + jogo.flappyBird.altura > jogo.chao.d) {
    som_punch.play();
    telaAtiva = TelaGameOver;
    return;
}
else {
    return false;
}
}

function criaFlappyBird() {
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 35,
    altura: 25,
    x: 10,
    y: 50,

    pulo: 4.6,
    pula() {
        flappyBird.velocidade = - flappyBird.pulo;
    },
    desenha() {
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

    atualiza() {
        if (fazColisao() == true) {
            som_punch.play();
            telaAtiva = TelaGameOver;
            return;
        }
        flappyBird.velocidade += flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
        flappyBird.atualizaFrame();
    },
    movimentos: [
        { spriteX: 0, spriteY: 0, }, //asa pra cima
        { spriteX: 0, spriteY: 26, }, //asa no meio
        { spriteX: 0, spriteY: 52, }, //asa pra baixo
        { spriteX: 0, spriteY: 26, }, //asa no meio

    ],
    frameAtual: 0,
    atualizaFrame() {
        if ((animation_frame % 10) === 0) {
            flappyBird.frameAtual = flappyBird.frameAtual + 1;
            flappyBird.frameAtual = flappyBird.frameAtual % flappyBird.movimentos.length;
            flappyBird.spriteX = flappyBird.movimentos[flappyBird.frameAtual].spriteX;
            flappyBird.spriteY = flappyBird.movimentos[flappyBird.frameAtual].spriteY;
        }
    },
} 
    return flappyBird;
}
function criaPlanoDeFundo() {
const fundo = {
    spriteA: 420,
    spriteB: 0,
    largura: 239,
    altura: 200,
    a: 0,
    b: 230,
    desenha() {
        //Desenhando o céu
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height)
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
    return fundo;
}
//Desenhando o chão
function criaChao() {
const chao = {
    spriteC: 0,
    spriteD: 611,
    largura: 223,
    altura: 111,
    c: 0,
    d: 380,
    desenha() {
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
            chao.c + chao.largura, chao.d,
            chao.largura, chao.altura
        )
    },
    atualiza() {
        chao.c = chao.c - 2;
        chao.c = chao.c % (chao.largura / 2);
        }
    }
    return chao;
}
const inicio = {
spriteE: 130,
spriteF: 0,
largura: 180,
altura: 152,
e: 70,
f: 70,
desenha() {
    contexto.drawImage(
        sprites,
        inicio.spriteE, inicio.spriteF,
        inicio.largura, inicio.altura,
        inicio.e, inicio.f,
        inicio.largura, inicio.altura,
    );
    }
}
function criaCanos() {
const canos = {
    largura: 52,
    altura: 400,
    ceu: {
        spriteX: 52,
        spriteY: 169,
        x: 120,
        y: -150
    },
    chao: {
        spriteX: 0,
        spriteY: 169
    },
    pares: [],
    desenha() {
        for (i = 0; i < canos.pares.length; i++) {
            canos.ceu.x = canos.pares[i].x;
            canos.ceu.y = canos.pares[i].y;
            espacamentoEntreCanos = canos.pares[i].espacamentoEntreCanos;

            //[Cano do Céu]
            contexto.drawImage(
                sprites,
                canos.ceu.spriteX, canos.ceu.spriteY,
                canos.largura, canos.altura,
                canos.ceu.x, canos.ceu.y,
                canos.largura, canos.altura,
            )
            const canoChaoX = canos.ceu.x;
            const canoChaoY = canos.altura + espacamentoEntreCanos + canos.ceu.y;
            contexto.drawImage(
                sprites,
                canos.chao.spriteX, canos.chao.spriteY,
                canos.largura, canos.altura,
                canoChaoX, canoChaoY,
                canos.largura, canos.altura,
            )
        }
    },
    atualiza() {
        console.log("Número de obstáculos: " + canos.pares.length);
        if (canos.pares.length > 2) {
            canos.pares.shift()
        }
        for (i = 0; i < canos.pares.length; i++) {
            const par = canos.pares[i];
            par.x = par.x - 2;

            if (fazColisaoObstaculo(par)) {
                som_punch.play();
                telaAtiva = TelaGameOver;
                return;
            }
            if (fazColisao()) {
                som_punch.play();
                telaAtiva = TelaGameOver;
                return;
            }
            function fazColisaoObstaculo(par) {
                if (flappyBird.x + flappyBird.largura >= par.x) {
                    const alturaCabecaFlappy = flappyBird.y;
                    const alturaPeFlappy = flappyBird.y + flappyBird.altura;
                    const bocaCanoCeuY = par.y + canos.altura;
                    const bocaCanoChaoY = par.y + canos.altura + par.espacamentoEntreCanos;
                    if (alturaCabecaFlappy <= bocaCanoCeuY) {
                        return true;
                    }
                    if (alturaPeFlappy >= bocaCanoChaoY) {
                        return true;
                    }
                }
                return false;
            }
        }
        const passou100Frames = (animation_frame % 100 === 0);
        if (passou100Frames) {
            const novoPar = {
                x: canvas.width,
                y: -150 * (Math.random() + 1),
                espacamentoEntreCanos: 80 * (Math.random() + 1)
            }
            canos.pares.push(novoPar);
        }
    }
}
    return canos;
}
const TelaInicio = {
    desenha() {
        jogo.planoDeFundo.desenha();
        jogo.chao.desenha();
        jogo.flappyBird.desenha();
        jogo.inicio.desenha();
    },
    click() {
        telaAtiva = TelaJogo;
    }
}
function criaPlacar() {
    const placar = {
        pontos: 0,
        desenha() {
            contexto.font = '35px "Inconsolata"';
            contexto.textAlign = 'right';
            contexto.fillStyle = 'white';
            contexto.fillText("Score: " + placar.pontos, 335, 45);
        },
        atualiza() {
            const intervaloDeFramse = 20;
            const passouONTERVALO = animation_frame % intervaloDeFramse === 0;
            if (passouONTERVALO) {
                placar.pontos = placar.pontos + 1;
            }
        }
}
    return placar;
}
const gameOver = {
    spriteX: 134,
    spriteY: 153,
    largura: 226,
    altura: 200,
    x: 50,
    y: 70,
    desenha() {
        contexto.drawImage(
            sprites,
            gameOver.spriteX, gameOver.spriteY,
            gameOver.largura, gameOver.altura,
            gameOver.x, gameOver.y,
            gameOver.largura, gameOver.altura
        );
}
}
const TelaGameOver = {
    desenha() {
        gameOver.desenha();
    },
    click() {
        inicializa();
        telaAtiva = telaJogo;
    }
}
    const TelaJogo = {
    desenha() {
        jogo.fundo.desenha();
        jogo.fundo.atualiza();
        jogo.canos.desenha();
        jogo.canos.atualiza();
        jogo.chao.desenha();
        jogo.chao.atualiza();
        jogo.flappyBird.desenha();
        jogo.flappyBird.atualiza();
        jogo.placar.desenha();
        jogo.placar.atualiza();
    },
    click() {
        jogo.flappyBird.pula();
    }
}
var telaAtiva = TelaInicio;

function mudaTelaAtiva() {
    telaAtiva.click();
}

window.addEventListener("click", mudaTelaAtiva);

function loop(){
    telaAtiva.desenha()
    requestAnimationFrame(loop);
    animation_frame = animation_frame + 1;
}
inicializa();
loop();

