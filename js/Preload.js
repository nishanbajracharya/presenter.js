var Preload = (function() {

  var database = firebase.database();

  var getData = function(func, err) {
    var ref = database.ref();
    ref.once("value", function(snapshot) {
      //console.log(snapshot.val());
      return func(snapshot.val().store.content, snapshot.val().store.theme);
    }, function(error) {
      //console.log("No data", error);
      return err(false);
    })
  }

  var putData = function(data, theme) {
    var dataset = {
      content: data,
      theme: theme
    }
    console.log(dataset);
    var ref = database.ref("store");
    ref.set(dataset);
  }

  return {
    getData: getData,
    putData: putData
  }
})();