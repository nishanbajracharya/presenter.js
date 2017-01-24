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
    console.log("Create New")
    var text = new Tag("p", string, {x: posX, y: posY});
    text.setStyle("padding", "5px");
    text.setAttribute("contenteditable", true);
    return text;
  }

  return {
    show: this.show,
    hide: this.hide,
    createNewText: this.createNewText
  };
})();