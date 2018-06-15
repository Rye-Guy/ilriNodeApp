var Twitter = require('twitter');
var twitterKeys = require('./keys.js');
var request = require('request');

var action = process.argv[2];

var arg = '';

takeAction(action, arg);


function takeAction(action, arg){
    //for later when I want to take user searches into account.
    //arg = getThridArg();

    switch(action){
        case "my-tweets":
        getMyTweets();
        break;
    }
}

function getMyTweets(){
    var client = new Twitter(twitterKeys.twitterKeys);

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