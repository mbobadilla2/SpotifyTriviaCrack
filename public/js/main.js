$(document).ready(function(){
    var resultTemp = $("#result").html();

    $("a").on("click", function(e){
        e.preventDefault();
    });

    $("#exitosMX").on("click", function(){
        var exitosMexico = {
            name:"Éxitos de México",
            url: "https://api.spotify.com/v1/users/spotifyenespa%C3%B1ol/playlists/3lCaS7QcP5GzAP70rd9bpV/tracks"
        }

        getPlaylist(exitosMexico, resultTemp);
    });

    $("#rockEspanol").on("click", function(){
        var rockEspanol = {
            name:"Rock en español",
            url: "https://api.spotify.com/v1/users/spotifyenespa%C3%B1ol/playlists/4YoI4gyyoBCIexSdjqJMfl/tracks"
        }

        getPlaylist(rockEspanol, resultTemp);
    });


});

function getPlaylist(playlist, temp){
    $.ajax({
            url: playlist.url,
            headers: {
                Authorization: oauthtoken
                //Host: "api.spotify.com"
            },
            accepts: "application/json",
            type: "GET",
            success: function (data) {
                $("#result").html(temp);
                console.log(data);
                for (var i in data.items) {
                    $("#result").append('<a class="list-group-item song" href="'+ data.items[i].track.preview_url + '">' + data.items[i].track.name + '</a>');
                }

                $(".song").on("click", playSong);
            },
            error: function(data){

            }
    });
}

function playSong(e){
    e.preventDefault();

    var preview_url = $(this).attr("href");
    $("#player").attr("src", preview_url);
}