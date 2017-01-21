var Slide = function(index) {
  var that = this;

  if(!index) {
    index = 0;
  }

  this.iconElement = null;
  this.element = null;
  this.index = index;

  this.content = {
    p : {
      value : this.index + 1,
      position : {
        x: 10,
        y: 10
      }
    },
    a : {
      value : "Hello",
      attributes : {
        href : "#"
      },
      position : {
        x : Utils.getRandomNumber(20, 500),
        y : Utils.getRandomNumber(20, 500)
      },
      styles : {
        color : Utils.getRandomColor(),
        fontSize : Utils.getRandomNumber(16, 28) + "px"
      }
    },
    img : {
      attributes : {
        src : "http://www.orderwise.co.uk/wp-content/uploads/2011/02/stock-control-software1-439x3241.jpg"
      },
      position : {
        x : Utils.getRandomNumber(100, 400),
        y : Utils.getRandomNumber(100, 200)
      }
    }
  };

  this.notes = "Welp, this is a note : " + (this.index + 1);
};