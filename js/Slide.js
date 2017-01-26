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
    }
  };

  this.addElement = function(tag) {
    this.content[tag.index] = tag;
    this.updateElements();
  };

  this.init = (function() {
    var tag = new Tag("div", "Slide", {x: 5, y: 5});
    TagOperation.setStyle(tag, "width", "calc(100% - 10px)");
    TagOperation.setStyle(tag, "text-align", "left");
    TagOperation.setAttribute(tag, "contenteditable", true);
    that.content[tag.index] = tag;
    that.updateElements();
  })();

  this.notes = "Welp, this is a note : " + (this.index + 1);
};