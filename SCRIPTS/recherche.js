const recherche_list = document.querySelector('.recherche_list');
const API_URL = process.env.API_URL;
document.addEventListener('DOMContentLoaded', function(e) {

    const urlParams = new URLSearchParams(window.location.search);
    const searchText = urlParams.get('q');
    console.log(searchText);

    fetch(`${API_URL}/recherche/${encodeURIComponent(searchText)}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let rechercheItemHtml = '';
            data.forEach(element => {
                rechercheItemHtml += 
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
                    recherche_list.innerHTML = rechercheItemHtml;
                    });
            
                    const articleItem = document.querySelectorAll('.article-item');
                    articleItem.forEach(item => {
                        item.addEventListener('click', () => {
                            const articleId = item.getAttribute('data-article-id');
                            window.location.href = `latest_recherche.html?id=${articleId}`;
                        })
                        
                    });

             })
})



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