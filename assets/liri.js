require("dotenv").config();


var keys = require('./keys.js');
var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify(keys.spotifyKeys);

// console.log(client);
console.log(spotify);

var getTweets = () => {
    var client = new Twitter(keys.twitterKeys);
    
    var params = {screen_name: 'nodejs', count: 20};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(error);
        } else {
            console.log(tweets)
        }
    })
}
getTweets();