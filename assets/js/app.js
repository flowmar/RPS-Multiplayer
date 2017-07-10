// Initialize Firebase
var config = {
  apiKey: "AIzaSyBRADtACdMmy9bQ_-4GWz2zQn831GJnksM",
  authDomain: "rps-multiplayer-20849.firebaseapp.com",
  databaseURL: "https://rps-multiplayer-20849.firebaseio.com",
  projectId: "rps-multiplayer-20849",
  storageBucket: "rps-multiplayer-20849.appspot.com",
  messagingSenderId: "426666228891"
};
firebase.initializeApp(config);

// Create a reference to the database
var database = firebase.database();

database.ref('/turn').set({
  turn: 0
});

// Declare variables
var name = "";
var playerOne = "";
var playerOneExists = false;
var playerTwo = "";
var playerTwoExists = false;
var p1wins = 0;
var p1losses = 0;
var p2wins = 0;
var p2losses = 0;
var p1choice = "";
var p2choice = "";
var turn = 0;

var turnRef = database.ref('turn');


database.ref('turn').set({
  turn: 0
});

turnRef.on("value", function(snapshot) {
  turn = snapshot.val();
})
console.log(turn);

var p1_buttons = $("<button class='btn btn-primary' id='p1rock'>Rock</button> <button class='btn btn-warning' id='p1paper'>Paper</button> <button class='btn btn-info'id='p1scissors'>Scissors</button>");

var p2_buttons = $("<button class='btn btn-primary' id='p2rock'>Rock</button> <button class='btn btn-warning' id='p2paper'>Paper</button> <button class='btn btn-info'id='p2scissors'>Scissors</button>");


// Hide Start Game Button
$("#start").hide();

//  When the play button is clicked,
$("#play").on('click', function () {

  // Prevent Default 'submit' action
  event.preventDefault();

  // If the input box is not empty...
  if ($('#nameInput').val() !== "") {

    // Place the contents of the user input into the name variable
    var name = $('#nameInput').val().trim();

    // If player one does not already exist
    if (playerOneExists === false) {

      playerOne = name;


      // Create a Player 1 Object in Firebase
      database.ref('/players/1').set({
        name: playerOne,
        wins: p1wins,
        losses: p1losses,
        choice: p1choice
      });

      // Add player 1 to the Game Board
      $('#p1name').append(name);
      $('#p1wins').append(p1wins);
      $('#p1losses').append(p1losses);
      $("#playerOne").html(p1_buttons);

      $('#announce1').text("Welcome, " + name + "!");
      $('#announce2').text("Waiting for second player...")

      playerOneExists = true;
    }

    // If player one exists and player two does not exist...
    else if (playerOneExists === true && playerTwoExists === false) {

      playerTwo = name;


      // Create a Player 2 Object in Firebase
      database.ref('/players/2').set({
        name: playerTwo,
        wins: p2wins,
        losses: p2losses,
        choice: p2choice
      });

      // Add Player 2 to the game board
      $('#p2name').append(name);
      $('#p2wins').append(p2wins);
      $('#p2losses').append(p2losses);
      $("#playerTwo").html(p2_buttons);

      $("#announce2").text("Welcome, " + playerTwo + "!");

      playerTwoExists = true;

      // Show Button that allows game to start
      $('#start').show();
    }
    // If Player One and Player Two Exist, alert an error
    else {
      alert("Game is full, try again later.")
    }
  } else {
    alert("Please enter a name.");
  }
}

);

// Begin Game Button Starts Game
$('#start').on('click', function () {
  startGame();
});

// Game Starts
function startGame() {
  $('#start').hide();
  $('#announce1').text('Let\'s Play!!');
  $('#announce2').text('');
  database.ref('turn').update({
    turn: 1
  });
  turn = 1;
  console.log(turn);
  choices();
}

turnRef.on("value", function(snapshot) {
  turn = snapshot.val();
});

function choices() {
  if (turn === 1) {
    $('#announce2').text('Player 1\'s Turn');
    // Highlight Player One's area
    $('#playerOne').css({ "border-color": "white" });
    // Functions to handle clicks on player buttons
    $(document).on('click', "#p1rock", function () {
      database.ref('players/1').update({
        choice: "rock"
      })
      p1choice = "rock";
      console.log(p1choice);
      database.ref('turn').update({
        turn:2
      });
      choices2();
    });
    $(document).on('click', "#p1paper", function () {
      database.ref('players/1').update({
        choice: "paper"
      })
      p1choice = "paper";
      console.log(p1choice);
      database.ref('turn').update({
        turn:2
      });
      choices2();
    });
    $(document).on('click', "#p1scissors", function () {
      database.ref('players/1').update({
        choice: "scissors"
      })
      p1choice = "scissors";
      console.log(p1choice);
      database.ref('turn').update({
        turn:2
      });
      choices2();
    });
  }
}

function choices2() {
  if (turn === 2) {
    $('#playerOne').css({ "border-color": "black" });
    // Highlight Player 2's area
    $('#playerTwo').css({ "border-color": "white" });

    $(document).on('click', "#p2rock", function () {
      database.ref('players/2').update({
        choice: "rock"
      })
      p2choice = "rock";
      console.log(p2choice);

    });
    $(document).on('click', "#p2paper", function () {
      database.ref('players/2').update({
        choice: "paper"
      })
      p2choice = "paper";
      console.log(p2choice);
    });
    $(document).on('click', "#p2scissors", function () {
      database.ref('players/2').update({
        choice: "scissors"
      })
      p2choice = "scissors";
      console.log(p2choice);
    });
  }}