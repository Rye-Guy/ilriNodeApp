var dotenv = require('dotenv').config();
var Twitter = require('twitter');
var twitterKeys = require('./keys.js');
var request = require('request');
var Spotify = require('node-spotify-api');
var fs = require('fs')
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
    
        case "do-what-it-says":
            doWhatItSays();
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

function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(error, data){
        if(error){
            console.log("Cannot read file!");
        }else{
            var argsArray = data.split(",");
            action = argsArray[0];
            arg = argsArray[1];

            takeAction(action, arg);
        }
    });
}