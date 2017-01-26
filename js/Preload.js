var Preload = (function() {

  var database = firebase.database();

  var getData = function(func) {
    var ref = database.ref();
    ref.once("value", function(snapshot) {
      //console.log(snapshot.val());
      return func(snapshot.val().content);
    }, function(error) {
      //console.log("No data", error);
      return func(false);
    })
  }

  var putData = function(data) {
    console.log(data);
    var ref = database.ref("content");
    ref.set(data);
  }

  return {
    getData: getData,
    putData: putData
  }
})();