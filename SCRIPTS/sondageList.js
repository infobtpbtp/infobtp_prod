

const sondagepaticipe = document.querySelector('.sondagepaticipe');
//const API_URL = process.env.API_URL;

fetch(`https://infobtp-website-indol.vercel.app/sondages`)
    .then(response =>  response.json())
    .then(data => {
        console.log(data)

        data.forEach(element => {
            
            sondagepaticipe.innerHTML +=
             `
                <div class="about-details section-padding30">
                <div class="surveysPage">
                    <div class="laquestionMain" data-v-9cf8a142=""  >
                        <a href="#" class="" data-v-9cf8a142=""><h3 data-v-9cf8a142="" ><span data-v-9cf8a142="">${element.question} </span></h3></a>
                        <div class="dateBtnVotes">
                            <div class="laquestionLft" data-v-9cf8a142=""><p class="survey_date" data-v-9cf8a142="">Publié LE : ${convertionDate(element.publishedDate)} </p></div>
                            <div class="laquestionR btnPaticipeSurvey" data-v-9cf8a142="" surveyId="${element._id}">
                                <a  class="survey_trigger" data-v-9cf8a142="" >Participer</a><!---->
                            </div>
                            <div class="nombredevote">
                                <span data-v-9cf8a142="" style="color: #fff;"> ${element.totalVotes} votes</span>
                            </div>
                         </div>
                        
                    </div>
                </div>
                </div>
            `
        });

        const btnPaticipeSurvey = document.querySelectorAll('.btnPaticipeSurvey');
        btnPaticipeSurvey.forEach(element => {
            element.addEventListener('click', () => {
                const surveyId = element.getAttribute('surveyId');
                window.location.href = `survey.html?surveyId=${surveyId}`;
            })
        });
    })
    .catch((error) => console.error());



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