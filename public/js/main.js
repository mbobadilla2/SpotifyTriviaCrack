$(document).ready(function(){
    getPlaylist();
});

function getPlaylist(){
    $.ajax({
            url: "https://api.spotify.com/v1/users/spotifyenespa%C3%B1ol/playlists/3lCaS7QcP5GzAP70rd9bpV/tracks",
            headers: {
                Authorization: "Bearer Your_oauth_token"
                //Host: "api.spotify.com"
            },
            accepts: "application/json",
            type: "GET",
            success: function (data) {
                $("#resultado1").append(data);
                console.log(data);
                /*$("#resultado1").append('<ul id ="ll" class="list-group">');
                $("#resultado1").append('<li class="list-group-item encabezado"> Artistas </li>');
                for (var i in data.artists.items) {
                    var artistId = data.artists.items[i].id;
                    var artistName = data.artists.items[i].name;
                    $("#resultado1").append('<li class="list-group-item"><a href="#" id="' + artistId + '" onclick="regresaFalso()" class="ligaArtista">' + artistName + '</a></li>');
                }*/
            },
            error: function(data){

            }
    });
}
