

const newsmain = document.querySelector('.newsmain');
const formNewsLetter = document.querySelector('.formNewsLetter');
//const API_URL = process.env.API_URL;



formNewsLetter.innerHTML = 
`
    <form id="newsletterForm">
        <div class="custremailform" >
            <div class="newsinpSec">
                <input class="emailinp" id="abonnemenrEmail" name="email" type="email" placeholder="exemplevotreadresse@mail.com"><!---->
            </div>
            <div class="errorMesage">
            
            </div>
            <div class="newsinpSec">
                <input type="submit"  value="JE M'ABONNE">
            </div>
        </div>
    </form>
`

const errorMesage = formNewsLetter.querySelector('.errorMesage');
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();

    var email = document.getElementById('abonnemenrEmail').value;

    fetch(`https://infobtpbackend.vercel.app/abonnement`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => {
        if (response.ok) { // Si la requête a réussi
            return response.json();
        } else {
            throw new Error('Une erreur s\'est produite lors de l\'abonnement');
        }
    })
    .then(data => {
        if (data && data.message) {
            formNewsLetter.innerHTML = `<p style="color: blue; font-size: 20px; style="color: aqua; font-style: italic">${data.message}</p>`;

        }
    })
    .catch((error) => {
        // Gérer l'erreur ici
        errorMesage.innerHTML += `<p style="color: blue; font-size: 20px; font-style: italic;">Ce mail est déjà Abonné.</p>`;
        // Réinitialiser le formulaire
      

        // Faire disparaître le message d'erreur après 5 secondes (5000 millisecondes)
        setTimeout(() => {
            
            if (errorMesage) {
                errorMesage.style.display = 'none';
            }
        }, 3000);
        });
        errorMesage.style.display = 'block';
        errorMesage.innerHTML = '';
});
