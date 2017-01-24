(function() {
  var presentationMode = false;

  var toolbar = document.getElementsByClassName("toolbar")[0];

  var textToolbar = document.getElementsByClassName("text-toolbar")[0];

  var index = 0;
  var slidesArray = [];


  var textToolbars = document.getElementsByClassName("header-toolbar-icon");

  /*for (var i = 0; i < 3; i++) {
    var slide = new Slide(i);
    slidesArray.push(slide);
    UI.createSlide(slide);

    slide.iconElement.onclick = (function(i) {
      return function() {
        UI.viewSlide(slidesArray, i);
      }
    })(i);
  };*/

  var selectedCount = 0;

  var slide = new Slide(0);
  slidesArray.push(slide);
  UI.createSlide(slide);

  slide.iconElement.onclick = (function(i) {
    return function() {
      UI.viewSlide(slidesArray, i);
    }
  })(0);

  UI.viewSlide(slidesArray, 0);

  document.getElementsByClassName("header-play-btn")[0].onclick = function() {
    UI.startPresentation(slidesArray);
  }

  var clearSelectedElement = function() {
    textToolbars[0].classList.remove("active");
    textToolbars[1].classList.remove("active");
    textToolbars[2].classList.remove("active");
    console.log("clear");
    for(var i = 0; i < slidesArray.length; i++) {
      var slide = slidesArray[i];
      for(var elem in slide.content) {
        slide.content[elem].tagObj.selected = false;
        slide.content[elem].tagObj.element.style.outline = "none";
      }
    }
  }

  clearSelectedElement();

  var selectElement = function(elem) {
    clearSelectedElement();
    for(var i = 0; i < slidesArray.length; i++) {
      slide = slidesArray[i];
      for(var el in slide.content) {
        if(slide.content[el].tagObj.element === elem) {
          console.log("finally")
          slide.content[el].tagObj.selected = true;
          slide.content[el].tagObj.element.style.outline = "1px solid #49c";
          if(elem.style.fontWeight === "bolder") {
            textToolbars[0].classList.add("active");
          }else {
            textToolbars[0].classList.remove("active");
          }
          if(elem.style.fontStyle === "italic") {
            textToolbars[1].classList.add("active");
          }else {
            textToolbars[1].classList.remove("active");
          }
          if(elem.style.textDecoration === "underline") {
            textToolbars[2].classList.add("active");
          }else {
            textToolbars[2].classList.remove("active");
          }
        }
      }
    }
  }

  document.getElementsByClassName("header-new-slide-btn")[0].onclick = function() {
    var slide = new Slide(slidesArray.length);
    slidesArray.push(slide);
    UI.createSlide(slide);

    slide.iconElement.onclick = (function(i) {
      return function() {
        UI.viewSlide(slidesArray, i);
      }
    })(slidesArray.length - 1);

    UI.viewSlide(slidesArray, slidesArray.length - 1);
  }

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
        };
      };

      if (e.keyCode === 39 || e.keyCode === 32) {
        index++;
        if (index > slidesArray.length - 1) {
          index = slidesArray.length - 1;
        };
      };
      UI.movePresentationSlide(index);
    } else {
      /*if (e.keyCode === 13) {
        UI.startPresentation(slidesArray);
      };*/
      //UI.viewSlide(slidesArray, index);
      //
      
    };
  });

  document.addEventListener("mouseup", function(e) {
    selectedCount = 0;
    for(var slide in slidesArray) {
      slidesArray[slide].updateElements();
      if(!document.getElementsByClassName("header-toolbar")[0].contains(e.target)){
        var slideContent = slidesArray[slide].content;
        for(var el in slideContent) {
          if(slideContent[el].tagObj.element === e.target) {
            console.log("yes")
            selectedCount++;
            selectElement(e.target);
          }
        }
      }else {
        console.log("workd")
      }
    };
    console.log(selectedCount);
    if(selectedCount === 0) {

      if(!document.getElementsByClassName("header-toolbar")[0].contains(e.target)){

        clearSelectedElement();
      }
    }
    //console.log(e);
    if(e.which === 3) {
      Toolbar.show(e);
    }else {
      Toolbar.hide();
    }

    //console.log(e.target);

  });

  textToolbars[0].onclick = function() {
    var selectedElement = null;
    for(var i = 0; i < slidesArray.length; i++) {
      var slide = slidesArray[i];
      for(var elem in slide.content) {
        if(slide.content[elem].tagObj.selected) {
          selectedElement = slide.content[elem].tagObj;
        }
      } 
    }
    if(selectedElement) {
      console.log(selectedElement);
      if(selectedElement.element.style.fontWeight === "bolder") {
        selectedElement.element.style.fontWeight = "normal";
        selectedElement.setStyle("font-weight", "normal");
        this.classList.remove("active");
      }else {
        selectedElement.element.style.fontWeight = "bolder";
        selectedElement.setStyle("font-weight", "bolder");
        this.classList.add("active");
      }
    }
  }

  textToolbars[1].onclick = function() {
    var selectedElement = null;
    for(var i = 0; i < slidesArray.length; i++) {
      var slide = slidesArray[i];
      for(var elem in slide.content) {
        if(slide.content[elem].tagObj.selected) {
          selectedElement = slide.content[elem].tagObj;
        }
      } 
    }
    if(selectedElement) {
      console.log(selectedElement);
      if(selectedElement.element.style.fontStyle === "italic") {
        selectedElement.element.style.fontStyle = "normal";
        selectedElement.setStyle("font-style", "normal");
        this.classList.remove("active");
      }else {
        selectedElement.element.style.fontStyle = "italic";
        selectedElement.setStyle("font-style", "italic");
        this.classList.add("active");
      }
    }
  }

  textToolbars[2].onclick = function() {
    var selectedElement = null;
    for(var i = 0; i < slidesArray.length; i++) {
      var slide = slidesArray[i];
      for(var elem in slide.content) {
        if(slide.content[elem].tagObj.selected) {
          selectedElement = slide.content[elem].tagObj;
        }
      } 
    }
    if(selectedElement) {
      console.log(selectedElement);
      if(selectedElement.element.style.textDecoration === "underline") {
        selectedElement.element.style.textDecoration = "none";
        selectedElement.setStyle("text-decoration", "none");
        this.classList.remove("active");
      }else {
        selectedElement.element.style.textDecoration = "underline";
        selectedElement.setStyle("text-decoration", "underline");
        this.classList.add("active");
      }
    }
  }

  var fullscreenHandler = function() {
    console.log(presentationMode);
    index = 0;
    if (presentationMode) {
      presentationMode = false;
      UI.exitPresentation();
    } else {
      presentationMode = true;
    };
  };

  document.addEventListener('webkitfullscreenchange', fullscreenHandler, false);
  document.addEventListener('mozfullscreenchange', fullscreenHandler, false);
  document.addEventListener('fullscreenchange', fullscreenHandler, false);
  document.addEventListener('MSFullscreenChange', fullscreenHandler, false);

  //Create New Elements
  toolbar.getElementsByClassName("toolbar-text")[0].onclick = function(e) {
    //console.log(index, slidesArray[index]);
    var slideIndex = UI.getCurrentSlideIndex();
    var pos = UI.getRelativePosition(slidesArray, e);
    slidesArray[slideIndex].addElement(Toolbar.createNewText("New Text", pos.posX, pos.posY));
    
    UI.updateSlide(slidesArray, slideIndex);
  }

  toolbar.getElementsByClassName("toolbar-img-input")[0].onchange = function(e) {
    console.log(this.files[0]);
    var path = (window.URL || window.webkitURL).createObjectURL(this.files[0]);
    console.log(path);
    //console.log(index, slidesArray[index]);
    var slideIndex = UI.getCurrentSlideIndex();
    var pos = UI.getRelativePosition(slidesArray, e);
    slidesArray[slideIndex].addElement(Toolbar.createNewImage(path, pos.posX, pos.posY));
    
    UI.updateSlide(slidesArray, slideIndex);
  }
})();