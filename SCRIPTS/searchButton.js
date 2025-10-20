document.querySelector('.searchInput').addEventListener('keydown', function(e) {
    e.preventDefault();
    console.log('test1')
    if(e.key === 'Enter') {
        console.log('test2')
        var query = this.value;
       window.location.href = `recherche.html?q=${query}`;
    }
});


// function performSearch(query) {
//     fetch('/search?q=' + encodeURIComponent(query))
//         .then(response => response.json())
//         .then(data => {
//             displaySearchResults(data);
//         })
//         .catch(error => console.error('Erreur lors de la recherche:', error));
// }


