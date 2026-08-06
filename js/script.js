document.addEventListener("DOMContentLoaded", () => {
    fetch('database/data.json')
        .then(response => response.json())
        .then(data => {
            // Preenchendo dados principais
            document.getElementById('envelopeTitulo').innerText = `Homenagem para ${data.nomePai}`;
            document.getElementById('nomePai').innerText = data.nomePai;
            document.getElementById('subtitulo').innerText = data.subtitulo;
            document.getElementById('mensagemPrincipal').innerText = data.mensagemPrincipal;
            
           

            // Vídeo de fundo
            const videoSource = document.querySelector('#videoFundo source');
            videoSource.src = data.videoFundo;
            document.getElementById('videoFundo').load();

            // Preenchendo Música de Fundo
            const audio = document.getElementById('audioFundo');
            if (data.musicaFundo) {
                audio.src = data.musicaFundo;
                audio.load();
            }

           // Galeria de Fotos
            const galeriaContainer = document.getElementById('galeriaContainer');
            data.galeria.forEach(url => {
                const img = document.createElement('img');
                img.src = url;
                img.classList.add('slider-item');
                
                // Torna a imagem clicável para abrir o modal
                img.onclick = () => abrirModal(url);

                galeriaContainer.appendChild(img);
            });

            // Mural de Recados
            const recadosContainer = document.getElementById('recadosContainer');
            data.recados.forEach(recado => {
                const div = document.createElement('div');
                div.classList.add('recado-card');
                div.innerHTML = `
                    <h4>${recado.autor}</h4>
                    <p>"${recado.texto}"</p>
                `;
                recadosContainer.appendChild(div);
            });
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
});


// Função para abrir a carta interativa
function abrirCarta() {
    const envelopeScreen = document.getElementById('envelopeScreen');
    const mainContent = document.getElementById('mainContent');

    // TENTA TOCA A MÚSICA AUTOMATICAMENTE AO ABRIR A CARTA
    const audio = document.getElementById('audioFundo');
    const playIcon = document.getElementById('playIcon');
    const musicStatus = document.getElementById('musicStatus');
    const playerCard = document.querySelector('.music-player-card');

    if (audio) {
        audio.play().then(() => {
            // Se o navegador permitiu, atualiza o ícone do player para "Tocando"
            if (playIcon) playIcon.classList.remove('fa-play');
            if (playIcon) playIcon.classList.add('fa-pause');
            if (musicStatus) musicStatus.innerText = "Tocando agora...";
            if (playerCard) playerCard.classList.add('playing');
        }).catch(error => {
            console.log("Autoplay bloqueado ou sem arquivo de áudio:", error);
        });
    }

    // Faz a carta sumir com animação
    envelopeScreen.classList.add('fade-out');

    // Mostra o conteúdo principal e aplica a animação de entrada
    setTimeout(() => {
        envelopeScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
        setTimeout(() => {
            mainContent.classList.add('show');
        }, 50);
    }, 500);
}


// Função para mover o slider através dos botões
function moverSlider(direcao) {
    const track = document.getElementById('galeriaContainer');
    const larguraItem = track.querySelector('.slider-item').clientWidth + 12; // largura + gap
    track.scrollBy({
        left: direcao * larguraItem,
        behavior: 'smooth'
    });
}


// Funções para controlar o Modal de Fotos
function abrirModal(url) {
    const modal = document.getElementById('fotoModal');
    const modalImg = document.getElementById('imgModal');
    modal.style.display = 'flex';
    modalImg.src = url;
}

function fecharModal() {
    const modal = document.getElementById('fotoModal');
    modal.style.display = 'none';
}


// Função para controlar o player de música
function toggleMusica() {
    const audio = document.getElementById('audioFundo');
    const playIcon = document.getElementById('playIcon');
    const musicStatus = document.getElementById('musicStatus');
    const playerCard = document.querySelector('.music-player-card');

    if (audio.paused) {
        audio.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        musicStatus.innerText = "Tocando agora...";
        playerCard.classList.add('playing');
    } else {
        audio.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        musicStatus.innerText = "Pausado";
        playerCard.classList.remove('playing');
    }
}
