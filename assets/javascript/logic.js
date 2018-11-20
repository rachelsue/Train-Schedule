  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDY8S8laqlCy07RrbNZO6FqgsRBsGog960",
    authDomain: "train-schedule-fc318.firebaseapp.com",
    databaseURL: "https://train-schedule-fc318.firebaseio.com",
    projectId: "train-schedule-fc318",
    storageBucket: "train-schedule-fc318.appspot.com",
    messagingSenderId: "432724105735"
  };
  firebase.initializeApp(config);


  const date = moment();
  var database = firebase.database();

  $("#submitBtn").click(function(){
    event.preventDefault();

    var name = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var earliestTrain = $("#earliestTrain").val().trim();
    var frequency = $("#frequency").val().trim();

            database.ref("/trains").push({
            name: name,
            destination: destination,
            time: earliestTrain,
            frequency: frequency,

        });


  });

  database.ref("/trains").on("child_added", function(snapshot) {

    event.preventDefault();

     console.log(snapshot.val());
     console.log(snapshot.val().name);
     console.log(snapshot.val().destination);
     console.log(snapshot.val().frequency);
     console.log(snapshot.val().time);
     
     let timeDiff = moment().diff(moment(snapshot.val().time, "minutes"));
     let remainder = timeDiff % (snapshot.val().frequency);
  //math for minutes left and arrival time
     minutes = (snapshot.val().frequency) - remainder;
     arrival = moment().add(minutes, "m").format("hh:mm A");
     
     console.log(moment());

     var newRow = $("<tr>");
     var newName = $("<td>");
     var newDestination = $("<td>");
     var newFrequency = $("<td>");
     var newArrival = $("<td>");
     var newMinutesAway = $("<td>");

     newName.text(snapshot.val().name);
     newDestination.text(snapshot.val().destination);
     newFrequency.text(snapshot.val().frequency);
     newArrival.text(arrival);
     newMinutesAway.text(minutes);

     newRow.append(newName, newDestination, newFrequency, newArrival, newMinutesAway);
     $("#tBody").append(newRow);

     console.log(newArrival);
     console.log(newMinutesAway);
  });