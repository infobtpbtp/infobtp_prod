document.addEventListener("DOMContentLoaded", function() {
    let surveysPage = document.querySelector('.surveysPage');
    const urlParams = new URLSearchParams(window.location.search);
    const surveyId = urlParams.get('surveyId');
    //const API_URL = process.env.API_URL;
    console.log("test")
    fetch(`https://infobtp-website-indol.vercel.app/sondages/${surveyId}`)
        .then(reponse => reponse.json())
        .then(data => {
            console.log(data)
            console.log("test")
            surveysPage.innerHTML = 
            `
                <div class="laquestionMain" data-v-9cf8a142="">
                    <div class="formbold-form-wrapper">
                        <form action="https://ormbold.com/s/FORM_ID" method="POST">
                        
                            <div class="formbold-mb-5">
                                <label for="qusOne" class="formbold-form-label">
                                    ${data.question}
                                </label>
                        
                                <div class="formbold-radio-flex">
                                
                                </div>
                            </div>
                    
                        </form>
                    </div>
                </div>
            `

            let formboldRadioFlex = surveysPage.querySelector('.formbold-radio-flex');

            let radioButtonsHtml = data.options.map((element, index) => {
                return `
                    <div class="formbold-radio-group">
                        <label class="formbold-radio-label">
                            <input
                                class="formbold-input-radio"
                                type="radio"
                                name="qusOne"
                                data-option-id="${element._id}"
                                id="qusOne-${index}"
                                value="${element.text}"
                            />
                            ${element.text}
                            <span class="formbold-radio-checkmark"></span>
                        </label>
                    </div>
                `;
            }).join('');

            formboldRadioFlex.innerHTML = radioButtonsHtml;
        
            document.querySelector('.formbold-form-wrapper').addEventListener('change', function(event) {
                if (event.target.classList.contains('formbold-input-radio')) {
                    const optionId = event.target.getAttribute('data-option-id');
                    const survey_Id = surveyId /* Votre logique pour obtenir l'ID du sondage */;
                    updateVote(survey_Id, optionId);
                }
            });

        })
        .catch(error = console.error())



})


function updateVote(surveyId, optionId) {
    fetch(`https://infobtp-website-indol.vercel.app/sondages/${surveyId}/${optionId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log("Vote mis à jour", data);
        displayResults(data); // Affiche les résultats
    })
    .catch(error => {
        console.error('Erreur lors de la mise à jour du vote:', error);
    });
}

function displayResults(data) {
    const surveysPage = document.querySelector('.surveysPage');
    surveysPage.innerHTML = ''; // Effacer le contenu actuel

    // Supposons que data contient un tableau d'options avec les votes
    data.options.forEach(option => {
        let percentage = (option.votes / data.totalVotes) * 100;
        percentage = Math.round(percentage)
        surveysPage.innerHTML += `
            <div class="result-bar">
                <div class="result-label">${option.text}</div>
                <div class="votesetpourcentage">
					<div class="result-percentage-bar" style="width: ${percentage}%"> </div> <span class="lepourcentage"> ${percentage}% </span>
				</div>
                <div class="result-label">${option.votes}</div>
            </div>
        `;
    });
}


