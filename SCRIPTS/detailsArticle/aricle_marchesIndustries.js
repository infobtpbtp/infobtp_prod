document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    //const API_URL = process.env.API_URL;
    function convertionDate (dateString) {
        let date = new Date(dateString);
    
        // Formatter la date en "27 décembre 2023"
        let formattedDate = date.toLocaleDateString('fr-FR', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
    
        return formattedDate;
    }

    console.log(articleId)
    if (articleId) {
        fetch(`https://infobtpbackend.vercel.app/marchesIndustries/${articleId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //Manipulation des details de l'article
            const articleDetails = document.querySelector('.articleDetails');
            const titredetails = document.querySelector('.titredetails');
            titredetails.innerHTML = 
            `
                <div class="heading-news mb-30 pt-30" style="max-width: 800px; margin: 0 auto;">
                    <h3 style="text-align: center; word-wrap: break-word;">
                        ${data.titres.grandTitre}
                    </h3>
                    <p style="text-align: center;">
                        Publié le : ${convertionDate(data.datePublication)} par ${data.auteur}
                    </p>
                </div>

            `
            let articleDetailsItems = 
                `
                <div class="about-right mb-90">
                <div class="about-img">
                    <img src="${data.titres.imageGrandTitre}" alt="">
                </div>
                
                <div class="about-prea">
                    
                    <p class="about-pera1 mb-25" style="font-size: 18px; text-align: justify;">
                        ${data.titres.contenuGrandTitre}
                    </p>
                </div> 
                <div class="section-tittle mb-30 pt-30">
                    <h3>${data.titres.sousTitres[0].sousTitre} </h3>
                </div>
                <div class="about-img">
                    ${data.titres.imageSecondaire1 ? `<img src="${data.titres.imageSecondaire1}" alt="Image secondaire 1">` : ''}
                </div>
                <div class="about-prea">
                    <p class="about-pera1 mb-25" style="font-size: 18px; text-align: justify;">
                    ${data.titres.sousTitres[0].contenuSousTitre} 
                    </p>
                </div>
                <div style="margin: auto; background-color: #d9d8ce; border-radius: 5px; width:350px; padding: 10px; position: relative;">
                    <div style="position: absolute; top: -10px; text-align: center; border-radius: 5px; left: 10px; background-color: #ff0000; color: white; padding: 5px 10px; font-weight: bold; font-size: 14px;">
                        Lire aussi
                    </div>
                    <a href="${data.externalLink}" style="text-decoration: none; color: #333; font-size: 18px; font-weight: bold; display: block; margin-top: 15px;  padding: 5px 10px; ">
                        <p style="text-align: center;">
                            ${data.externalLinkTitle}
                        </p>
                    </a>
                    
                </div>
                <div class="section-tittle mb-30 pt-30">
                    <h3>${data.titres.sousTitres[1].sousTitre} </h3>
                </div>
                <div class="about-img">
                    ${data.titres.imageSecondaire2 ? `<img src="${data.titres.imageSecondaire2}" alt="Image secondaire 2">` : ''}
                </div>
                <div class="about-prea">

                    <p class="about-pera1 mb-25" style="font-size: 18px; text-align: justify;">
                    ${data.titres.sousTitres[1].contenuSousTitre}

                        </p>
                </div>
                <div class="social-share pt-30">
                    <div class="section-tittle">
                        <h3 class="mr-20">Share:</h3>
                        <ul>
                            <li><a href="#"><img src="assets/img/news/icon-ins.png" alt=""></a></li>
                            <li><a href="#"><img src="assets/img/news/icon-fb.png" alt=""></a></li>
                            <li><a href="#"><img src="assets/img/news/icon-tw.png" alt=""></a></li>
                            <li><a href="#"><img src="assets/img/news/icon-yo.png" alt=""></a></li>
                        </ul>
                    </div>
                </div>
            </div>

                `;
          
            articleDetails.innerHTML = articleDetailsItems;
        })
        .catch(error => console.error("Erreur lors de la recuperation des détails de l'article"));
    } else {
        console.error(" ID de l'article non fornit");
    }
})