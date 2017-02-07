var Slide = function(index) {
  //console.log("Slide");

  var that = this;

  if(!index) {
    index = 0;
  }

  //console.log(index);

  this.iconElement = null;
  this.element = null;
  this.deleteBtn = null;
  this.index = index;

  this.content = {};

  this.updateElements = function() {
    for(var elem in this.content) {
      if(this.content[elem].element !== null) {
        TagOperation.setValue(this.content[elem], this.content[elem].element.innerHTML);
      }
    }
  };

  this.addElement = function(tag) {
    this.content[tag.index] = tag;
    this.updateElements();
  };

  this.init = (function() {
    var tag = new Tag("div", "Slide", {x: 0, y: 0});
    TagOperation.setStyle(tag, "width", "100%");
    TagOperation.setStyle(tag, "text-align", "left");
    TagOperation.setAttribute(tag, "contenteditable", true);
    that.content[tag.index] = tag;
    that.updateElements();
  })();

  this.notes = "Welp, this is a note : " + (this.index + 1);
};