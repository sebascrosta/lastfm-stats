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
      text += ('<a href="" onclick="sendToInput(event)">' + keys[i]+ '</a>' + " - " + results[keys[i]] + '<br>')
    }
  }

  document.getElementById('result').innerHTML = text;

}


function showArtistAndQuantity (){
  var results = document.getElementById('result');
  var artists = [];

  for(var i = 0; i < json.length; i++){
    if(artists[json[i].artist]){
      artists[json[i].artist] = artists[json[i].artist] + 1;
    } else {
      artists[json[i].artist] = 1;
    }
  }

  var keys = Object.keys(artists);

  for(i = 0; i < keys.length -1 ; i++){
    var newLine = (keys[i] + " - " + artists[keys[i]] + '<br>');
      results.innerHTML += newLine
  }
}

function filterBySong(song){
  var quantity = 0;
  var date_listened;
  var final_result = "La canción buscada es " + song + ":\n"

  for (var i = 0; i < json.length; i++){
    if(json[i].song.toLowerCase() == song.toLowerCase()){
      date_listened = json[i].day + "/" + json[i].month + "/" + json[i].year + " " + json[i].time + '<br>';
        final_result += date_listened;
      quantity++;
    }
  }

    final_result += "Cantidad: ";
    final_result += quantity;

    document.getElementById('result').innerHTML = final_result;
}

function findArtistSongs (){
  
  var artist = document.getElementsByName('artist')[0].value;
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
    text +=  (keys[i] + " - " + results[keys[i]] + '<br>')
  }

  document.getElementById('result').innerHTML = text;

}

function sendToInput(e){
  e.preventDefault();
  document.getElementsByName('artist')[0].value = e.currentTarget.text
}