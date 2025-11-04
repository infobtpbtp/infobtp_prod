
const public_reportage_list = document.querySelector('.public_reportage_list');
const publicReportageSlideactive = document.querySelector('.publicReportageSlideactive');
const deuxArticleGauche = document.querySelector('.deuxArticleGauche');

//const API_URL = process.env.API_URL;


function deuxPremieresPhrases(texte) {
    // Utilisation d'une expression régulière pour identifier les phrases
    const regex = /^.*?[.!?](\s|$)/;
    
    // Correspondance avec l'expression régulière
    const match = texte.match(regex);
    
    // Si une correspondance est trouvée, renvoyer la première phrase
    if (match) {
        return match[0];
    } else {
        // Si aucune correspondance n'est trouvée, renvoyer le texte original
        return texte;
    }
}

function getArticle () {
    fetch(`https://infobtp-website-indol.vercel.app/foncier`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const articlesTriés = data.sort((a, b) => new Date(b.datePublication) - new Date(a.datePublication));

        let articleHtml = '';
        let articleSlideActive = '';
        let deuxArticleDroit = '';

        // Les deux plus grand articles à la une apres 
        const articlesALaUne = articlesTriés.slice(1, 3);
        // Le plus grand article a la une
        const articleALaUne = articlesTriés.slice(0, 1);

        articleALaUne.forEach(element => {
            articleSlideActive += 
        `
        <div class="single-slider ">
            <div class="trending-top mb-30 article-item" data-article-id="${element._id}">
                <div class="trend-top-img">
                    <img src="${element.titres.imageGrandTitre}" alt="">
                    <div class="trend-top-cap">
                        <!-- <span class="bgr" data-animation="fadeInUp" data-delay=".2s" data-duration="1000ms">Business</span> -->
                        <h2><a data-animation="fadeInUp" data-delay=".4s" data-duration="1000ms"> ${element.titres.grandTitre}</a></h2>
                        <p data-animation="fadeInUp" data-delay=".6s" data-duration="1000ms">Publié par ${element.auteur}   -   ${element.datePublication}</p>
                    </div>
                </div>
            </div>
        </div>

        `;
        });

        articlesALaUne.forEach(element => {
            deuxArticleDroit += 
        `
        <div class="col-lg-12 col-md-6 col-sm-6">
            <div class="trending-top mb-30 article-item " data-article-id="${element._id}">
                <div class="trend-top-img">
                    <img src="${element.titres.imageGrandTitre}" alt="">
                    <div class="trend-top-cap trend-top-cap2">
                        <!-- <span class="bgg">TECH </span> -->
                        <h2><a>"Immobilier Vert : Les Avantages des Bâtiments Écologiques</a></h2>
                        <p>par ${element.auteur}    -   ${element.datePublication}</p>
                    </div>
                </div>
            </div>
        </div>

        `
        });
        
        publicReportageSlideactive.innerHTML  = articleSlideActive
        deuxArticleGauche.innerHTML  = deuxArticleDroit

        

        data.forEach(element => {
             articleHtml += 
        `
        <div class=" col-xl-6 col-lg-6 col-md-6">
        <div class=" whats-news-single mb-40 mb-40 article-item" data-article-id="${element._id}">
            <div class="whates-img">
                <img src="${element.titres.imageGrandTitre}" alt="">
            </div>
            <div class="whates-caption whates-caption2">
                <h4><a > ${element.titres.grandTitre}</a></h4>
                <span>par ${element.auteur}   -   ${convertionDate(element.datePublication)} </span>
                <p> ${deuxPremieresPhrases(element.titres.contenuGrandTitre)}</p>
            </div>
        </div>
    </div>
        `
        public_reportage_list.innerHTML = articleHtml;
        });

        const articleItem = document.querySelectorAll('.article-item');
        articleItem.forEach(item => {
            item.addEventListener('click', () => {
                const articleId = item.getAttribute('data-article-id');
                window.location.href = `article_foncier.html?id=${articleId}`;
            })
            
        });
        
    })
    .catch(error => console.error('Error lors de la recuperation'));

}

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


getArticle();