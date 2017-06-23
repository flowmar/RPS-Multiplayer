// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBF6rlxRpM2fcb7YkI6TwXreHmVpuXf21E",
    authDomain: "awesomeness-cc93e.firebaseapp.com",
    databaseURL: "https://awesomeness-cc93e.firebaseio.com",
    projectId: "awesomeness-cc93e",
    storageBucket: "awesomeness-cc93e.appspot.com",
    messagingSenderId: "1044603233814"
  };
  firebase.initializeApp(config);

// Declare variables
var nameinput = "";

// Constructors
function Player(name, wins, losses) = {
    this.name = name;
    this.wins = wins;
    this.losses = losses;
};

var playerOne = new Player(nameinput, );