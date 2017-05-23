//Muestra a todos los artistas con más de 10 scrobbles.

function showArtists() {
    var results = {};

    for (var i = 0; i < json.length; i++) {
        if (results[json[i].artist]) {
            results[json[i].artist]++;
        } else {
            results[json[i].artist] = 1;
        }
    }

    var keys = Object.keys(results).sort(function(a, b) { return results[b] - results[a]; });
    var text = "";
    for (i = 0; i < keys.length; i++) {
        if (results[keys[i]] >= 10) {
            text += ('<a href="" onclick="sendToArtistInput(event)">' + keys[i] + '</a>' + " - " + results[keys[i]] + '<br>')
        }
    }

    document.getElementById('result').innerHTML = text;

}

//Si buscás una canción, te devuelve cuántas veces y cuando la escuchaste.

function filterBySong() {
    var quantity = 0;
    var date_listened;
    var song = document.getElementsByName('song-input')[0].value;
    var artist = document.getElementsByName('artist-input')[0].value;
    var final_result = "";

    for (var i = 0; i < json.length; i++) {
        if (json[i].song.toLowerCase() == song.toLowerCase() &&
            json[i].artist.toLowerCase() == artist.toLowerCase()) {
            date_listened = json[i].day + "/" + json[i].month + "/" + json[i].year + " " + json[i].time + '<br>';
            final_result += date_listened;
            quantity++;
        }
    }

    var cabecera = "La canción buscada es " + song + " de " + artist + " y la escuché " + quantity + " veces <br>"

    if (quantity > 0) {
        document.getElementById('result').innerHTML = (cabecera + final_result);
    } else {
        document.getElementById('result').innerHTML = 'No hay resultados';
    }
}

//Muestra todas las canciones de un artista (El el input) a y la cantidad de scrobbles de cada una

function findArtistSongs() {

    var artist = document.getElementsByName('artist-input')[0].value;
    var results = {};
    var quantity = 0;
    var key;

    for (var i = 0; i < json.length; i++) {
        if (json[i].artist.toLowerCase() == artist.toLowerCase()) {
            key = json[i].artist + '-' + json[i].song;
            if (results[key]) {
                results[key] = results[key] + 1;
            } else {
                results[key] = 1;
            }
            quantity++;
        }
    }

    var text = "El artista buscado es " + artist + " lo escuché " + quantity + " veces <br><ul>";
    var keys = Object.keys(results).sort(function(a, b) { return results[b] - results[a] })
    var newline;

    for (i = 0; i < keys.length - 1; i++) {
        text += ('<li><a href="" onclick="sendToArtistInput(event)">' + keys[i].split('-')[0] + '</a> - <a href="" onclick="sendToSongInput(event)">' + keys[i].split('-')[1] + '</a> - ' + results[keys[i]] + '</li>')
    }

    if (quantity > 0) {
        document.getElementById('result').innerHTML = text + '</ul>';
    } else {
        document.getElementById('result').innerHTML = 'No hay resultados';
    }
}

//Muestra los 100 cds más escuchados

function mostListenedAlbums() {
    var results = {};
    var key;
    for (var i = 0; i < json.length; i++) {
        key = json[i].artist + '-' + json[i].album;
        if (results[key]) {
            results[key]++;
        } else {
            results[key] = 1;
        }
    }

    var keys = Object.keys(results).sort(function(a, b) { return results[b] - results[a] });
    var text = "<ul>";
    for (i = 0; i < 100; i++) {
        if (keys[i]) {
            text += ('<li><a href="" onclick="sendToArtistInput(event)">' + keys[i].split('-')[0] + '</a> - <a href="" onclick="sendToAlbumInput(event)">' + keys[i].split('-')[1] + '</a> - ' + results[keys[i]] + '</li>')
        }
    }

    document.getElementById('result').innerHTML = text + '</ul>';

}

//Muestra las 250 canciones maś escuchadas


