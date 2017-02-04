var Tag = function(tag, value, position, attributes, styles) {
  var that = this;

  if(!tag) {
    tag = "div";
  }

  if(!value) {
    value = "";
  }

  if(!position) {
    position = {
      x: 0,
      y: 0
    };
  }

  if(!styles) {
    styles = {};
  }

  if(!attributes) {
    attributes = {};
  }

  this.tag = tag;
  this.value = value;
  this.position = position;
  this.styles = styles;
  this.attributes = attributes;

  this.fileData = null;
  this.element = null;
  this.toolbar = null;
  this.selected = false;
  this.movable = false;
  this.zIndex = 1;

  this.index = Utils.generateIndex(8, false);

};