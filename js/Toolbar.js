var Toolbar = (function() {
  var that = this;

  this.element = document.getElementsByClassName("toolbar")[0];

  this.element.style.display = "none";

  this.show = function(mouse) {
    that.element.style.display = "block";
    that.element.style.left = (mouse.clientX - Utils.getStyle(that.element, "width") / 2) + "px";
    that.element.style.top = (mouse.clientY - Utils.getStyle(that.element, "height") - 5) + "px";
  }

  this.hide = function() {
    that.element.style.display = "none";
  }

  this.createNewText = function(string, posX, posY) {
    console.log("Create New Text")
    var text = new Tag("div", string, {x: posX, y: posY});
    text.setStyle("padding", "5px");
    text.setAttribute("contenteditable", true);
    return text;
  }

  this.createNewImage = function(src, posX, posY) {
    console.log("Create New Image")
    var img = new Tag("img", "", {x: posX, y: posY});
    img.setStyle("padding", "5px");
    img.setAttribute("draggable", "false");
    img.setAttribute("src", src);
    return img;
  }

  return {
    show: this.show,
    hide: this.hide,
    createNewText: this.createNewText,
    createNewImage: this.createNewImage
  };
})();