function mostListenedSongs() {
    var results = {};
    var key;
    for (var i = 0; i < json.length; i++) {
        key = json[i].artist + '-' + json[i].song;
        if (results[key]) {
            results[key]++;
        } else {
            results[key] = 1;
        }
    }

    var keys = Object.keys(results).sort(function(a, b) { return results[b] - results[a]; });
    var text = "<ul>";
    for (i = 0; i < 100; i++) {
        if (keys[i]) {
            text += ('<li><a href="" onclick="sendToArtistInput(event)">' + keys[i].split('-')[0] + '</a> - <a href="" onclick="sendToSongInput(event)">' + keys[i].split('-')[1] + '</a> - ' + results[keys[i]] + '</li>')
        }
    }

    document.getElementById('result').innerHTML = text + '</ul>';

}

//Muestra los scrobbles de cada cancion del disco que está en el input

function findAlbumSongs() {
    var results = [];
    var album = document.getElementsByName('album-input')[0].value;
    var artist = document.getElementsByName('artist-input')[0].value;

    for (var i = 0; i < json.length; i++) {
        if (json[i].album.toLowerCase() == album.toLowerCase() &&
            json[i].artist.toLowerCase() == artist.toLowerCase()) {
            if (results[json[i].song]) {
                results[json[i].song]++;
            } else {
                results[json[i].song] = 1;
            }
        }
    }

    var keys = Object.keys(results).sort(function(a, b) { return results[b] - results[a] });
    var text = "El album buscado es " + album + ' de ' + artist + '<br> <ul>';
    for (i = 0; i < keys.length; i++) {
        if (keys[i]) {
            text += ('<li><a href="" onclick="sendToArtistInput(event)">' + artist + '</a> - <a href="" onclick="sendToSongInput(event)">' + keys[i] + '</a> - ' + results[keys[i]] + '</li>')
        }
    }
    if (keys.length > 0) {
        document.getElementById('result').innerHTML = text + '</ul>';
    } else {
        document.getElementById('result').innerHTML = 'No hay resultados';
    }
}

//Obtener las canciones del día

function getDaySongs() {
    var day = document.getElementsByName('day-input')[0].value;
    var month = document.getElementsByName('month-input')[0].value;
    var year = document.getElementsByName('year-input')[0].value;
    var results = [];
    var key;
    for (var i = 0; i < json.length; i++) {
        if (json[i].day == day &&
            json[i].month == month &&
            json[i].year == year) {
            results[json[i].time] = (json[i].artist + '-' + json[i].song);
        }
        //Si ya cargó resultados y cambió el día, que salga del for, porque sé que el JSON está ordenado
        //asique no va a volver a encontrar resultados
        if (results.length > 0 && json[i].day != day) { break; }
    }

    var keys = Object.keys(results);
    var text = "<ul>";
    for (i = 0; i < keys.length; i++) {
        if (keys[i]) {
            text += ('<li><a href="" onclick="sendToArtistInput(event)">' + results[keys[i]].split('-')[0] + '</a> - <a href="" onclick="sendTosongInput(event)">' + results[keys[i]].split('-')[1] + '</a> - ' + keys[i] + '</li>')
        }
    }

    if (keys.length > 0) {
        document.getElementById('result').innerHTML = text + '</ul>';
    } else {
        document.getElementById('result').innerHTML = 'No hay resultados para ese día';
    }
}

//Devuelve todas las canciones escuchadas en un rango horario EN UN DÍA DADO

