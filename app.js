let movies = [{
    watched: false,
    name: 'film1',
    year: '1999',
    country: 'zemlja1',
    note: 'hffdgvbd dfgdfg dfdvdfv',
    actors: ['glumac1', 'glumac2']
}, {
    watched: false, name: 'film2', year: '1996', country: 'zemlja2', note: 'fsdf', actors: ['glumac1']
}, {
    watched: false, name: 'film3', year: '2011', country: 'zemlja3', note: ' dfdfdf fgdg sdfd', actors: ['glumac1']
}]

// getRows();

document.getElementById('search_form').addEventListener('submit', (e) => {
    e.preventDefault();
    filterMovies();
});

let addMovieButton = document.getElementById('addMovie_button');
let addMovieForm = document.getElementById('addMovieForm');

function fillGodine() {
    let year = document.getElementById('movie_year')
    for (let i = 1895; i <= 2022; i++) {
        year.innerHTML += `<option>${i}</option>`
    }
}

function addMovieInput() {
    let name = document.getElementById('movie_name').value;
    let year = document.getElementById('movie_year').value;
    let country = document.getElementById('movie_country').value;
    let note = document.getElementById('movie_note').value;
    let actorsList = document.getElementById('movie_actors').value;
    let actors = actorsList.split(',')

    let film = {
        watched: false, name: name, year: year, country: country, note: note, actors: actors
    }
    addMovie(film);

}

function checkMovieInput() {
    let rez = true
    let movieYfeedback = document.getElementById('movie_yearFeedback')
    let name = document.getElementById('movie_name')
    let year = document.getElementById('movie_year')
    if (name.value == '') {
        name.classList.add('is-invalid')
        rez = false
    } else {
        name.classList.remove('is-invalid')
    }
    if (year.value > 2022 || year.value < 1895) {
        year.classList.add('is-invalid')
        movieYfeedback.removeAttribute('style')
        rez = false
    } else {
        year.classList.remove('is-invalid')
        movieYfeedback.setAttribute('style', 'display: none')
    }
    console.log(rez)
    if (rez) {
        addMovieInput();
    }
}

function addMovie(movie) {
    movies.push(movie);
    let tableContent = ''
    let actorsContent = ''
    movie.actors.forEach((actor) => {
        actorsContent += `<li>${actor}</li>`
    })
    tableContent = `<tr class="table-danger text-center">
                        <td>
                            <input class='form-check-input' type="checkbox" onclick="getSelected(this)">  
                            <input type='hidden' value=${movie.watched}>
                        </td>
                        <td>${movie.name}</td>
                        <td>${movie.year}</td>
                        <td>${movie.country}</td>
                        <td>${movie.note}</td>
                        <td><ul>${actorsContent}</ul></td>
                    </tr>`;
    document.getElementById('movies_table_body').innerHTML += tableContent;
    addMovieForm.reset();
}

function getSelected(val) {
    let row = val.parentNode.parentNode;
    console.log(val)
    if (val.checked) {
        val.setAttribute('checked', '')
        row.classList.remove('table-danger')
        row.classList.add('table-success')
    } else {
        val.removeAttribute('checked')
        row.classList.remove('table-success')
        row.classList.add('table-danger')
    }
}

addMovieButton.addEventListener('click', (elem) => {
    checkMovieInput();
});

function filterMovies() {
    let term = document.getElementById('term_input').value.toLowerCase();
    let searchRes = []
    movies.forEach((movie) => {
        if (movie.name.toLowerCase().includes(term) || movie.year.includes(term) || movie.country.toLowerCase().includes(term)) {

            searchRes.push(movie);
        }
    });
    movies = searchRes;
    displayMovies();
}

// function getRows() {
//     //Reference the Table.
//     var grid = document.getElementById("movies_table_body");
//
//     //Reference the CheckBoxes in Table.
//     var rows = grid.getElementsByTagName("tr");
//     console.log(rows)
//     console.log(rows[2])
//     console.log(rows.length)
//     for (let item of rows) {
//         console.log(item)
//     }


function displayMovies() {
    let tableContent = '';
    movies.forEach((movie) => {
        let actorsContent = ''
        movie.actors.forEach((actor) => {
            actorsContent += `<li>${actor}</li>`
        })
        tableContent += `<tr class="table-danger text-center">
                            <td>
                                <input class='form-check-input' type="checkbox" onclick="getSelected(this)">
                                <input type='hidden' value=${movie.watched}>
                            </td>
                            <td>${movie.name}</td>
                            <td>${movie.year}</td>
                            <td>${movie.country}</td>
                            <td>${movie.note}</td>
                            <td><ul>${actorsContent}</ul></td>
                         </tr>`;
    });
    document.getElementById('movies_table_body').innerHTML = tableContent;
}


fillGodine();
displayMovies();
