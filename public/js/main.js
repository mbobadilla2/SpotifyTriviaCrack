var songsLimit = 5;
var optionsLimit = 4;
var selectedSongs = new Array();
var songTimer;
var score = 0;
var totalScore = 0;

$(document).ready(function(){
    //Request for a new token
    getToken();

    //Request for a new token every 50 minutes.
    //setInterval(getToken(), 3000000);

    var resultState = $("#result").html();

    $("a").on("click", function(e){
        e.preventDefault();
    });

    $('#searchArtist').click(function (event) {
        $("#artistList").empty();
        event.preventDefault();
        var artist = document.getElementById('artistName').value;
        $.ajax({
            type: "get",
            dataType: "json",
            url: "https://api.spotify.com/v1/search?q=" + artist + "&type=artist",
            success: function (data) {

                for (var i in data.artists.items) {
                    var artistId = data.artists.items[i].id;
                    var artistName = data.artists.items[i].name;
                    $("#artistList").append('<li class="list-group-item"><a href="#" id=" ' + artistId + '" class="list-group-item playlist">' + artistName + '</a></li>');
                    $("#artistList").append('<div class="list-group-separator"></div>');
                }
                $("#artistList a").on("click", function (event) {
                    event.preventDefault();
                    getTopTracks($(this).attr("id"), $(this).text());
                });
            }
        });
    });



    $("#camilo").on("click", function(){
        var playlist = {
            name: $(this).text(),
            url: "https://api.spotify.com/v1/users/johnlennon01/playlists/4mZinGUWTMm8rvnLHzJqoF/tracks"
        }

        getPlaylist(playlist, resultState);
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
                $("#myModal-confirm").modal('show');
                //$("#myModal-score").modal('show');

                $("#play").on("click", function(){
                    $("#myModal-confirm").modal('hide');
                    $("#myModal-play").modal('show');

                    clearTimer();
                    prepareRound(0);
                });

                for(var j in selectedSongs){
                    console.log("***** SONG: " + selectedSongs[j].name);
                }

            },
            error: function(data){
                $("#myModal-error").modal('show');
                $("span.error-code").text(data.status + " (" + data.statusText + ").");
            }
    });
}


function getTopTracks(artistId, artistName){
    var playlist = {
        name: artistName, 
        url: "https://api.spotify.com/v1/artists/"+artistId.replace(" ", "")+"/top-tracks?country=ES"
    };

    var resultState = $("#result").html();

        $.ajax({
        type: "get",
        dataType: "json",
        url: playlist.url,

        success: function (data) {
                $("#result").empty();
                console.log(data);
                //selectedSongsIndex = new Array(songsLimit);
                //selectedSongsName = new Array(songsLimit);
                selectedSongs = new Array();
                score = 0;

                console.log("Tamaño de la lista: " + data.tracks.length);

                for(var i = 0; i < songsLimit; i++){
                    var oneSong = ranSongArtist(data.tracks.length - 1, data);

                    console.log("******* Selected song: " + data.tracks[oneSong].name + " | url: " + data.tracks[oneSong].preview_url); 
                    if(data.tracks[oneSong].preview_url == null){
                        //$("#result").append('<a style="background:steelblue; color:white" class="list-group-item song" href="'+ data.items[oneSong].track.preview_url + '">' + data.items[oneSong].track.name + ' (no url)</a>');                        
                        console.log("**************REINICIO :v");
                        getTopTracks(artistId, artistName);
                    }else{
                        //$("#result").append('<a class="list-group-item song" href="' +
                          //  data.items[oneSong].track.preview_url +'">' + data.items[oneSong].track.name + '</a>');
                    }
                }

                $(".song").on("click", playSong);
                
                $("#modal-playlist-title").text(playlist.name);
                $("#myModal-confirm").modal('show');
                //$("#myModal-score").modal('show');

                $("#play").on("click", function(){
                    $("#myModal-confirm").modal('hide');
                    $("#myModal-play").modal('show');

                    clearTimer();
                    prepareRound(0);
                });

                for(var j in selectedSongs){
                    console.log("***** SONG: " + selectedSongs[j].name);
                }

            },
            error: function(data){
                $("#myModal-error").modal('show');
                $("span.error-code").text(data.status + " (" + data.statusText + ").");
            }
    });
}

function playSong(e){
    e.preventDefault();
    var preview_url = $(this).attr("href");
    $("#player").attr("src", preview_url);

    $("#player").get(0).play();
    //Stops the music player after 11 seconds
    setTimeout(function(){
        //$("#player").attr("src", "");
        $("#player").get(0).pause();
    }, 11000);
}


