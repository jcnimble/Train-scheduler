$(document).ready(function () {
  // Initialize Firebase

  var config = {
    apiKey: "AIzaSyCKQ7yW3JVGINPuNaoNDT_N3nSnXJejBS0",
    authDomain: "train-scheduler-9883b.firebaseapp.com",
    databaseURL: "https://train-scheduler-9883b.firebaseio.com",
    projectId: "train-scheduler-9883b",
    storageBucket: "train-scheduler-9883b.appspot.com",
    messagingSenderId: "882754721842"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //Button for adding Employees
  $("#submit-train-btn").on("click", function (event) {

    event.preventDefault();

    //Grabs user input
    var train = $("#trainName").val();
    var dest = $("#destination").val();
    var firstTrain = $("#firstTrainTime").val();
    var freq = $("#frequency").val();
    var firstTrainFormat = "HH:mm";
    var convertedFirstTrain = moment(firstTrain, firstTrainFormat);

    //Creates local "temporary" object for holding train data
    var newTrain = {
      train: train,
      dest: dest,
      firstTrain: firstTrain,
      freq: freq
    };

    //Uploads train data to the database
    database.ref().push(newTrain);

    //Logs everything to console
    console.log(newTrain.train);
    console.log(newTrain.dest);
    console.log(newTrain.firstTrain);
    console.log(newTrain.freq);

    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");
  });

  //Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function (childSnapshot) {
    // storing the snapshot.val() in a variable for convenience
    console.log(childSnapshot.val());

    //Stores everything into a variable
    var trainName = childSnapshot.val().train;
    var trainDest = childSnapshot.val().dest;
    var trainFirst = childSnapshot.val().firstTrain;
    var trainFreq = childSnapshot.val().freq;

    // Train info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainFirst);
    console.log(trainFreq);


    //Work on time format

    //Calculate next arrival
    //Calculate minutes away

    //Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainFreq),
      $("<td>").text("Not Yet"),
      $("<td>").text("Not Yet"),
    );

    //Append the new row to the table
    $("#schedule > tbody").append(newRow);

    // Handle the errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

});