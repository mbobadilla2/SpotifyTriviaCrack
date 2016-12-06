var client_id = '5577a9440dd246b09cd5168ba7cb7286'; // Your client id
var client_secret = '45214add34454059852caf42132b6808'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

var oauthtoken = "";

    function getToken() {
        var CLIENT_ID = client_id;
        var REDIRECT_URI = redirect_uri;
        function getLoginURL(scopes) {
            return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
              '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
              '&scope=' + encodeURIComponent(scopes.join(' ')) +
              '&response_type=token';
        }
        
        var url = getLoginURL([
            'playlist-modify-public'
        ]);
        
        var width = 450,
            height = 730,
            left = (screen.width / 2) - (width / 2),
            top = (screen.height / 2) - (height / 2);
    
        window.addEventListener("message", function(event) {
            var hash = JSON.parse(event.data);
            if (hash.type == 'access_token') {
                //callback(hash.access_token);
                //alert(hash.access_token);
                oauthtoken = "Bearer " + hash.access_token;
            }
        }, false);
        
        var w = window.open(url,
                            'Spotify',
                            'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
                           );
        
    }