function ranSongArtist(limit, data){
    var randomNumber = parseInt(Math.random() * limit) + 1;
    console.log("***** Número aleatorio: " + randomNumber);

    for(var i in selectedSongs){
        if(randomNumber == selectedSongs[i].track_number || 
            data.tracks[randomNumber].preview_url == null){
            console.log("Número repetido :'v    : " + "random: " + randomNumber + " | i : " + selectedSongs[i]);
            console.log("O url nula :'v  : " + data.tracks[randomNumber].preview_url);
            //break;
            return ranSongArtist(limit, data);
        }

    }

    var randomSong = {
        name: data.tracks[randomNumber].name,
        preview_url : data.tracks[randomNumber].preview_url,
        track_number : randomNumber,
        opt1 : ranOptArtist(data.tracks.length-1, data, randomNumber),
        opt2 : ranOptArtist(data.tracks.length-1, data, randomNumber),
        opt3 : ranOptArtist(data.tracks.length-1, data, randomNumber),
        disc_cover : data.tracks[randomNumber].album.images,
        correct : false
    };

    selectedSongs.push(randomSong);
    //selectedSongsIndex.push(randomNumber);
    //selectedSongsName.push(data.items[randomNumber].name)
    return randomNumber;
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
        disc_cover : data.items[randomNumber].track.album.images,
        correct : false
    };

    selectedSongs.push(randomSong);
    //selectedSongsIndex.push(randomNumber);
    //selectedSongsName.push(data.items[randomNumber].track.name)
    return randomNumber;
}

function ranOptArtist(limit, data, pickedSongIndex){
    var randomNumber = parseInt(Math.random() * limit) + 1;
    
    if(randomNumber == pickedSongIndex){
        return ranOptArtist(limit, data, pickedSongIndex);
        console.log("***** Opción coincide con canción");
    
    }else{
        return data.tracks[randomNumber].name;
    }

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

function prepareRound(index){
    setTimeout(function(){
        playRound(index);
    }, 1000);
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
        $("#result").append('<a class="list-group-item song song-'+i+'" href="#">' + 
                optionAux[i] + '</a>');

        $("#result").append('<div class="list-group-separator"></div>');
    }

    $("#result").append('</div>');  

    $("#player").attr("src", selectedSongs[index].preview_url);
    $("#player").get(0).play();

    $(".song-timer").finish();

    var timerWidth = $(".song-timer-container").width();
    $(".song-timer").css({
        "width": timerWidth + "px"
    });

    $(".song-timer").animate({
            width: 0
    }, 11000, "linear");


    //Stops the music player after 11 seconds
    songTimer = setTimeout(function(){
        //$("#player").attr("src", "");
        $("#player").get(0).pause();
        $('.song').prop('onclick',null).off('click');
        $(".song-timer").stop();

        evaluate("undefined", selectedSongs[index].name, index, optionAux);
        //alert("Time's up");
        //clearTimer();
    }, 11000);

    $(".song").on("click", function(e){
        e.preventDefault();
        clearTimer();

        $(".song-timer").stop();
        //$("#player").attr("src", "");
        $("#player").get(0).pause();
        $('.song').prop('onclick',null).off('click');

        evaluate(selectedSongs[index].name, this, index);
    });
}

function evaluate(song, option, index, optionAux){
    //alert("Option choosed: " + option.text);

    // The user ran out of time
    if(song == "undefined"){
        console.log(optionAux);
        for(var i in optionAux){
            console.log("FOR: " + optionAux[i]);
            if(optionAux[i] == option){
                console.log("Option for time up");
                $("#result a.song-"+i).removeClass("song");
                $("#result a.song-"+i).addClass("alert alert-info");
                break;
            }
        }


    // The user did chose an option
    }else{
        $(option).removeClass("song");

        if(song == option.text){
            $(option).addClass("alert alert-success");
            selectedSongs[index].correct = true;
            score ++;
            totalScore = (score * 20);

        }else{
            $(option).addClass("alert alert-danger");
        }
    }
    // Wait 2 seconds for next song
    setTimeout(function(){
        if(index == songsLimit-1){
            //alert("Game over \n\n Your score: " + score + "/" +songsLimit);
            showScore();
        }else{
            playRound(index+1);
        }
    }, 2000);
}

function showScore(){
    $(".score-heading").text("Your score: "+ totalScore);

    for(var i = 0; i < songsLimit; i++){
        var cover_url = selectedSongs[i].disc_cover[1].url;
        $(".score-list div:nth-child("+ (i+1) +") img").attr("src", cover_url);
        $(".score-list div:nth-child("+ (i+1) +") .song-name").text(selectedSongs[i].name);
        if(selectedSongs[i].correct){
            $(".score-list div:nth-child("+ (i+1) +")").css({
                "border-left": "20px solid #4caf50",
                "margin": "5px 0px",
                "padding-left": "0"
            });

        }else{
            $(".score-list div:nth-child("+ (i+1) +")").css({
                "border-left": "20px solid #f44336",
                "margin": "5px 0px",
                "padding-left": "0"
            });
        }
    }

    //$("#player").attr("src", "");
    $("#player").get(0).pause();

    var timerWidth = $(".song-timer-container").width();
    $(".song-timer").css({
        "width": timerWidth + "px"
    });    

    $("#result").empty();

    $("#myModal-play").modal('hide');
    $("#myModal-score").modal('show');
    totalScore = 0;
    score = 0;
    clearTimer();
}

function clearTimer(){
    //clearTimeout(songTimer);
    for (var i = 0; i < 1000; i++)
        window.clearInterval(i);

    console.log("timer limpio");
}



