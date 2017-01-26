var Slide = function(index) {
  console.log("Slide");

  var that = this;

  if(!index) {
    index = 0;
  }

  this.iconElement = null;
  this.element = null;
  this.index = index;

  this.content = {};

  this.updateElements = function() {
    for(var elem in this.content) {
      if(this.content[elem].element !== null) {
        TagOperation.setValue(this.content[elem], this.content[elem].element.innerText);

      }
      //console.log(this.content[elem])
    }
  };

  this.addElement = function(tag) {
    this.content[tag.index] = tag;
    /*for(var attribute in tag.attributes) {
      tag.element.setAttribute(attribute, tag.attributes[attribute]);
    }*/
    //this.content[tag.index].tagObj = tag;
    this.updateElements();
  };

  this.init = (function() {
    var tag = new Tag("div", "Slide", {x: 5, y: 5});
    TagOperation.setStyle(tag, "width", "calc(100% - 10px)");
    TagOperation.setStyle(tag, "text-align", "left");
    TagOperation.setAttribute(tag, "contenteditable", true);
    that.content[tag.index] = tag;
    //console.log(that.content[tag.index]);
    //that.content[tag.index].tagObj = Object.create(tag);
    that.updateElements();
  })();

  this.notes = "Welp, this is a note : " + (this.index + 1);
};