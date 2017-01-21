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
        src : "http://placehold.it/" + Utils.getRandomNumber(100, 300) + "x" + Utils.getRandomNumber(100, 300)
      },
      position : {
        x : Utils.getRandomNumber(20, 400),
        y : Utils.getRandomNumber(20, 400)
      }
    }
  };
  
  this.notes = "Welp, this is a note : " + (this.index + 1);
};