const express = require('express');
const hbs = require('hbs');
const SpotifyWebApi = require('spotify-web-api-node');
// require spotify-web-api-node package here:

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// setting the spotify-api goes here:
const clientId = 'da312c510aa149338082cb8acdfdcf75',
    clientSecret = '1ee7821077314699b8f52ac19d2187b7';

const spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then( data => {
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch(error => {
    console.log('Something went wrong when retrieving an access token', error);
  })

// the routes go here:
app.get('/', (req, res, next) => {
  res.render("home")
})

app.get('/artists', (req, res, next) => {
  spotifyApi.searchArtists(req.query.artists)
    .then(data => {
      
      res.render('artists', {
        search: req.query.artists,
        JSON: JSON.stringify(data.body.artists.items, null, 2),
        artists: data.body.artists.items
      }) 
      console.log("The received data from the API: ", data.body.artists);
      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
    })
    .catch(err => {
      console.log("The error while searching artists occurred: ", err);
    })
  console.log("this worked")



  
  
})

app.listen(3000, () => console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊"));
