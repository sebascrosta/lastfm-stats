//Muestra a todos los artistas con más de 10 scrobbles.

function showArtists (){
  var results = {};

  for(var i = 0; i < json.length; i++){
    if(results[json[i].artist]){
      results[json[i].artist] ++;
    }else{
      results[json[i].artist] = 1;
    }
  }

  var keys = Object.keys(results).sort(function(a,b){return results[b]-results[a]});
  var text = "";
  for(i = 0; i < keys.length; i++){
    if(results[keys[i]] >= 10){
      text += ('<a href="" onclick="sendToArtistInput(event)">' + keys[i]+ '</a>' + " - " + results[keys[i]] + '<br>')
    }
  }

  document.getElementById('result').innerHTML = text;

}

//Si buscás una canción, te devuelve cuántas veces y cuando la escuchaste.

function filterBySong(){
  var quantity = 0;
  var date_listened;
  var song = document.getElementsByName('song-input')[0].value;
  var final_result = "";

  for (var i = 0; i < json.length; i++){
    if(json[i].song.toLowerCase() == song.toLowerCase()){
      date_listened = json[i].day + "/" + json[i].month + "/" + json[i].year + " " + json[i].time + '<br>';
        final_result += date_listened;
      quantity++;
    }
  }
  
  var cabecera = "La canción buscada es " + song + " y la escuché " + quantity + " veces\n"
    
    document.getElementById('result').innerHTML = (cabecera + final_result);
}

//Muestra todas las canciones de un artist (El el input) a y la cantidad de scrobbles de cada una

function findArtistSongs (){
  
  var artist = document.getElementsByName('artist-input')[0].value;
  var results = {};
  var quantity = 0;

  for(var i = 0; i < json.length; i++){
    if(json[i].artist.toLowerCase() == artist.toLowerCase()){
      if(results[json[i].song]){
        results[json[i].song] = results[json[i].song] + 1;
      } else {
        results[json[i].song] = 1;
      }
          quantity++;
    }
  }

  var text = "El artista buscado es " + artist + " lo escuchaste " + quantity + " veces <br>";
  var keys = Object.keys(results).sort(function(a,b){return results[b]-results[a]})
  var newline;

  for(i = 0; i < keys.length -1 ; i++){
      text += ('<a href="" onclick="sendToSongInput(event)">' + keys[i]+ '</a>' + " - " + results[keys[i]] + '<br>')
  }

  document.getElementById('result').innerHTML = text;

}

//Muestra los 100 cds más escuchados

function mostListenedAlbums (){
  var results = [];

  for(var i = 0; i < json.length; i++){
    if(results[json[i].album]){
      results[json[i].album] ++;
    }else{
      results[json[i].album] = 1;
    }
  }

  var keys = Object.keys(results).sort(function(a,b){return results[b]-results[a]});
  var text = "";
  for(i = 0; i < 100; i++){
    if(keys[i]){
      text += ('<a href="" onclick="sendToAlbumInput(event)">' + keys[i]+ '</a>' + " - " + results[keys[i]] + '<br>')
    }
  }

  document.getElementById('result').innerHTML = text;

}

//Muestra las 250 canciones maś escuchadas


function mostListenedSongs (){
  var results = {};

  for(var i = 0; i < json.length; i++){
    if(results[json[i].song]){
      results[json[i].song] ++;
    }else{
      results[json[i].song] = 1;
    }
  }

  var keys = Object.keys(results).sort(function(a,b){return results[b]-results[a]});
  var text = "";
  for(i = 0; i < 100; i++){
    if(keys[i]){
      text += ('<a href="" onclick="sendToSongInput(event)">' + keys[i]+ '</a>' + " - " + results[keys[i]] + '<br>')
    }
  }

  document.getElementById('result').innerHTML = text;

}

//Muestra los scrobbles de cada cancion del disco que está en el input

function findAlbumSongs(){
    var results = [];
    var album = document.getElementsByName('album-input')[0].value.toLowerCase();

  for(var i = 0; i < json.length; i++){
    if(json[i].album.toLowerCase() == album){
      if(results[json[i].song]){
        results[json[i].song] ++;
      }else{
        results[json[i].song] = 1;
      }
    }
  }

  var keys = Object.keys(results).sort(function(a,b){return results[b]-results[a]});
  var text = "";
  for(i = 0; i < 100; i++){
    if(keys[i]){
      text += ('<a href="" onclick="sendToSongInput(event)">' + keys[i]+ '</a>' + " - " + results[keys[i]] + '<br>')
    }
  }

  document.getElementById('result').innerHTML = text;

}

// Si clickea en un link, lo manda a su input y ejecuta la función correspondiente para ver más info.

function sendToAlbumInput(e){
  e.preventDefault();
  document.getElementsByName('album-input')[0].value = e.currentTarget.text;
  findAlbumSongs();
}

function sendToSongInput(e){
  e.preventDefault();
  document.getElementsByName('song-input')[0].value = e.currentTarget.text;
  filterBySong();
}

function sendToArtistInput(e){
  e.preventDefault();
  document.getElementsByName('artist-input')[0].value = e.currentTarget.text;
  findArtistSongs();
}



