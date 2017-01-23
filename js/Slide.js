var Slide = function(index) {
  var that = this;

  if(!index) {
    index = 0;
  }

  this.iconElement = null;
  this.element = null;
  this.index = index;

  this.content = {
    0 : {
      tag: "p",
      value : this.index + 1,
      position : {
        x: 10,
        y: 10
      }
    },
    1 : {
      tag: "a",
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
    2 : {
      tag: "img",
      attributes : {
        src : "http://www.orderwise.co.uk/wp-content/uploads/2011/02/stock-control-software1-439x3241.jpg"
      },
      position : {
        x : Utils.getRandomNumber(100, 400),
        y : Utils.getRandomNumber(100, 200)
      }
    }
  };
  this.content = {};

  var h1 = new Tag("h1", "This is a h1 tag", {x: 70, y: 120});
  h1.setStyle("color", "#49c");
  this.content[h1.index] = h1.getProps();
  this.content[h1.index].tagObj = h1;

  var input = new Tag("input", "", {x: 210, y: 210});
  input.setStyle("border", "2px solid #ccc");
  input.setStyle("padding", "20px");
  input.setAttribute("placeholder", "Placeholder Here");
  this.content[input.index] = input.getProps();
  this.content[input.index].tagObj = input;

  //console.log(this.content);

  this.updateElements = function() {
    for(elem in this.content) {
      var tagObj = this.content[elem].tagObj;
      this.content[tagObj.index] = tagObj.getProps();
      this.content[tagObj.index].tagObj = tagObj;
      //this.content[elem] = this.content[elem].tagObj.getProps();
    }
    console.log(this.content);
  };

  //this.tagsArray = [h1, input];

  this.notes = "Welp, this is a note : " + (this.index + 1);
};