document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission de formulaire standard

    if (
        document.getElementById('name').value.length < 2 ||
        document.getElementById('email').value.length < 10 ||
        document.getElementById('subject').value.length < 4 ||
        document.getElementById('message').value.length <  30
    ) {
        console.log('Renseignez correctement tous les champs')
        return ;
    }
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    //const API_URL = process.env.API_URL;

    fetch(`https://infobtp-website-indol.vercel.app/contact`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Traitez ici la réponse du serveur, par exemple affichez un message de succès
        showAlert();
        // renitialiser le formulaire
        document.getElementById('contactForm').reset();
    })
    .catch(error => console.error('Erreur:', error));
});

function showAlert() {
    const alertBox = document.getElementById('alertBox');
    alertBox.classList.remove('hidden');

    // Cachez l'alerte après 3 secondes
    setTimeout(() => {
        alertBox.classList.add('hidden');
    }, 3000);
}