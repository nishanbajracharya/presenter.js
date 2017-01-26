var TagOperation = (function() {

  this.setStyle = function(tag, key, value) {
    tag.styles[key] = value;
  };

  this.setAttribute = function(tag, key, value) {
    tag.attributes[key] = value;
  };

  this.setValue = function(tag, string) {
    tag.value = string;
  };

  this.initMove = function(tag, container){

    var posX = 0;
    var posY = 0;
    var movingElementFlag = false;

    tag.element.addEventListener("mousedown", function(e) {
      posX = e.clientX - tag.element.getBoundingClientRect().left + document.documentElement.scrollLeft;
      posY = e.clientY - tag.element.getBoundingClientRect().top + document.documentElement.scrollTop;
      movingElementFlag = true;
    });

    document.addEventListener("mouseup", function(e) {
      document.body.style.cursor = "default";
      if(movingElementFlag){
        tag.position = {
          x: tag.element.getBoundingClientRect().left - tag.element.parentElement.getBoundingClientRect().left,
          y: tag.element.getBoundingClientRect().top  - tag.element.parentElement.getBoundingClientRect().top
        };
      }
      movingElementFlag = false;
    });

    document.addEventListener("mousemove", function(e) {
      if(movingElementFlag) {
        var parentContainerPosition = {
          x: tag.element.parentElement.getBoundingClientRect().left + document.documentElement.scrollLeft,
          y: tag.element.parentElement.getBoundingClientRect().top + document.documentElement.scrollTop
        };
        document.body.style.cursor = "move";
        tag.element.style.left = (e.clientX - parentContainerPosition.x - posX) + "px";
        tag.element.style.top = (e.clientY - parentContainerPosition.y - posY) + "px";
        UI.setResizeAnchorPosition(tag.element);
        UI.setDeleteElementPosition(tag.element);
      }
    });
  };

  this.getImageSrc = function(tag) {
    var fileData = tag.fileData;
    var fileType = fileData.split(";")[0].substr(5);
    var imgData = fileData.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');

    var byteCharacters = atob(imgData);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);

    var blob = new Blob([byteArray], {type: fileType});
    var path = (window.URL || window.webkitURL).createObjectURL(blob);

    tag.attributes.src = path;

  };

  return {
    setStyle: this.setStyle,
    setAttribute: this.setAttribute,
    setValue: this.setValue,
    initMove: this.initMove,
    getImageSrc: this.getImageSrc
  };

})();