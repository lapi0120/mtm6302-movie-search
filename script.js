const $form = $('#form')
const $search = $('#search')
const $results = $('#results')

$form.on('submit', function (event){
    event.preventDefault()

    $.ajax({
        url:`http://www.omdbapi.com/?apikey=1c482164&s=${$search.val()}&type=movie`,
        method: 'GET',
        dataType: 'json'
    }).done(function (json) {
        console.log(json)
        
        if(json.Response ==='True'){
            const results = []

        for (const movie of json.Search){
            results.push (`
            <div class="card">
                 <div class="card-image">
                    <img class="card-img-top" src="${movie.Poster}" alt="${movie.Title}">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${movie.Title} (${movie.Year})</h5>
                    <a href="https://www.imdb.com/title/${movie.imbdID}" target="_blank">Go to IMDb</a>
                </div>
            </div>
        `)
        }
        $results.html(results.join(''))
        }else {
            // no response
            $results.html('<em>No results</em>')
        }
    }).fail(function (error) {
        console.log(error)
    })
})
