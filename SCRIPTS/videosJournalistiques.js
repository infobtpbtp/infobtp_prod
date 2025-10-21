// Fonction pour récupérer toutes les vidéos
async function fetchVideos() {
    try {
        const response = await fetch('https://infobtp-website-indol.vercel.app/videosjournalistiques');
        const videos = await response.json();
        console.log(videos);
        return videos.sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
    } catch (error) {
        console.error('Erreur lors de la récupération des vidéos:', error);
        return [];
    }
}

// Fonction pour afficher la vidéo principale
function displayMainVideo(video) {
    document.getElementById('mainVideoContainer').innerHTML = `
        <iframe width="100%" height="500" src="${video.videoUrl}" frameborder="0" allow="autoplay; picture-in-picture" allowfullscreen></iframe>
    `;
    document.getElementById('mainVideoTitle').textContent = video.title;
    document.getElementById('mainVideoDescription').textContent = video.presenter;
    document.getElementById('mainVideoDate').textContent = `Date de publication: ${new Date(video.publicationDate).toLocaleDateString()}`;
    
    // Mise à jour du bouton "Lire la vidéo"
    const mainVideoLink = document.getElementById('mainVideoLink');
    mainVideoLink.href = video.videoUrl;
    mainVideoLink.onclick = function(e) {
        e.preventDefault();
        playMainVideo();
    };
}

// Fonction pour jouer la vidéo principale
function playMainVideo() {
    const iframe = document.querySelector('#mainVideoContainer iframe');
    if (iframe) {
        const src = iframe.src;
        iframe.src = src + '?autoplay=1';
    }
}

// Fonction pour afficher les autres vidéos
function displayOtherVideos(videos) {
    const otherVideosContainer = document.getElementById('otherVideos');
    otherVideosContainer.innerHTML = '';
    
    videos.slice(1).forEach((video, index) => {
        const videoElement = document.createElement('div');
        videoElement.className = 'col-md-4 mb-3';
        videoElement.innerHTML = `
            <div class="video-container">
                <iframe width="100%" height="500" src="${video.videoUrl}" frameborder="0" picture-in-picture" allowfullscreen></iframe>
            </div>
            <h4>${video.title}</h4>
        `;
        videoElement.addEventListener('click', () => {
            // Déplacer la vidéo cliquée en haut
            const clickedVideo = videos.splice(index + 1, 1)[0];
            videos.unshift(clickedVideo);
            
            // Mettre à jour l'affichage
            displayMainVideo(clickedVideo);
            displayOtherVideos(videos);
            
            window.scrollTo(0, 0);
        });
        otherVideosContainer.appendChild(videoElement);
    });
}

// Fonction principale pour initialiser la page
async function initPage() {
    const videos = await fetchVideos();
    if (videos.length > 0) {
        displayMainVideo(videos[0]);
        displayOtherVideos(videos);
    }
}

// Appeler la fonction d'initialisation au chargement de la page
window.addEventListener('load', initPage);