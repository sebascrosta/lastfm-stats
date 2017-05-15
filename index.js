function showArtists (json){

  var artists = [];

  for(var i = 0; i < json.length; i++){
    if(artists.indexOf(json[i].artist) === -1){
      artists.push(json[i].artist);

      pArtistas.innerHTML += json[i].artist;
      pArtistas.innerHTML += '<br>';
    }
  }
}


function showArtistAndQuantity (){
  var pArtistas = document.getElementById('artistas');
  var artists = [];

  for(var i = 0; i < json.length - 1; i++){
    if(artists[json[i].artist]){
      artists[json[i].artist] = artists[json[i].artist] + 1;
    } else {
      artists[json[i].artist] = 1;
    }
  }

  var keys = Object.keys(artists);

  for(i = 0; i < keys.length -1 ; i++){
    var newLine = (keys[i] + " - " + artists[keys[i]] + '<br>');
    pArtistas.innerHTML += newLine
  }
}

function filterBySong(song){
  var pArtistas = document.getElementById('artistas');
  var quantity = 0;
  var songLower = song.toLowerCase();
  var date_listened;

  pArtistas.innerHTML = "La canción buscada es " + song + ": <br>"

  for (var i = 0; i < json.length - 1; i++){
    if(json[i].song.toLowerCase() == songLower){
      date_listened = json[i].day + "/" + json[i].month + "/" + json[i].year + " " + json[i].time + "<br>";
      pArtistas.innerHTML += date_listened;
      quantity++;
    }
  }

  pArtistas.innerHTML += "Cantidad: ";
  pArtistas.innerHTML += quantity;
}

filterBySong('Fallout')
