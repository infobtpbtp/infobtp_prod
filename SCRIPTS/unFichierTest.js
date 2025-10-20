const principalVideo = document.querySelector('.principalVideo');
const video_grid = document.querySelector('.video_grid');
const principalideo = document.querySelector('.principalVideo');


// function playVideo(videoId) {
//     let video = document.getElementById(videoId);
//     if (video.paused) {
//         video.play();
//     } else {
//         video.pause();
//     }
// }

function getInterwiews () {

    
fetch(`https://infobtpbackend.vercel.app/videosJournalistique`)
.then(response => response.json())
.then(data => {
    //utilisation des données recuperées dépuis la base de donnée
    console.log(data)
    let videos_gris_items = '';
    let isFirstTime = true;
    let lastVideoAdd = data[data.length - 1];

    
        principalVideo.innerHTML += 
        `
            <div class="featured-video">
                <div class="video-wrapper" onclick="playVideo('featuredVideo')">
                    <iframe src="${lastVideoAdd.videoUrl}" allowfullscreen title="Dailymotion Video Player" ></iframe>
                    
                </div>
                <div class="video-info">
                    <h2 class="categoryVideoVedette">${lastVideoAdd.category}</h2>
                    <h3>${lastVideoAdd.title}</h3>
                    <p>Présentateur: ${lastVideoAdd.presenter}</p>
                    <p>Date de publication: ${convertionDate(lastVideoAdd.datePublication)}}</p>
                </div>
            </div>
        `


    data.forEach(item => {
        videos_gris_items += 
        `
            <div class="video-item " interviewTitle = ${item.title} interviewCategory = ${item.category} interviewDate = ${item.publicationDate} interviewPresenter = ${item.presenter} interviewVideoUrl = ${item.videoUrl}>
                <div class="video-wrapper">
                    <img src="http://localhost:5500/images/imagesDivers/juu.jpeg1703073882997.jpg" alt="Miniature de la vidéo">
                    <div class="play-icon">&#9658;</div> <!-- Icône de lecture -->
                </div>
                <div class="video-info">
                    <h2 class="miniature_h2">${item.category}</h2>
                    <h3>${item.title}</h3>
                    <p>Présentateur: ${item.presenter}</p>
                    <p>Date de publication: ${convertionDate(item.datePublication)}}</p>
                </div>
            </div>
        `
        video_grid.innerHTML = videos_gris_items;

    });

    const allVideoItems = document.querySelectorAll('.video-item');
    console.log(allVideoItems)
    allVideoItems.forEach(item => {
        item.addEventListener('click',() =>{
            //reciperation attribut ajoutes aux class video-item
            const interviewTitle = item.getAttribute('interviewTitle');
            const interviewPresenter = item.getAttribute('interviewPresenter');
            const interviewDate = item.getAttribute('interviewDate');
            const interviewCategory = item.getAttribute('interviewCategory');
            const interviewVideoUrl = item.getAttribute('interviewVideoUrl');
            principalVideo.innerHTML = 
        `
            <div class="featured-video">
                <div class="video-wrapper" onclick="playVideo('featuredVideo')">
                    <iframe src="${interviewVideoUrl}" allowfullscreen title="Dailymotion Video Player" ></iframe>
                    
                </div>
                <div class="video-info">
                    <h2 class="categoryVideoVedette">${interviewCategory}</h2>
                    <h3>${interviewTitle}</h3>
                    <p>Présentateur: ${interviewPresenter}</p>
                    <p>Date de publication: ${interviewDate}</p>
                </div>
            </div>
        `

        window.scrollTo(0, 300);
        })
        
    });

})
.catch(error => console.error("Erreur lors de la recuperation des données de l'interview"));

}

getInterwiews();