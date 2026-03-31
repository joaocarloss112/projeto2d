const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;


let bola = {
    x: W /2 ,
    y: H - 100,
    z: 1.0,        
    chutando: false,
    angulo: 0,
    alvoX: 0,
    alvoY: 0,
    velocidade: 0.1
};

let goleiro = {
    x: W / 2,
    y: 160,
    largura: 100,
    altura: 80,
    velocidade: 3,
    direcao: 1
};

let placar = 0;
let mensagem = "Comeeeeeeeça o jogo!";



function desenhaGol() {
    ctx.strokeStyle = "white"; //trave
    ctx.lineWidth = 10;
    ctx.strokeRect(100, 100, 500, 250); 
    
    ctx.lineWidth = 0.8; // Rede
    ctx.beginPath();
    for(let i = 120; i < 600; i+=20) { ctx.moveTo(i, 100); ctx.lineTo(i, 350); }
    for(let j = 120; j < 350; j+=20) { ctx.moveTo(100, j); ctx.lineTo(600, j); }
    ctx.stroke();
}

function desenhaGoleiro() {
    //cabeça
    ctx.beginPath();
    ctx.arc(0, -15, 15, 0, Math.PI * 2);
    ctx.fillStyle = "#f39c12";
    ctx.fill();
    ctx.stroke();
    //ombro
    ctx.fillStyle = "#e74c3c"; 
    ctx.fillRect(-goleiro.largura/2, 0, goleiro.largura, goleiro.altura);
    ctx.strokeRect(-goleiro.largura/2, 0, goleiro.largura, goleiro.altura);
    //joelho e pé
    ctx.fillStyle = "#000000"; 
    const largPerna = 30;    
    const altPerna = 100;   
    ctx.fillRect(-goleiro.largura/2, goleiro.altura, largPerna, altPerna);
    ctx.strokeRect(-goleiro.largura/2, goleiro.altura, largPerna, altPerna);
    ctx.fillRect(goleiro.largura/2 - largPerna, goleiro.altura, largPerna, altPerna);
    ctx.strokeRect(goleiro.largura/2 - largPerna, goleiro.altura, largPerna, altPerna);
}

function desenhaBola(tamanho) {
    ctx.beginPath();
    ctx.arc(0, 0, tamanho, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
    //parte da rotacao
    ctx.beginPath();
    for(let i=0; i<4; i++) {
        ctx.rotate(Math.PI / 2);
        ctx.moveTo(0, 0);
        ctx.lineTo(tamanho, 0);
    }
    ctx.stroke();
}

function animar() {
    // 6. RESET da matriz a cada frame
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, W, H);

    desenhaGol();

    // --- LÓGICA E DESENHO DO GOLEIRO ---
    goleiro.x += goleiro.velocidade * goleiro.direcao;
    if (goleiro.x > 570 || goleiro.x < 130) goleiro.direcao *= -1;

    ctx.save();
        ctx.translate(goleiro.x, goleiro.y); // 1. Translação do Goleiro
        desenhaGoleiro();
    ctx.restore();

    // --- ATUALIZAR ESTADO DA BOLA ---
    if (bola.chutando) {
        bola.x += (bola.alvoX - bola.x) * bola.velocidade;
        bola.y += (bola.alvoY - bola.y) * bola.velocidade;
        bola.z -= 0.01; 
        bola.angulo += 0.2;

        if (bola.z <= 0.4) {
            bola.chutando = false;
            
            let defendeu = bola.x > goleiro.x - 40 && 
                           bola.x < goleiro.x + 40 && 
                           bola.y > goleiro.y && 
                           bola.y < goleiro.y + 120;

            if (defendeu) {
                mensagem = "Incrível e horrível cobrança! Só podia ser Love";
            } else if (bola.x > 95 && bola.x < 605 && bola.y > 105 && bola.y < 355) {
                placar++;
                mensagem = "GOOOOOOOOOOOOOOOOL!!";
            } else {
                mensagem = "PRA FORAAAA!";
            }
            setTimeout(resetBola, 1000);
        }
    }


    ctx.save();
        ctx.translate(bola.x, bola.y + 40); 
        ctx.scale(bola.z * 1.5, 0.4);    
        ctx.translate(-bola.x, -(bola.y + 40));
        
        ctx.beginPath();
        ctx.arc(bola.x, bola.y + 40, 25, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fill();
    ctx.restore();

    ctx.save();
        ctx.translate(bola.x, bola.y); 
        ctx.scale(bola.z, bola.z);     
        ctx.rotate(bola.angulo);       
        desenhaBola(40);
    ctx.restore();

    // Placar
    ctx.setTransform(1, 0, 0, 1, 0, 0); 
    ctx.fillStyle = "white";
    ctx.font = "bold 30px Arial";
    ctx.fillText(`Gols: ${placar}`, 100, 50);
    ctx.textAlign = "center";
    ctx.fillText(mensagem, W/2, 80);

    requestAnimationFrame(animar);
}

function resetBola() {
    bola.x = W / 2;
    bola.y = H - 100;
    bola.z = 1.0;
    bola.angulo = 0;
    bola.chutando = false;
}

canvas.addEventListener('mousedown', function(e) {
    if (!bola.chutando) {
        const rect = canvas.getBoundingClientRect();
        bola.alvoX = e.clientX - rect.left;
        bola.alvoY = e.clientY - rect.top;
        bola.chutando = true;
        mensagem = "bateeeeeeeeeu!";
    }
});

document.addEventListener('keydown', function(e) {
    if (!bola.chutando) {
        if (e.key === 'ArrowLeft') bola.x -= 15;
        if (e.key === 'ArrowRight') bola.x += 15;
    }
});

animar();
