var Toolbar = (function() {
  console.log("Toolbar");

  var that = this;

  this.element = document.getElementsByClassName("toolbar")[0];

  this.element.style.display = "none";

  this.show = function(mouse) {
    that.element.style.display = "block";
    that.element.style.left = (mouse.clientX - Utils.getStyle(that.element, "width") / 2) + "px";
    that.element.style.top = (mouse.clientY - Utils.getStyle(that.element, "height") - 5) + "px";
  };

  this.hide = function() {
    that.element.style.display = "none";
  };

  this.createNewText = function(string, posX, posY) {
    console.log("Create New Text Box")
    var text = new Tag("div", string, {x: posX, y: posY});
    TagOperation.setStyle(text, "padding", "10px");
    TagOperation.setStyle(text, "text-align", "left");
    TagOperation.setStyle(text, "font-size", UI.textToolbars[8].getElementsByTagName("input")[0].value + "px");
    TagOperation.setStyle(text, "color", UI.textToolbars[9].getElementsByClassName("fa-pencil")[0].style.color);
    TagOperation.setStyle(text, "width", "calc(50% - 20px)");
    TagOperation.setAttribute(text, "contenteditable", true);
    return text;
  };

  this.createNewImage = function(fileData, posX, posY) {
    console.log("Create New Image")
    var img = new Tag("img", "", {x: posX, y: posY});

    img.fileData = fileData;
    TagOperation.setStyle(img, "padding", "5px");
    TagOperation.setStyle(img, "text-align", "left");
    TagOperation.setAttribute(img, "draggable", "false");
    TagOperation.setStyle(img, "width", "calc(50% - 10px)");
    TagOperation.getImageSrc(img);
    return img;
  };

  var canvas = document.getElementsByClassName("color-bar")[0];
  var ctx = canvas.getContext('2d');

  var colorBar = new Image();
  colorBar.src="images/color-picker.png";

  var bgCanvas = document.getElementsByClassName("color-bar")[1];
  var bgCtx = bgCanvas.getContext('2d');

  colorBar.onload = function() {
    ctx.drawImage(colorBar, 0, 0, 200, 200);
    bgCtx.drawImage(colorBar, 0, 0, 200, 200);
  };

  return {
    canvas: canvas,
    canvasContext: ctx,
    bgCanvas: bgCanvas,
    bgCanvasContext: bgCtx,
    show: this.show,
    hide: this.hide,
    createNewText: this.createNewText,
    createNewImage: this.createNewImage
  };
})();