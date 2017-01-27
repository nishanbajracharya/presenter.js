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
  this.movable = true;

  this.index = Utils.generateIndex(8, false);

  /*
  this.setStyle = function(key, value) {
    this.styles[key] = value;
  };

  this.setAttribute = function(key, value) {
    this.attributes[key] = value;
  };

  this.setValue = function(string) {
    this.value = string;
  };

  this.initMove = function(container){

    var posX = 0;
    var posY = 0;
    var movingElementFlag = false;

    that.element.addEventListener("mousedown", function(e) {
      posX = e.clientX - that.element.getBoundingClientRect().left + document.documentElement.scrollLeft;
      posY = e.clientY - that.element.getBoundingClientRect().top + document.documentElement.scrollTop;
      movingElementFlag = true;
    });

    document.addEventListener("mouseup", function(e) {
      document.body.style.cursor = "default";
      if(movingElementFlag){
        that.position = {
          x: that.element.getBoundingClientRect().left - that.element.parentElement.getBoundingClientRect().left,
          y: that.element.getBoundingClientRect().top  - that.element.parentElement.getBoundingClientRect().top
        };
      }
      movingElementFlag = false;
    });

    document.addEventListener("mousemove", function(e) {
      if(movingElementFlag) {
        var parentContainerPosition = {
          x: that.element.parentElement.getBoundingClientRect().left + document.documentElement.scrollLeft,
          y: that.element.parentElement.getBoundingClientRect().top + document.documentElement.scrollTop
        };
        document.body.style.cursor = "move";
        that.element.style.left = (e.clientX - parentContainerPosition.x - posX) + "px";
        that.element.style.top = (e.clientY - parentContainerPosition.y - posY) + "px";
        UI.setResizeAnchorPosition(that.element);
        UI.setDeleteElementPosition(that.element);
      }
    });
  };
  */
};