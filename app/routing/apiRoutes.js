var friendsData = require("../data/friends.js");


module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res) {

    var newFriend = req.body;
    var currentMatch;
    var currentDiff;
    var bestDiff;

    for (var i = 0; i < friendsData.length; i++) {
      currentDiff = 0;
      for (var j = 0; j < 10; j++) {
        currentDiff = currentDiff + Math.abs((parseInt(newFriend.scores[j]) - friendsData[i].scores[j]));
      }
      if (i === 0) {
        currentMatch = 0;
        bestDiff = currentDiff;
        console.log("identical")
      } else {
        if (currentDiff < bestDiff) {
          currentMatch = i;
          bestDiff = currentDiff;
          console.log(i + "points difference")
        }
      }
    }
    friendsData.push(newFriend);
    res.send(friendsData[currentMatch]);
  });

  app.post("/api/clear", function() {
    friendsData = [];

    console.log(friendsData);
  });
};