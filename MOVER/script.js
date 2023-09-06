const personagem = document.getElementById('personagem');
const tiro = document.getElementById('tiro');
let posicaoHorizontal = 0;
let posicaoVertical = 0;
const step = 10;


function updatePersonagemPosition() {
  personagem.style.left = posicaoHorizontal + 'px';
  personagem.style.top = posicaoVertical + 'px';
}


function atirar() {
  const tiro = document.createElement('div');
  tiro.classList.add('tiro');
  tiro.id="tiro";
  document.body.appendChild(tiro);

  const personagemRect = personagem.getBoundingClientRect();
  tiro.style.left = (personagemRect.left + personagemRect.width / 2) + 'px';
  tiro.style.top = (personagemRect.top + personagemRect.height / 2)-15 + 'px';

  const tiroInterval = setInterval(() => {
    const tiroRect = tiro.getBoundingClientRect();
    if (tiroRect.right < window.innerWidth) {
      tiro.style.left = (parseInt(tiro.style.left) || 0) + 5 + 'px';
      checkCollision2(tiro);

    } else {
      clearInterval(tiroInterval);
      document.body.removeChild(tiro);
    }
  }, 10); 
}

const inimigo = document.getElementById('inimigo');
let inimigoPositionX = window.innerWidth; // Inimigo começa na extremidade direita

// Adicione esta linha para posicionar o inimigo no início do jogo
inimigo.style.left = inimigoPositionX + 'px';

function moverInimigo() {
  inimigo.style.left = inimigoPositionX + 'px';
  inimigoPositionX -= 2; // Movimento para a esquerda

  // Reposicionar o inimigo quando ele sair da tela
  if (inimigoPositionX < -50) {
    inimigoPositionX = window.innerWidth;
    inimigo.style.top = `${Math.random() * (window.innerHeight - 50)}px`; // Posição vertical aleatória
  }
}



setInterval(moverInimigo, 10);

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      posicaoVertical -= step;
      break;
    case 'ArrowDown':
      posicaoVertical += step;
      break;
    case 'ArrowLeft':
      posicaoHorizontal -= step;
      break;
    case 'ArrowRight':
      posicaoHorizontal += step;
      break;
      case 'c':
        atirar();
        break;
    }
    updatePersonagemPosition();
    checkCollision();
});

const character = document.getElementById('character');
const vidaCountElement = document.getElementById('vidaCount');
let vidaCount = 3;

function updateVidaCount() {
  vidaCountElement.textContent = vidaCount;

  if (vidaCount === 6) {
    alert('Você Ganhou! O vilão foi impedido!');
    resetGame(); // Chama a função para reiniciar o jogo
  }

  // Adicione uma verificação para verificar se o jogador perdeu
  if (vidaCount === 0) {
    alert('Você Perdeu! O inimigo destruiu a vila!');
    resetGame(); // Chama a função para reiniciar o jogo
  }
}

function addVida() {
  vidaCount++;
  updateVidaCount();
}

function subtrairVida() {
  vidaCount--;
  updateVidaCount();
}

function resetGame() {
  vidaCount = 3; // Reinicializa o número de vidas
  updateVidaCount();
  
  // Reinicializa a posição do personagem e inimigo
  character.style.left = '0px';
  character.style.top = '0px';

  inimigo.style.left = window.innerWidth + 'px';
  inimigo.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
}


  function checkCollision() {
    const personagemRect = personagem.getBoundingClientRect();
    const inimigoRect = inimigo.getBoundingClientRect();
    tropecoRect=inimigoRect;

  if (
      personagemRect.left < tropecoRect.right-30 &&
      personagemRect.right > tropecoRect.left-30 &&
      personagemRect.top < tropecoRect.bottom-30 &&
      personagemRect.bottom > tropecoRect.top-30
      )
      {
        alert('Colisão detectada!');
      subtrairVida();
    }
  }

  function checkCollision2(tiro) {
    const tiroRect = tiro.getBoundingClientRect();
    const inimigoRect = inimigo.getBoundingClientRect();
    tropecoRect = inimigoRect;
  
    if (
      tiroRect.left < tropecoRect.right - 30 &&
      tiroRect.right > tropecoRect.left - 30 &&
      tiroRect.top < tropecoRect.bottom - 30 &&
      tiroRect.bottom > tropecoRect.top - 30
    ) {
      addVida();
      document.body.removeChild(tiro);
      
      // Remova o inimigo e aguarde um curto período para reaparecer
      document.body.removeChild(inimigo);
      setTimeout(() => {
        inimigo.style.left = window.innerWidth + 'px';
        inimigo.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
        document.body.appendChild(inimigo);
      }, 1000); // O tempo de espera é em milissegundos (aqui, 1000ms = 1 segundo)
    }
  }