function getHourAndDay() {

    var hourFrom = document.getElementsByName('time-input-from')[0].value;
    var hourTo = document.getElementsByName('time-input-to')[0].value;
    var day = document.getElementsByName('day-input')[0].value;
    var month = document.getElementsByName('month-input')[0].value;
    var year = document.getElementsByName('year-input')[0].value;
    var results = [];
    var key;

    for (var i = 0; i < json.length; i++) {
        if (json[i].time >= hourFrom &&
            json[i].time <= hourTo &&
            json[i].day == day &&
            json[i].month == month &&
            json[i].year == year) {
            key = json[i].artist + '-' + json[i].song;
            results[key] = json[i].day + '/' + json[i].month + '/' + json[i].year + ' - ' + json[i].time;
        }
    }

    var keys = Object.keys(results);
    var text = "<ul>";
    for (i = 0; i < keys.length; i++) {
        if (keys[i]) {
            text += ('<li><a href="" onclick="sendToArtistInput(event)">' + keys[i].split('-')[0] + '</a> - <a href="" onclick="sendToSongInput(event)">' + keys[i].split('-')[1] + '</a> - ' + results[keys[i]] + '</li>')
        }
    }

    if (keys.length > 0) {
        document.getElementById('result').innerHTML = text + '</ul>';
    } else {
        document.getElementById('result').innerHTML = 'No hay resultados para ese rango horario';
    }
}

//Devuelve todas las canciones escuchadas en un rango horario CUALQUIER DIA

function getHour() {

    var hourFrom = document.getElementsByName('time-input-from')[0].value;
    var hourTo = document.getElementsByName('time-input-to')[0].value;
    var results = [];
    var key;

    for (var i = 0; i < json.length; i++) {
        if (json[i].time >= hourFrom && json[i].time <= hourTo) {
            key = json[i].artist + '-' + json[i].song;
            results[key] = json[i].day + '/' + json[i].month + '/' + json[i].year + ' - ' + json[i].time;
        }
    }

    var keys = Object.keys(results);
    var text = "<ul>";
    for (i = 0; i < keys.length; i++) {
        if (keys[i]) {
            text += ('<li><a href="" onclick="sendToArtistInput(event)">' + keys[i].split('-')[0] + '</a> - <a href="" onclick="sendToSongInput(event)">' + keys[i].split('-')[1] + '</a> - ' + results[keys[i]] + '</li>')
        }
    }

    if (keys.length > 0) {
        document.getElementById('result').innerHTML = text + '</ul>';
    } else {
        document.getElementById('result').innerHTML = 'No hay resultados para ese rango horario';
    }
}

// Devuelve todos los discos de un artista.

function FindAllAlbumsByArtist() {
    var artist = document.getElementsByName('artist-input')[0].value;
    var results = {};
    var key;

    for (var i = 0; i < json.length; i++) {
        if (json[i].artist == artist) {
            key = json[i].artist + '-/' + json[i].album;
            if (results[key]) {
                results[key]++;
            } else {
                results[key] = 1;
            }
        }
    }

    var keys = Object.keys(results).sort(function(a, b) { return results[b] - results[a] });
    var text = "<ul>";
    for (i = 0; i < keys.length; i++) {
        if (keys[i]) {
            text += ('<li><a href="" onclick="sendToArtistInput(event)">' + keys[i].split('-/')[0] + '</a> - <a href="" onclick="sendToAlbumInput(event)">' + keys[i].split('-/')[1] + '</a> - ' + results[keys[i]] + '</li>')
        }
    }

    document.getElementById('result').innerHTML = text + '</ul>';

}



// Si clickea en un link, lo manda a su input y ejecuta la función correspondiente para ver más info.

function sendToAlbumInput(e) {
    var values = e.currentTarget.parentNode.textContent.replace(/ - /g, '-/').split('-/');
    clearInputs();
    e.preventDefault();

    document.getElementsByName('artist-input')[0].value = values[0];
    document.getElementsByName('album-input')[0].value = values[1];
    enableButtons();
    findAlbumSongs();
}

function sendToSongInput(e) {
    clearInputs();
    var values = e.currentTarget.parentNode.textContent.replace(/ - /g, '-/').split('-/');
    e.preventDefault();
    document.getElementsByName('song-input')[0].value = values[1];
    document.getElementsByName('artist-input')[0].value = values[0];
    enableButtons();
    filterBySong();
}

function sendToArtistInput(e) {
    clearInputs();
    e.preventDefault();
    document.getElementsByName('artist-input')[0].value = e.currentTarget.text;
    findArtistSongs();
    enableButtons();
}

