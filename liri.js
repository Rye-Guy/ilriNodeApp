var dotenv = require('dotenv').config();
var Twitter = require('twitter');
var twitterKeys = require('./keys.js');
var request = require('request');
var Spotify = require('node-spotify-api');

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
    var spotify = new Spotify(twitterKeys.spotifyKeys);

    spotify.search({
        type: 'track',
        query: song,
        limit: 1
    }, function (error, data) {
        if (error) {
            console.log("Cannot Find Song!");
            return;
        }
      //  console.log(JSON.stringify(data.tracks.items[0]));
        var artistArray = data.tracks.items[0].album.artists;
        var artistNames = [];

        for (var i = 0; i < artistArray.length; i++) {

            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Song Title: " + data.tracks.items[0].name);
            console.log("Link: " + data.tracks.items[0].external_urls.spotify);
            //  console.log(artistArray);
            //  console.log(artistNames);
        }

        // var artists = artistsNames.join(", ");

        // console.log("Artists: " + artists);
        // console.log("Song: " + data.tracks.items[0].name);
        // console.log("Link: " + data.tracks.item[0].preview_url);
        // console.log("Album: " + data.tracks.item[0].album.name);
    });
}


// {
//     "album": {
//         "album_type": "album",
//         "artists": [{
//             "external_urls": {
//                 "spotify": "https://open.spotify.com/artist/1Mxqyy3pSjf8kZZL4QVxS0"
//             },
//             "href": "https://api.spotify.com/v1/artists/1Mxqyy3pSjf8kZZL4QVxS0",
//             "id": "1Mxqyy3pSjf8kZZL4QVxS0",
//             "name": "Frank Sinatra",
//             "type": "artist",
//             "uri": "spotify:artist:1Mxqyy3pSjf8kZZL4QVxS0"
//         }],
//         "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
//         "external_urls": {
//             "spotify": "https://open.spotify.com/album/66v9QmjAj0Wwhh2OpbU4BE"
//         },
//         "href": "https://api.spotify.com/v1/albums/66v9QmjAj0Wwhh2OpbU4BE",
//         "id": "66v9QmjAj0Wwhh2OpbU4BE",
//         "images": [{
//             "height": 640,
//             "url": "https://i.scdn.co/image/a4be7d6da89ee5e7fbac9875d590fc16f7822faa",
//             "width": 638
//         }, {
//             "height": 300,
//             "url": "https://i.scdn.co/image/d1a0562da0926d7344a9e57edcba641510d8ed17",
//             "width": 299
//         }, {
//             "height": 64,clear
//             "url": "https://i.scdn.co/image/9e3bb89d8bc58a17bc49515e872ef31535d7cb03",
//             "width": 64
//         }],
//         "name": "Come Fly With Me",
//         "release_date": "1958",
//         "release_date_precision": "year",
//         "type": "album",
//         "uri": "spotify:album:66v9QmjAj0Wwhh2OpbU4BE"
//     },
//     "artists": [{
//         "external_urls": {
//             "spotify": "https://open.spotify.com/artist/1Mxqyy3pSjf8kZZL4QVxS0"
//         },
//         "href": "https://api.spotify.com/v1/artists/1Mxqyy3pSjf8kZZL4QVxS0",
//         "id": "1Mxqyy3pSjf8kZZL4QVxS0",
//         "name": "Frank Sinatra",
//         "type": "artist",
//         "uri": "spotify:artist:1Mxqyy3pSjf8kZZL4QVxS0"
//     }],
//     "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
//     "disc_number": 1,
//     "duration_ms": 198066,
//     "explicit": false,
//     "external_ids": {
//         "isrc": "USCA29800360"
//     },
//     "external_urls": {
//         "spotify": "https://open.spotify.com/track/4hHbeIIKO5Y5uLyIEbY9Gn"
//     },
//     "href": "https://api.spotify.com/v1/tracks/4hHbeIIKO5Y5uLyIEbY9Gn",
//     "id": "4hHbeIIKO5Y5uLyIEbY9Gn",
//     "is_local": false,
//     "name": "Come Fly With Me - 1998 Digital Remaster",
//     "popularity": 68,
//     "preview_url": null,
//     "track_number": 1,
//     "type": "track",
//     "uri": "spotify:track:4hHbeIIKO5Y5uLyIEbY9Gn"
// }