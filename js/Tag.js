var Tag = function(tag, value, position, attributes, styles) {
  var that = this;

  if(!tag) {
    tag = "div";
  };

  if(!value) {
    value = "";
  };

  if(!position) {
    position = {
      x: 0,
      y: 0
    }
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

  this.element = null;

  this.index = Utils.generateIndex(8, false);
  this.props = {
    tag: this.tag,
  };

  this.updateProps = function() {
    this.props.value = this.value;
    this.props.position = this.position;
    this.props.styles = this.styles;
    this.props.attributes = this.attributes;
  };

  this.getProps = function() {
    this.updateProps();
    return this.props;
  };

  this.setProps = function(key, value) {
    this.props[key] = value;
  };

  this.setStyle = function(key, value) {
    this.styles[key] = value;
  };

  this.setAttribute = function(key, value) {
    this.attributes[key] = value;
  };

  this.initMove = function(container){

    var posX = 0;
    var posY = 0;
    var movingElementFlag = false;
    var containerPosition = container.getBoundingClientRect();

    that.element.addEventListener("mousedown", function(e) {
      posX = e.clientX - that.element.getBoundingClientRect().left + document.documentElement.scrollLeft;
      posY = e.clientY - that.element.getBoundingClientRect().top + document.documentElement.scrollTop
      movingElementFlag = true;
    });

    document.addEventListener("mouseup", function(e) {
      document.body.style.cursor = "default";
      if(movingElementFlag){
        that.position = {
          x: that.element.getBoundingClientRect().left - that.element.parentElement.getBoundingClientRect().left,
          y: that.element.getBoundingClientRect().top  - that.element.parentElement.getBoundingClientRect().top
        }
        console.log(that, that.position);
      }
      movingElementFlag = false;
    });

    document.addEventListener("mousemove", function(e) {
      if(movingElementFlag) {
        var parentContainerPosition = {
          x: that.element.parentElement.getBoundingClientRect().left + document.documentElement.scrollLeft,
          y: that.element.parentElement.getBoundingClientRect().top + document.documentElement.scrollTop
        }
        //console.log(that.element.parentElement, parentContainerPosition);
        document.body.style.cursor = "move";
        that.element.style.left = (e.clientX - parentContainerPosition.x - posX) + "px";
        that.element.style.top = (e.clientY - parentContainerPosition.y - posY) + "px";
      }
    });

  };
};