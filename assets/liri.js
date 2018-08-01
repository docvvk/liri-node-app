require("dotenv").config();

const chalk = require('chalk');
const chalkAnimation = require('chalk-animation');
 
var keys = require('./config');
var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');


var getTweets = () => {
    var client = new Twitter(keys.twitterKeys);

    // console.log(client);
    
    var params = {screen_name: 'shaurya', count: 1};
  
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {
            console.log(error);
            return;
        } else {
            var data = [];
            for (var i = 0; i < tweets.length; i++) {
                data.push({
                    'TIME'  : tweets[i].created_at,
                    'TWEET' : tweets[i].text,
                });
            };

            console.log(chalk.bgYellow.blue(JSON.stringify(data, null, 2)));
            // console.log(response);
            dataToLog(data);
            console.log(chalk.bold.red("-----------------------------------------"));
            var rainbow = chalkAnimation.rainbow('log.txt updated !');
            setTimeout(()=> {
                rainbow.stop(); // Animation Stops
            }, 3000);
        }
    });
}
// getTweets();

var getSong = (variable) => {

    var spotify = new Spotify(keys.spotifyKeys);

    if (!variable) {
        variable = "The+Sign+Ace+of+Base"
    };
    // console.log(variable);

    var spotifyParams = {type: 'track', query: variable}
    spotify.search(spotifyParams, (err,data) => {
        if (err) {
            return console.log('Error: ' + err);
        }

        for (i=0; i<data.tracks.items.length; i++ ) {
            var dataArray = [];
            dataArray.push({
                artist: data.tracks.items[i].artists[0].name,
                name: data.tracks.items[i].name,
                preview: data.tracks.items[i].preview_url,
                album: data.tracks.items[i].album.name
            });
            console.log(chalk.yellow(JSON.stringify(dataArray, null, 2)));
            dataToLog(dataArray);
            console.log(chalk.red("--------------------"));
            var rainbow = chalkAnimation.rainbow("log.txt updated");
            setTimeout(() => {
                rainbow.stop(); // Animation stops
            }, 3000);
        }
    });
}

var movieInfo = (variable) => {
    if (!variable) {
        variable = "Mr.Nobody"
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + variable + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, (err,response,body) => {
        if (!err & response.statusCode === 200) {
            var info = JSON.parse(body);
            var dataArray = [];
            dataArray.push({
                title: "Title: " + info.Title,
                release: "Year released: " + info.Year,
                imdbRating: "IMDB Rating: " + info.Ratings[0].Value,
                rottenTomatoes: "Rotten Tomatoes Rating: " + info.Ratings[1].Value,
                country: "Film produced in " + info.Country,
                language: "This film is in " + info.Language,
                plot: "Synopsis: " + info.Plot,
                actors: "Actors: " + info.Actors
            });
            console.log(chalk.keyword('pink')(JSON.stringify(dataArray, null, 2)));
            dataToLog(dataArray);
            console.log(chalk.red("--------------------------------"));
            var rainbow = chalkAnimation.rainbow("log.txt updated");
            setTimeout(() => {
                rainbow.stop();
            }, 3000);
        }
    })
}

var doRandom = () => {
    fs.readFile("random.txt", "utf8", (err,data) => {
        if (err) {
            return console.log(err)
        };
        var dataArray = data.split(",");
        console.log(dataArray);
        switch (dataArray[0]) {
            case "my-tweets":
            getTweets();
            break;
            case "spotify-this-song":
            getSong(dataArray[1]);
            break;
            case "movie-this":
            movieInfo(dataArray[1]);
            break;
            default:
            var glitch = chalkAnimation.glitch("The text in random.txt is indecipherable !");
            setTimeout(() => {
                glitch.stop();
            }, 3000);
        }
    })
 }
 
var dataToLog = (data) => {
    // Appends entered data to a new file named log
    for (var j = 0; j < data.length; j++) {
        fs.appendFile("log.txt", JSON.stringify(data[j], null, 2) + "\r\n", (err) => {
            if (err) {
                return console.log(err);
            }
        });
    }
}
 // Allows for multiple words to be in song/movie title
var userInput = process.argv.slice(3).join("+");
console.log(userInput)
switch (process.argv[2]) {
    case "my-tweets":
    getTweets();
    break;
    case "spotify-this-song":
    getSong(userInput);
    break;
    case "movie-this":
    movieInfo(userInput);
    break;
    case "do-what-it-says":
    doRandom();
    break;
    default:
    var pulse = chalkAnimation.neon("Enter a valid Liri command");
        setTimeout(() => {
            pulse.stop(); // Animation stops
        }, 3000);
}