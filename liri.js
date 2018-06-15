var dotenv = require('dotenv').config();
var Twitter = require('twitter');
var twitterKeys = require('./keys.js');
var request = require('request');
var Spotify = require('node-spotify-api');

var action = process.argv[2];

var arg = '';

takeAction(action, arg);


function takeAction(action, arg){
 
    switch(action){
        case "my-tweets":
        getMyTweets();
        break;
    
        case "spotify-this-song":
        var song = arg;
        getSong(song);
        break;
    }

}

function getMyTweets(){
    var client = new Twitter(twitterKeys.twitterKeys);
//used public twitter account as def
    var params = {q: '@pattyMo', count: 20};

    client.get('search/tweets', params, function(error, tweets, response){
        if(!error){
            for (var i = 0; i < tweets.statuses.length; i++){
                var tweetText = tweets.statuses[i].text;
                console.log('Tweet: ' + tweetText);
                var tweetDate = tweets.statuses[i].created_at;
                console.log('Date Tweeted: ' + tweetDate);
            }
        }else{
            console.log("I HAVE FAILED YOUUUU!!!!!!");
        }
    });
}

function getSong(song){
    var spotify = new Spotify(twitterKeys.spotifyKeys);

    spotify.search({type:  'track', query: 'All the Small Things'}, function(error, data){
        if(error){
            console.log("Cannot Find Song!");
            return;
        }
        console.log(data);
      //  var artistArray = data.tracks.items[0].album.artists;
        // var artistNames = [];

        // for(var i = 0; i < artistArray.length; i++){
        //     artistNanodemes.push(artistArray[i].name)
        // }

        // var artists = artistsNames.join(", ");

        // console.log("Artists " + artists);
    
    });

}
