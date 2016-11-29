var songsLimit = 5;
var optionsLimit = 4;
var selectedSongs = new Array();
var songTimer;
var score = 0;

$(document).ready(function(){
    var resultState = $("#result").html();

    $("a").on("click", function(e){
        e.preventDefault();
    });


    $("#juanGabriel").on("click", function(){
        var playlist = {
            name: $(this).text(),
            url: "https://api.spotify.com/v1/users/1293681490/playlists/653A2UmVkqV5vSpJR2JJwa/tracks"
        }

        getPlaylist(playlist, resultState);
    });

    $("#exitosMX").on("click", function(){
        var playlist = {
            name: $(this).text(),
            url: "https://api.spotify.com/v1/users/spotifyenespa%C3%B1ol/playlists/3lCaS7QcP5GzAP70rd9bpV/tracks"
        }

        getPlaylist(playlist, resultState);
    });

    $("#rockEspanol").on("click", function(){
        var playlist = {
            name: $(this).text(),
            url: "https://api.spotify.com/v1/users/spotifyenespa%C3%B1ol/playlists/4YoI4gyyoBCIexSdjqJMfl/tracks"
        }

        getPlaylist(playlist, resultState);
    });

   $("#metallica").on("click", function(){
        var playlist = {
            name: $(this).text(),
            url: "https://api.spotify.com/v1/users/metallicaofficial/playlists/1cJ6lPBYj2fscs0kqBHsVV/tracks"

        }
        
        getPlaylist(playlist, resultState);
    });

    $("#theDoors").on("click", function(){
        var playlist = {
            name: $(this).text(),
            url: "https://api.spotify.com/v1/users/1229306343/playlists/71yTvo2DPAfLW2OSbhtU0m/tracks"
        }

        getPlaylist(playlist, resultState);
    });

    $("#sodaStereo").on("click", function(){
        var playlist = {
            name: $(this).text(),
            url: "https://api.spotify.com/v1/users/1171852717/playlists/33YCF2iWA3PVTiql4N48fF/tracks"
        }

        getPlaylist(playlist, resultState);
    });

    $("#anime").on("click", function(){
        var playlist = {
            name: $(this).text(),
            url: "https://api.spotify.com/v1/users/12124288245/playlists/3qcBgSbo3mtCeAtUmGraGP/tracks"
        }

        getPlaylist(playlist, resultState);
    });

    $("#disney").on("click", function(){
        var playlist = {
            name: $(this).text(),
            url: "https://api.spotify.com/v1/users/128899670/playlists/5NtjgKz4doejP5HJtKXFcS/tracks"
        }

        getPlaylist(playlist, resultState);
    });

    $("#cumbias").on("click", function(){
        var playlist = {
            name: $(this).text(),
            url: "https://api.spotify.com/v1/users/spotifyenespa%C3%B1ol/playlists/6w6wTk0wjZdPXEaQ18lmiH/tracks"
        }

        getPlaylist(playlist, resultState);
    });


    $("#animeLatino").on("click", function(){
        var playlist = {
            name: $(this).text(),
            url: "https://api.spotify.com/v1/users/12133350097/playlists/6Pl3qiDB1EfBoZc4kESJRR/tracks"
        }

        getPlaylist(playlist, resultState);
    });

    $("#slipknot").on("click", function(){
        var playlist = {
            name: $(this).text(),
            url: "https://api.spotify.com/v1/users/hellswar/playlists/1nFcjxAmcqyGkphDMRMh50/tracks"
        }

        getPlaylist(playlist, resultState);
    });


    $("#rammstein").on("click", function(){
        var playlist = {
            name: $(this).text(),
            url: "https://api.spotify.com/v1/users/rammsteinofficial/playlists/0SOay3RkjojjevrF5lHMON/tracks"
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
                selectedSongs = new Array();
                score = 0;

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
                    $("#myModal").modal('hide');
                    $("#myModal-2").modal('show');

                    clearTimer();
                    playRound(0);
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
                $(".modal-body").addClass("alert alert-danger");

                $(".modal-footer").empty();
                $(".modal-footer").append('<button type="button" class="btn btn-raised btn-danger" data-dismiss="modal">Done</button>');
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
        if(randomNumber == selectedSongs[i].track_number || 
            data.items[randomNumber].track.preview_url == null){
            console.log("Número repetido :'v    : " + "random: " + randomNumber + " | i : " + selectedSongs[i]);
            console.log("O url nula :'v  : " + data.items[randomNumber].track.preview_url);
            //break;
            return ranSong(limit, data);
        }

    }

    var randomSong = {
        name: data.items[randomNumber].track.name,
        preview_url : data.items[randomNumber].track.preview_url,
        track_number : randomNumber,
        opt1 : ranOpt(data.items.length-1, data, randomNumber),
        opt2 : ranOpt(data.items.length-1, data, randomNumber),
        opt3 : ranOpt(data.items.length-1, data, randomNumber),
    };

    selectedSongs.push(randomSong);
    //selectedSongsIndex.push(randomNumber);
    //selectedSongsName.push(data.items[randomNumber].track.name)
    return randomNumber;
}

function ranOpt(limit, data, pickedSongIndex){
    var randomNumber = parseInt(Math.random() * limit) + 1;
    
    if(randomNumber == pickedSongIndex){
        return ranOpt(limit, data, pickedSongIndex);
        console.log("***** Opción coincide con canción");
    
    }else{
        return data.items[randomNumber].track.name;
    }

}

function mixOptions(){
    var tempOptions = new Array();
    var counter = 0;
    var unique = true;
    var randomNumber = 0;

    for(;;){
        unique = true;
        randomNumber = parseInt(Math.random() * optionsLimit) + 1;

        for(var i in tempOptions){
            if(randomNumber == tempOptions[i]){
                unique = false;
                break;
            }
        }

        if(unique){
            tempOptions.push(randomNumber);
            counter++;

            if(counter == optionsLimit){
                return tempOptions;
            }
        }
    }
}

function playRound(index){
    var scrambledOptions = mixOptions();
    var optionAux = new Array();

    optionAux[scrambledOptions[0]-1] = selectedSongs[index].name;
    optionAux[scrambledOptions[1]-1] = selectedSongs[index].opt1;
    optionAux[scrambledOptions[2]-1] = selectedSongs[index].opt2;
    optionAux[scrambledOptions[3]-1] = selectedSongs[index].opt3;

    $("#result").empty();
    //$("#result").append('<div class="panel panel-primary"> <div class="panel-heading">Spoiler: ' + selectedSongs[index].name + '</div>');
    $("#result").append('<div class="list-group-separator"></div>');

    for(var i = 0; i < optionAux.length; i++){
        $("#result").append('<a class="list-group-item song" href="#">' + 
                optionAux[i] + '</a>');

        $("#result").append('<div class="list-group-separator"></div>');
    }

    $("#result").append('</div>');  

    $("#player").attr("src", selectedSongs[index].preview_url);

    //Stops the music player after 11 seconds
    songTimer = setTimeout(function(){
        $("#player").attr("src", "");
        alert("Time's up");
    }, 11000);

    $(".song").on("click", function(e){
        e.preventDefault();
        clearTimer(songTimer);
        $("#player").attr("src", "");
        evaluate(selectedSongs[index].name, this, index);
    });
}

function evaluate(song, option, index){
    //alert("Option choosed: " + option.text);
    $(option).removeClass("song");

    if(song == option.text){
        $(option).addClass("alert alert-success");
        score ++;

    }else{
        $(option).addClass("alert alert-danger");
    }

    // Wait 2 seconds for next song
    setTimeout(function(){
        if(index == songsLimit-1){
            alert("Game over \n\n Your score: " + score + "/" +songsLimit);
        }else{
            playRound(index+1);
        }
    }, 2000);
}

function clearTimer(){
    clearTimeout(songTimer);
    console.log("timer limpio");
}



