(function() {
  console.log("presenter.js");

  var presentationMode = false;

  var index = 0;
  var slidesArray = [];

  var anchorSelected = false;
  var selectedCount = 0;
  var selectedElement = null;
  var selectedElementAspectRatio = 1;
  var shiftKeyPressed = false;

  Preload.getData(function(data) {
    var i = 0;
    for(var slideContent in data) {
      var slide = new Slide(i);
      slide.content = data[slideContent];
      slidesArray.push(slide);
      UI.createSlide(slide);

      slide.iconElement.onclick = (function(i) {
        return function() {
          UI.viewSlide(slidesArray, i);
        };
      })(i);
      i++;
    }
    i = 0;
    UI.viewSlide(slidesArray, 0);

    clearSelectedElement();
  });
  
  /*var slide = new Slide(0);
  slidesArray.push(slide);
  UI.createSlide(slide);

  slide.iconElement.onclick = (function(i) {
    return function() {
      UI.viewSlide(slidesArray, i);
    };
  })(0);

  UI.viewSlide(slidesArray, 0);*/

  var getSlidesContent = function() {
    var content = {};
    for (var i = 0; i < slidesArray.length; i++) {
      content[i] = slidesArray[i].content;
    }
    Preload.putData(content);
  };

  UI.saveBtn.onclick = function() {
    console.log(slidesArray);
    getSlidesContent();
    console.log(slidesArray);
  };

  document.onkeydown = function(e) {
    if(e.shiftKey) {
      shiftKeyPressed = true;
    }else {
      shiftKeyPressed = false;
    }
    console.log(slidesArray);
  };

  UI.playBtn.onclick = function() {
    UI.startPresentation(slidesArray);
  };

  var clearSelectedElement = function() {
    UI.clearTextToolbar();
    for (var i = 0; i < slidesArray.length; i++) {
      var slide = slidesArray[i];
      for (var elem in slide.content) {
        slide.content[elem].selected = false;
        slide.content[elem].element.style.outline = "none";
      }
    }
    selectedElement = null;
  };

  var selectElement = function(elem) {
    clearSelectedElement();
    for (var i = 0; i < slidesArray.length; i++) {
      slide = slidesArray[i];
      for (var el in slide.content) {
        if (slide.content[el].element === elem) {

          UI.setResizeAnchorPosition(slide.content[el].element);
          UI.setDeleteElementPosition(slide.content[el].element);

          slide.content[el].selected = true;
          slide.content[el].element.style.outline = "1px solid #49c";
          UI.setTextToolbarProps(elem);
          selectedElement = slide.content[el];
        }
      }
    }
  };

  UI.newSlideBtn.onclick = function() {
    var slide = new Slide(slidesArray.length);
    slidesArray.push(slide);
    UI.createSlide(slide);

    slide.iconElement.onclick = (function(i) {
      return function() {
        UI.viewSlide(slidesArray, i);
      };
    })(slidesArray.length - 1);

    UI.viewSlide(slidesArray, slidesArray.length - 1);
  };

  document.addEventListener("keyup", function(e) {
    /**
     * KeyCodes :
     * 37 = Left Arrow, 39 = Right Arrow, 32 = Space, 13 = Enter, 27 = Escape
     */

     if (presentationMode) {
      if (e.keyCode === 37) {
        index--;
        if (index < 0) {
          index = 0;
        }
      }

      if (e.keyCode === 39 || e.keyCode === 32) {
        index++;
        if (index > slidesArray.length - 1) {
          index = slidesArray.length - 1;
        }
      }
      UI.movePresentationSlide(index);
    } else {

    }
  });

  document.addEventListener("mouseup", function(e) {
    selectedCount = 0;
    for (var slide in slidesArray) {
      slidesArray[slide].updateElements();
      if (!UI.headerToolbar.contains(e.target)) {
        var slideContent = slidesArray[slide].content;
        for (var el in slideContent) {
          if (slideContent[el].element === e.target) {
            selectedCount++;
            selectElement(e.target);
          }
        }
      }
    }
    if (selectedCount === 0) {
      if (!UI.headerToolbar.contains(e.target)) {
        clearSelectedElement();
      }
    }
    if (e.which === 3) {
      Toolbar.show(e);
    } else {
      Toolbar.hide();
    }
  });

  //Bold
  UI.textToolbars[0].onclick = function() {
    if (selectedElement) {
      if (selectedElement.element.style.fontWeight === "bolder") {
        selectedElement.element.style.fontWeight = "normal";
        TagOperation.setStyle(selectedElement, "font-weight", "normal");
        this.classList.remove("active");
      } else {
        selectedElement.element.style.fontWeight = "bolder";
        TagOperation.setStyle(selectedElement, "font-weight", "bolder");
        this.classList.add("active");
      }
    }
  };

  //Italics
  UI.textToolbars[1].onclick = function() {
    if (selectedElement) {
      if (selectedElement.element.style.fontStyle === "italic") {
        selectedElement.element.style.fontStyle = "normal";
        TagOperation.setStyle(selectedElement, "font-style", "normal");
        this.classList.remove("active");
      } else {
        selectedElement.element.style.fontStyle = "italic";
        TagOperation.setStyle(selectedElement, "font-style", "italic");
        this.classList.add("active");
      }
    }
  };

  //Underline
  UI.textToolbars[2].onclick = function() {
    if (selectedElement) {
      if (selectedElement.element.style.textDecoration === "underline") {
        selectedElement.element.style.textDecoration = "none";
        TagOperation.setStyle(selectedElement, "text-decoration", "none");
        this.classList.remove("active");
      } else {
        selectedElement.element.style.textDecoration = "underline";
        TagOperation.setStyle(selectedElement, "text-decoration", "underline");
        this.classList.add("active");
      }
    }
  };

  // Align Left
  UI.textToolbars[3].onclick = function() {
    if (selectedElement) {
      selectedElement.element.style.textAlign = "left";
      TagOperation.setStyle(selectedElement, "text-align", "left");
      this.classList.add("active");
      UI.textToolbars[4].classList.remove("active");
      UI.textToolbars[5].classList.remove("active");
      UI.textToolbars[6].classList.remove("active");
    }
  };

  // Align Center
  UI.textToolbars[4].onclick = function() {
    if (selectedElement) {
      selectedElement.element.style.textAlign = "center";
      TagOperation.setStyle(selectedElement, "text-align", "center");
      this.classList.add("active");
      UI.textToolbars[3].classList.remove("active");
      UI.textToolbars[5].classList.remove("active");
      UI.textToolbars[6].classList.remove("active");
    }
  };

  // Align Right
  UI.textToolbars[5].onclick = function() {
    if (selectedElement) {
      selectedElement.element.style.textAlign = "right";
      TagOperation.setStyle(selectedElement, "text-align", "right");
      this.classList.add("active");
      UI.textToolbars[3].classList.remove("active");
      UI.textToolbars[4].classList.remove("active");
      UI.textToolbars[6].classList.remove("active");
    }
  };

  // Align Right
  UI.textToolbars[6].onclick = function() {
    if (selectedElement) {
      selectedElement.element.style.textAlign = "justify";
      TagOperation.setStyle(selectedElement, "text-align", "justify");
      this.classList.add("active");
      UI.textToolbars[3].classList.remove("active");
      UI.textToolbars[4].classList.remove("active");
      UI.textToolbars[5].classList.remove("active");
    }
  };

  UI.textToolbars[7].onclick = function(e) {
    if (selectedElement) {
      selectedElement.element.style.fontFamily = e.target.getAttribute("data-name");
      TagOperation.setStyle(selectedElement, "font-family", e.target.getAttribute("data-name"));
    }
  };

  UI.textToolbars[8].getElementsByTagName("input")[0].onkeyup = function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
    if (parseInt(this.value) > 70) {
      this.value = 70;
    }
    if (this.value === "") {
      this.value = 0;
    }
    this.value = parseInt(this.value);

    if (e.keyCode === 13) {
      if (selectedElement) {
        selectedElement.element.style.fontSize = this.value + "px";
        TagOperation.setStyle(selectedElement, "font-size", this.value + "px");
      }
    }
  };

  Toolbar.canvas.onmousedown = function(e) {
    var posX = e.clientX - this.getBoundingClientRect().left;
    var posY = e.clientY - this.getBoundingClientRect().top;
    var imgData = Toolbar.canvasContext.getImageData(posX, posY, 1, 1);
    UI.textToolbars[9].getElementsByClassName("fa-pencil")[0].style.color = "rgb(" + imgData.data[0] + "," + imgData.data[1] + "," + imgData.data[2] + ")";

    if(selectedElement) {
      selectedElement.element.style.color = UI.textToolbars[9].getElementsByClassName("fa-pencil")[0].style.color;
      TagOperation.setStyle(selectedElement, "color", UI.textToolbars[9].getElementsByClassName("fa-pencil")[0].style.color);
    }

  };

  Toolbar.bgCanvas.onmousedown = function(e) {
    var posX = e.clientX - this.getBoundingClientRect().left;
    var posY = e.clientY - this.getBoundingClientRect().top;
    var imgData = Toolbar.bgCanvasContext.getImageData(posX, posY, 1, 1);
    UI.textToolbars[10].getElementsByClassName("fa-paint-brush")[0].style.color = "rgb(" + imgData.data[0] + "," + imgData.data[1] + "," + imgData.data[2] + ")";

    if(selectedElement) {
      selectedElement.element.style.background = UI.textToolbars[10].getElementsByClassName("fa-paint-brush")[0].style.color;
      TagOperation.setStyle(selectedElement, "background", UI.textToolbars[10].getElementsByClassName("fa-paint-brush")[0].style.color);
    }

  };

  UI.textToolbars[10].getElementsByClassName("font-bg-clear-btn")[0].onmousedown = function() {

    if(selectedElement) {
      selectedElement.element.style.background = "none";
      TagOperation.setStyle(selectedElement, "background", "none");
      UI.textToolbars[10].getElementsByClassName("fa-paint-brush")[0].style.color = "#444";
    }
  };

  var fullscreenHandler = function() {
    console.log(presentationMode);
    index = 0;
    if (presentationMode) {
      presentationMode = false;
      UI.exitPresentation();
    } else {
      presentationMode = true;
    }
  };

  document.addEventListener('webkitfullscreenchange', fullscreenHandler, false);
  document.addEventListener('mozfullscreenchange', fullscreenHandler, false);
  document.addEventListener('fullscreenchange', fullscreenHandler, false);
  document.addEventListener('MSFullscreenChange', fullscreenHandler, false);

  //Create New Elements
  UI.toolbar.getElementsByClassName("toolbar-text")[0].onclick = function(e) {
    var slideIndex = UI.getCurrentSlideIndex();
    var pos = UI.getRelativePosition(slidesArray, e);
    slidesArray[slideIndex].addElement(Toolbar.createNewText("New Text", pos.posX, pos.posY));

    UI.updateSlide(slidesArray, slideIndex);
  };

  UI.toolbar.getElementsByClassName("toolbar-img-input")[0].onchange = function(e) {
    var path = (window.URL || window.webkitURL).createObjectURL(this.files[0]);
    var slideIndex = UI.getCurrentSlideIndex();
    var pos = UI.getRelativePosition(slidesArray, e);
    slidesArray[slideIndex].addElement(Toolbar.createNewImage(path, pos.posX, pos.posY));

    UI.updateSlide(slidesArray, slideIndex);
    this.files[0] = null;
  };

  UI.deleteElement.onmousedown = function(e) {
    var selectedElement = null;

    for (var i = 0; i < slidesArray.length; i++) {
      var slide = slidesArray[i];
      for (var el in slide.content) {
        if (slide.content[el].selected) {
          slide.content[el].element.parentElement.removeChild(slide.content[el].element);
          delete slide.content[slide.content[el].index];
        }
      }
    }
  };

  UI.resizeAnchor.onmousedown = function(e) {
    anchorSelected = true;

    var selectedElement = null;

    for (var i = 0; i < slidesArray.length; i++) {
      var slide = slidesArray[i];
      for (var el in slide.content) {
        if (slide.content[el].selected) {
          selectedElement = slide.content[el];
        }
      }
    }

    selectedElementAspectRatio = Utils.getStyle(selectedElement.element, "width") / Utils.getStyle(selectedElement.element, "height");
  };

  document.onmousemove = function(e) {

    var selectedElement = null;

    for (var i = 0; i < slidesArray.length; i++) {
      var slide = slidesArray[i];
      for (var el in slide.content) {
        if (slide.content[el].selected) {
          selectedElement = slide.content[el];
        }
      }
    }

    if (anchorSelected) {
      UI.resizeAnchor.style.top = (e.clientY - UI.slideBody.getBoundingClientRect().top - 4) + "px";
      UI.resizeAnchor.style.left = (e.clientX - UI.slideBody.getBoundingClientRect().left - 4) + "px";
      selectedElement.element.style.width = (parseFloat(UI.resizeAnchor.style.left) + 4 - parseFloat(selectedElement.element.style.left) - Utils.getStyle(selectedElement.element.parentElement, "margin-left")) + "px";
      
      if(shiftKeyPressed) {
        selectedElement.element.style.height = (parseFloat(selectedElement.element.style.width) / selectedElementAspectRatio) + "px";
      }else {
        selectedElement.element.style.height = (parseFloat(UI.resizeAnchor.style.top) + 4 - parseFloat(selectedElement.element.style.top) - Utils.getStyle(selectedElement.element.parentElement, "top")) + "px";
      }

      TagOperation.setStyle(selectedElement, "width", selectedElement.element.style.width);
      TagOperation.setStyle(selectedElement, "height", selectedElement.element.style.height);

      UI.setDeleteElementPosition(selectedElement.element);
    }
  };

  document.onmouseup = function() {
    anchorSelected = false;

    for (var i = 0; i < slidesArray.length; i++) {
      var slide = slidesArray[i];
      for (var el in slide.content) {
        if (slide.content[el].selected) {
          selectedCount++;
        }
      }
    }

    if (selectedCount === 0) {
      UI.resizeAnchor.style.display = "none";
      UI.deleteElement.style.display = "none";
    }
  };
})();