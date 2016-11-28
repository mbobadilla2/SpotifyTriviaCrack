var songsLimit = 5;
var optionsLimit = 4;
//Contains the index of the songs
//var selectedSongsIndex = new Array(songsLimit);
//Contains the name of the songs
//var selectedSongsName
var selectedSongs = new Array(songsLimit);
//Contains the options for every song
var selectedOptions = new Array(optionsLimit);

$(document).ready(function(){
    var resultState = $("#result").html();

    $("a").on("click", function(e){
        e.preventDefault();
    });

    $("#exitosMX").on("click", function(){
        var playlist = {
            name:"Éxitos de México",
            url: "https://api.spotify.com/v1/users/spotifyenespa%C3%B1ol/playlists/3lCaS7QcP5GzAP70rd9bpV/tracks"
        }

        getPlaylist(playlist, resultState);
    });

    $("#rockEspanol").on("click", function(){
        var playlist = {
            name:"Rock en español",
            url: "https://api.spotify.com/v1/users/spotifyenespa%C3%B1ol/playlists/4YoI4gyyoBCIexSdjqJMfl/tracks"
        }

        getPlaylist(playlist, resultState);
    });

   $("#metallica").on("click", function(){
        var playlist = {
            name:"Metallica",
            url: "https://api.spotify.com/v1/users/metallicaofficial/playlists/1cJ6lPBYj2fscs0kqBHsVV/tracks"

        }
        
        getPlaylist(playlist, resultState);
    });

    $("#theDoors").on("click", function(){
        var playlist = {
            name: "The Doors",
            url: "https://api.spotify.com/v1/users/1229306343/playlists/71yTvo2DPAfLW2OSbhtU0m/tracks"
        }

        getPlaylist(playlist, resultState);
    });


});

function getPlaylist(playlist, resultState){
    $.ajax({
            url: playlist.url,
            headers: {
                Authorization: oauthtoken
                //Host: "api.spotify.com"
            },
            accepts: "application/json",
            type: "GET",
            success: function (data) {
                $("#result").empty();
                console.log(data);

                //selectedSongsIndex = new Array(songsLimit);
                //selectedSongsName = new Array(songsLimit);
                selectedSongs = new Array(songsLimit);

                console.log("Tamaño de la lista: " + data.items.length);
                for(var i = 0; i < songsLimit; i++){
                    var oneSong = ranSong(data.items.length - 1, data);

                    console.log("******* Selected song: " + data.items[oneSong].track.name + " | url: " + data.items[oneSong].track.preview_url); 
                    if(data.items[oneSong].track.preview_url == null){
                        //$("#result").append('<a style="background:steelblue; color:white" class="list-group-item song" href="'+ data.items[oneSong].track.preview_url + '">' + data.items[oneSong].track.name + ' (no url)</a>');                        
                        console.log("**************REINICIO :v");
                        getPlaylist(playlist, resultState);
                    }else{
                        //$("#result").append('<a class="list-group-item song" href="' +
                          //  data.items[oneSong].track.preview_url +'">' + data.items[oneSong].track.name + '</a>');
                    }
                }

                $(".song").on("click", playSong);
                
                $("#modal-playlist-title").text(playlist.name);
                $("#myModal").modal('show');

                $("#play").on("click", function(){
                    playRound(data);
                });

                for(var j in selectedSongs){
                    console.log("***** SONG: " + selectedSongs[j].name);
                }

            },
            error: function(data){
                $("#myModal").modal('show');
                $(".modal-body").empty();
                $(".modal-body").append("<p>There was a problem getting the playlist: " + 
                    data.status + " ("+data.statusText+")</p>" +
                    "<p>The oauth token expired</p>");
                $(".modal-body").addClass("btn-danger");

                $(".modal-footer").empty();
                $(".modal-footer").append('<button type="button" class="btn btn-danger" data-dismiss="modal">Done</button>');
            }
    });
}

function playSong(e){
    e.preventDefault();
    var preview_url = $(this).attr("href");
    $("#player").attr("src", preview_url);

    //Stops the music player after 11 seconds
    setTimeout(function(){
        $("#player").attr("src", "");
    }, 11000);
}

function ranSong(limit, data){
    var randomNumber = parseInt(Math.random() * limit) + 1;
    console.log("***** Número aleatorio: " + randomNumber);

    for(var i in selectedSongs){
        if(randomNumber == selectedSongs[i] || 
            data.items[randomNumber].track.preview_url == null ||
                typeof data.items[randomNumber].track.preview_url == null){
            console.log("Número repetido :'v    : " + "random: " + randomNumber + " | i : " + selectedSongs[i]);
            console.log("O url nula :'v  : " + data.items[randomNumber].track.preview_url);
            //break;
            return ranSong(limit, data);
        }

    }
    var randomSong = {
        name: data.items[randomNumber].track.name,
        preview_url : data.items[randomNumber].track.preview_url,
        opt1 : "",
        opt2 : "",
        opt3 : "" 
    };

    selectedSongs.push(randomSong);
    //selectedSongsIndex.push(randomNumber);
    //selectedSongsName.push(data.items[randomNumber].track.name)
    return randomNumber;
}

function ranOpt(limit, data, song){
    var randomNumber = parseInt(Math.random() * limit) + 1;

    for(var i in data.items){
     //   if()
    }
}

function playRound(data){
    
    $("#result").empty();
    $("#result").append('<span class="list-group-item active">Spoiler: ' + selectedSongs[5].name + '</span>');
    $("#result").append('<a class="list-group-item song" href="#">' + 
            selectedSongs[5].name + '</a>');

    for(var i = 0; i < optionsLimit-1; i++){
        //var selectedOption = ranOpt(data.items.length-1, data, selectedSongs[5]]);

        //$("#result").append('<a class="list-group-item song" href="#">' + 
          //  data.items[selectedOption].track.name + '</a>');
    }

    $("#result").css({
        "display":"inline"
    });

    $("#player").attr("src", selectedSongs[5].preview_url);

    //Stops the music player after 11 seconds
    setTimeout(function(){
        $("#player").attr("src", "");
    }, 11000);

    $(".modal-footer").empty();
}