function clearInputs() {
    document.getElementById('artist-input').value = '';
    document.getElementById('song-input').value = '';
    document.getElementById('album-input').value = '';
    document.getElementById('day-input').value = '';
    document.getElementById('month-input').value = '';
    document.getElementById('year-input').value = '';
    document.getElementById("time-input-from").value = '';
    document.getElementById("time-input-to").value = '';


    document.getElementById("findArtist").disabled = true;
    document.getElementById("findSong").disabled = true;
    document.getElementById("findAlbum").disabled = true;
    document.getElementById("getDay").disabled = true;
    document.getElementById("getHour").disabled = true;
    document.getElementById("getHourAndday").disabled = true;
    document.getElementById("findAlbumsByArtist").disabled = true;
}

function fullClear() {
    clearInputs();
    document.getElementById('result').innerHTML = '';
}

window.onload = function() {
    var artistInput = document.getElementById('artist-input')
    var songInput = document.getElementById('song-input')
    var albumInput = document.getElementById('album-input')
    var dayInput = document.getElementById("day-input")
    var monthInput = document.getElementById("month-input")
    var yearInput = document.getElementById("year-input")
    var timeInputFrom = document.getElementById('time-input-from');
    var timeInputTo = document.getElementById('time-input-to');

    artistInput.addEventListener('keyup', enableButtons);
    songInput.addEventListener('keyup', enableButtons);
    albumInput.addEventListener('keyup', enableButtons);
    dayInput.addEventListener('keyup', enableButtons);
    monthInput.addEventListener('keyup', enableButtons);
    yearInput.addEventListener('keyup', enableButtons);
    timeInputFrom.addEventListener('keyup', enableButtons);
    timeInputTo.addEventListener('keyup', enableButtons);

}

function enableButtons() {
    var artistInput = document.getElementById('artist-input').value;
    var songInput = document.getElementById('song-input').value;
    var albumInput = document.getElementById('album-input').value;
    var dayInput = document.getElementById("day-input").value;
    var monthInput = document.getElementById("month-input").value;
    var yearInput = document.getElementById("year-input").value;
    var timeInputFrom = document.getElementById('time-input-from').value;
    var timeInputTo = document.getElementById('time-input-to').value;

    var findArtistBtn = document.getElementById("findArtist");
    var findSongBtn = document.getElementById("findSong");
    var findAlbumBtn = document.getElementById("findAlbum");
    var getDayBtn = document.getElementById("getDay");
    var getHourBtn = document.getElementById("getHour");
    var getHourAnddayBtn = document.getElementById("getHourAndday");
    var findAlbumsByArtistBtn = document.getElementById("findAlbumsByArtist");

    //Botón para buscar todos los temas de un artista, solo necesita el artista.

    if (artistInput) {
        findArtistBtn.disabled = false;
        findAlbumsByArtistBtn.disabled = false;
    } else {
        findArtistBtn.disabled = true;
        findAlbumsByArtistBtn.disabled = true;
    }

    //Botón para buscar canción, necesita si o sí canción y Artista

    if (artistInput && songInput) {
        findSongBtn.disabled = false;
    } else {
        findSongBtn.disabled = true;
    }

    // Botón para buscar album, necesita artista y album

    if (artistInput && albumInput) {
        findAlbumBtn.disabled = false
    } else {
        findAlbumBtn.disabled = true
    }

    // Botón para todo lo de un día, necesita día mes y año.

    if (dayInput && monthInput && yearInput) {
        getDayBtn.disabled = false;
    } else {
        getDayBtn.disabled = true;
    }

    // Botón para intervalo de hora todos los días, necesito los dos de horas.

    if (timeInputFrom && timeInputTo) {
        getHourBtn.disabled = false;
    } else {
        getHourBtn.disabled = true;
    }

    //Botón del día y la hora necesita todos los anteriores

    if (timeInputFrom && timeInputTo && dayInput && monthInput && yearInput) {
        getHourAnddayBtn.disabled = false;
    } else {
        getHourAnddayBtn.disabled = true;
    }
}