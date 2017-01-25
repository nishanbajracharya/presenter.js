var Slide = function(index) {
  var that = this;

  if(!index) {
    index = 0;
  }

  this.iconElement = null;
  this.element = null;
  this.index = index;

  this.content = {};

  this.updateElements = function() {
    for(elem in this.content) {
      var tagObj = this.content[elem].tagObj;
      if(this.content[tagObj.index].tagObj.element !== null) {
        this.content[tagObj.index].tagObj.setValue(this.content[tagObj.index].tagObj.element.innerText);
      }
      this.content[tagObj.index] = tagObj.getProps();
      this.content[tagObj.index].tagObj = tagObj;
    }
  };

  this.addElement = function(tag) {
    this.content[tag.index] = tag.getProps();
    this.content[tag.index].tagObj = tag;
    this.updateElements();
  }

  this.init = (function() {
    var tag = new Tag("div", "Slide", {x: 5, y: 5});
    tag.setStyle("width", "calc(100% - 10px)");
    tag.setStyle("text-align", "left");
    tag.setAttribute("contenteditable", true);
    that.content[tag.index] = tag.getProps();
    that.content[tag.index].tagObj = tag;
    that.updateElements();
  })();

  this.notes = "Welp, this is a note : " + (this.index + 1);
};