# SpotifyTriviaCrack
Responsive web app that uses the Spotify web services to play a musical trivia. Every round consists of 5 songs that the user has to guess its name from 4 different choices. The more songs the user guess, the more points the user gets.

<h2>Installation</h2>
<p>To run this application, you need to install Node.js on your computer. You can download it from its 
  <a href="https://nodejs.org/en/">official website.</a>
</p>
<p>Once installed, download the repository, and open its location over the terminal. 
Then, install its dependencies using the following command: 
</p>

<pre>
  <code>
    $ npm install
  </code>
</pre>

<h2>Running the application</h2>
<p>
  To run this application, open its folder over the terminal and run the following command:
<pre>
  <code>
    $ node app.js
  </code>
</pre>
  you'll get the message <code>Listening on 8888</code>. That means that the app is running. 
  To open it, go to <code>http://localhost:8888/</code> on your web browser.
</p>

<h2>Change the credentials</h2>
<p>
  In order to request the Spotify server for specific queries, you need to create an application in the 
  <a href="https://developer.spotify.com/my-applications/#!/">Spotify developers web page</a>. Once created, you'll get a
  <code>Client ID</code> and a <code>Client secret</code> token. You also have to add <code>http://localhost:8888/callback</code>
  to the white list in the next section.
</p>

<p>
  Once your app was created, paste the <code>Client ID</code>, <code>Client secret</code> and <code>http://localhost:8888/callback</code>
  to the <code>credentials.js</code> file for the values of <code>client_id</code>, <code>client_secret</code> and <code>redirect_uri</code> respectively.
</p>

<p>
  Then, go to the <a href="https://developer.spotify.com/web-api/console/get-playlist-tracks/">Spotify developer console</a> and request an <code>oauth token</code>
  to make requests to the server and find the endpoint needed to get an user playlist, a playlist's tracks, user's profile, and more. You'll need to
  add that <code>oauth token</code> on the <code>main.js</code> file, on the headers section of the ajax request, replacing the words <code>"Your_oauth_token"</code>
  (Leave the word 'Bearer' right in its place). This way, all the queries to the server will be authenticated.
</p>
