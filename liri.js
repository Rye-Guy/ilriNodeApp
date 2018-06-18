var dotenv = require('dotenv').config();
var Twitter = require('twitter');
var twitterKeys = require('./keys.js');
var request = require('request');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(twitterKeys.spotifyKeys);


var action = process.argv[2];

var arg = process.argv[3];

takeAction(action, arg);


function takeAction(action, arg) {

    switch (action) {
        case "my-tweets":
            getMyTweets();
            break;

        case "spotify-this-song":

            var song = arg;
            getSong(song);
            break;

        case "movie-this":
            var movieTitle = arg;
            getMovie(movieTitle);
            break;
    }

}

function getMyTweets() {
    var client = new Twitter(twitterKeys.twitterKeys);
    //used public twitter account as def
    var params = {
        q: '@pattyMo',
        count: 20
    };
    client.get('search/tweets', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.statuses.length; i++) {
                var tweetText = tweets.statuses[i].text;
                console.log('Tweet: ' + tweetText);
                var tweetDate = tweets.statuses[i].created_at;
                console.log('Date Tweeted: ' + tweetDate);
            }
        } else {
            console.log("I HAVE FAILED YOUUUU!!!!!!");
        }
    });
}

function getSong(song) {

    if (arg == null || arg == '') {
        song = 'The Sign Ace of Base';
    }

    spotify.search({
        type: 'track',
        query: song,
        limit: 1
    }, function (error, data) {
        if (error) {
            console.log("Cannot Find Song!");
            return;
        }
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("Song Title: " + data.tracks.items[0].name);
        console.log("Link: " + data.tracks.items[0].external_urls.spotify);
    });


}

function getMovie(movieTitle) {
    if (arg == null || arg == '') {
        movieTitle = 'Mr. Nobody';
    }
    console.log("hello");
    var query = "http://www.omdbapi.com/?t=" + movieTitle + "&plot=short&tomatoes=true&apikey=trilogy";
    console.log(query);
    request(query, function (error, response, data) {

        if (!error) {
            var movieData = JSON.parse(data);
            console.log("Title: " + movieData.Title);
            console.log("Year: " + movieData.Year);
            console.log("IMDB Rating: " + movieData.Ratings[0].Value);
            console.log("Rotten Tomatos Rating: " + movieData.Ratings[1].Value);
            console.log("Country Produced: " + movieData.Country);
            console.log("Language: " + movieData.Language);
            console.log("Actors: " + movieData.Actors);
            console.log("Plot: " + movieData.Plot);

            
        } else
            console.log("OMDB request has failed!");
    });

}

// {
//     "Title": "Star Wars: Episode IV - A New Hope",
//     "Year": "1977",
//     "Rated": "PG",
//     "Released": "25 May 1977",
//     "Runtime": "121 min",
//     "Genre": "Action, Adventure, Fantasy",
//     "Director": "George Lucas",
//     "Writer": "George Lucas",
//     "Actors": "Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing",
//     "Plot": "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader.",
//     "Language": "English",
//     "Country": "USA",
//     "Awards": "Won 6 Oscars. Another 50 wins & 28 nominations.",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
//     "Ratings": [{
//         "Source": "Internet Movie Database",
//         "Value": "8.6/10"
//     }, {
//         "Source": "Rotten Tomatoes",
//         "Value": "93%"
//     }, {
//         "Source": "Metacritic",
//         "Value": "90/100"
//     }],
//     "Metascore": "90",
//     "imdbRating": "8.6",
//     "imdbVotes": "1,057,823",
//     "imdbID": "tt0076759",
//     "Type": "movie",
//     "tomatoMeter": "N/A",
//     "tomatoImage": "N/A",
//     "tomatoRating": "N/A",
//     "tomatoReviews": "N/A",
//     "tomatoFresh": "N/A",
//     "tomatoRotten": "N/A",
//     "tomatoConsensus": "N/A",
//     "tomatoUserMeter": "N/A",
//     "tomatoUserRating": "N/A",
//     "tomatoUserReviews": "N/A",
//     "tomatoURL": "http://www.rottentomatoes.com/m/star_wars/",
//     "DVD": "21 Sep 2004",
//     "BoxOffice": "N/A",
//     "Production": "20th Century Fox",
//     "Website": "http://www.starwars.com/episode-iv/",
//     "Response": "True"
// }