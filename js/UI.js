var UI = (function() {
  //console.log("UI");

  var that = this;

  var STANDARD_WIDTH = 932.8;
  var STANDARD_HEIGHT = 525;

  var presentationElement = null;
  var presentationContainer = null;

  var currentSlideIndex = 0;

  var toolbar = document.getElementsByClassName("toolbar")[0];
  var headerItems = document.getElementsByClassName("toolbar-elements")[0];
  var textToolbars = document.getElementsByClassName("header-toolbar-icon");
  var playBtn = document.getElementsByClassName("header-play-btn")[0];
  var newSlideBtn = document.getElementsByClassName("header-new-slide-btn")[0];
  var saveBtn = document.getElementsByClassName("header-save-btn")[0];
  var resizeAnchor = document.getElementsByClassName("resize-anchor")[0];
  var deleteElement = document.getElementsByClassName("delete-element")[0];
  var headerToolbar = document.getElementsByClassName("header-toolbar")[0];
  var colorPicker = document.getElementsByClassName("color-picker")[0];

  this.selectedElement = null;

  this.container = document.getElementsByClassName("main-container")[0];
  this.slidesList = this.container.getElementsByClassName("slides-list")[0];
  this.slideBody = this.container.getElementsByClassName("slide-body")[0];
  this.slideNotes = this.container.getElementsByClassName("slide-notes")[0];

  var width = Utils.getStyle(this.slideBody, "width");
  var height = Utils.getStyle(this.slideBody, "height");

  /*window.onresize = function() {
    width = Utils.getStyle(this.slideBody, "width");
    height = Utils.getStyle(this.slideBody, "height");
  }*/

  this.slides = [];

  var fontList = textToolbars[7].getElementsByClassName("font-list-name");
  for(var fIndex = 0, elem; elem = fontList[fIndex]; fIndex++) {
    elem.style.fontFamily = elem.getAttribute("data-name");
  }

  //Builder Mode
  var createSlide = function(slide) {
    var slideElement = document.createElement("div");
    slideElement.setAttribute("class", "slide");
    slide.element = slideElement;
    for (var elem in slide.content) {
      var e = document.createElement(slide.content[elem].tag);
      slide.content[elem].element = e;
      TagOperation.initMove(slide.content[elem], slideElement);
      TagOperation.setStyle(slide.content[elem], "z-index", slide.content[elem].zIndex);
      if (slide.content[elem].value) {
        e.innerHTML = slide.content[elem].value;
      }

      for (var attribute in slide.content[elem].attributes) {
        if(attribute !== "src") {
          e.setAttribute(attribute, slide.content[elem].attributes[attribute]);
        }
      }

      if(slide.content[elem].attributes.hasOwnProperty("src")) {
        TagOperation.getImageSrc(slide.content[elem]);
        e.setAttribute(attribute, slide.content[elem].attributes.src);
      }

      if(slide.content[elem].tag === "video") {
        TagOperation.getVideoSrc(slide.content[elem]);
        e.innerHTML = "";
        e.appendChild(slide.content[elem].videoSourceElement);
        e.setAttribute("controls", "");
      }

      for (var style in slide.content[elem].styles) {
        e.style[style] = slide.content[elem].styles[style];
      }

      e.style.top = slide.content[elem].position.y + "%";
      e.style.left = slide.content[elem].position.x + "%";

      slideElement.appendChild(e);
    }

    that.slideBody.appendChild(slideElement);

    var slideListIcon = slide.iconElement = document.createElement("div");
    slide.thumbnail = slideListIcon;
    slideListIcon.setAttribute("class", "slide-list-icon");
    slideListIcon.setAttribute("index", slide.index);
    slideListIcon.innerHTML = "<div class='delete-slide-btn'><i class='fa fa-times-circle'></i></div><div class='thumbnail'><div class='thumbnail-content'>" + slide.element.innerHTML + "</div></div>";
    slide.deleteBtn = slideListIcon.getElementsByClassName("delete-slide-btn")[0];

    that.slidesList.appendChild(slideListIcon);

  };

  var updateSlide = function(slidesArray, index) {
    var slide = slidesArray[index];
    var slideElement = slide.element;
    var editorScale = Utils.getStyle(slideElement, "width") / STANDARD_WIDTH; // Standard width of slide

    slideElement.innerHTML = "";
    for (var elem in slide.content) {
      var e = document.createElement(slide.content[elem].tag);
      slide.content[elem].element = e;
      TagOperation.initMove(slide.content[elem], slideElement);
      TagOperation.setStyle(slide.content[elem], "z-index", slide.content[elem].zIndex);
      if (slide.content[elem].value) {
        e.innerHTML = slide.content[elem].value;
      }

      for (var attribute in slide.content[elem].attributes) {
        e.setAttribute(attribute, slide.content[elem].attributes[attribute]);
      }

      for (var style in slide.content[elem].styles) {
        e.style[style] = slide.content[elem].styles[style];
      }

      if(slide.content[elem].tag === "video") {
        e.innerHTML = "";
        e.appendChild(slide.content[elem].videoSourceElement);
        e.setAttribute("controls", "");
      }
      
      e.style.top = slide.content[elem].position.y + "%";
      e.style.left = slide.content[elem].position.x + "%";

      slideElement.appendChild(e);
      slide.thumbnail.innerHTML = "<div class='delete-slide-btn'><i class='fa fa-times-circle'></i></div><div class='thumbnail'><div class='thumbnail-content'>" + slide.element.innerHTML + "</div></div>";

    }
  };

  var deleteSlide = function(slideArray, index) {
    //slidesList.removeChild(slideArray[index].iconElement);
    //slideBody.removeChild(slideArray[index].element);
    /*for(var i = index + 1; i < slideArray.length; i++) {
      slideArray[i].index--;
      slideArray[i].thumbnail.setAttribute("index", slideArray[i].index);
    }*/
  }

  var viewSlide = function(slideArray, index) {
    for (var i = 0; i < slideArray.length; i++) {
      if (slideArray[i].index === index) {
        slideArray[i].element.style.display = "block";
        slideArray[i].iconElement.className = "slide-list-icon active";
        that.slideNotes.getElementsByTagName("textarea")[0].value = slideArray[i].notes;
        currentSlideIndex = index;
      } else {
        slideArray[i].element.style.display = "none";
        slideArray[i].iconElement.className = "slide-list-icon";
      }
    }
  };

  var getCurrentSlideIndex = function() {
    return currentSlideIndex;
  };

  var getRelativePosition = function(slideArray, e) {
    var posX = e.clientX - slideArray[currentSlideIndex].element.getBoundingClientRect().left - document.documentElement.scrollLeft;
    var posY = e.clientY - slideArray[currentSlideIndex].element.getBoundingClientRect().top - document.documentElement.scrollTop;
    //console.log(posX);
    return {
      posX: posX / Utils.getStyle(this.slideBody, "width") * 100,
      posY: posY / Utils.getStyle(this.slideBody, "height") * 100
    };
  };

  var setTextToolbarProps = function(elem) {
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
    if(elem.style.textAlign === "left") {
      textToolbars[3].classList.add("active");
    }else {
      textToolbars[3].classList.remove("active");
    }
    if(elem.style.textAlign === "center") {
      textToolbars[4].classList.add("active");
    }else {
      textToolbars[4].classList.remove("active");
    }
    if(elem.style.textAlign === "right") {
      textToolbars[5].classList.add("active");
    }else {
      textToolbars[5].classList.remove("active");
    }
    if(elem.style.textAlign === "justify") {
      textToolbars[6].classList.add("active");
    }else {
      textToolbars[6].classList.remove("active");
    }
    textToolbars[8].getElementsByTagName("input")[0].value = Utils.getStyle(elem, "font-size");
    textToolbars[9].getElementsByClassName("fa-pencil")[0].style.color = elem.style.color;
    textToolbars[10].style.background = elem.style.background;


    //textToolbars[10].getElementsByClassName("fa-paint-brush")[0].style.color = Utils.getColorContrast(elem.style.background);
  };

  var setResizeAnchorPosition = function(elem) {
    var boundingRect = elem.getBoundingClientRect();
    var parentBoundingRect = elem.offsetParent.getBoundingClientRect();
    resizeAnchor.style.left = (boundingRect.left + Utils.getStyle(elem, "width") - Utils.getStyle(that.slidesList, 'width') - 4) + "px";
    resizeAnchor.style.top = (boundingRect.top + Utils.getStyle(elem, "height") - parentBoundingRect.top - 4) + "px";
    resizeAnchor.style.display = "block";
  };

  var setDeleteElementPosition = function(elem) {
    var boundingRect = elem.getBoundingClientRect();
    var parentBoundingRect = elem.offsetParent.getBoundingClientRect();
    deleteElement.style.left = (boundingRect.left + Utils.getStyle(elem, "width") - Utils.getStyle(that.slidesList, 'width') - 8) + "px";
    deleteElement.style.top = (boundingRect.top - parentBoundingRect.top - 8) + "px";
    deleteElement.style.display = "block";
  };

  var clearTextToolbar = function() {
    for(var i = 0, elem; elem = textToolbars[i]; i++) {
      elem.classList.remove("active");
    }
  };

  // Presentation Mode
  var startPresentation = function(slidesArray) {

    var fullscreenScaleX = window.screen.width / STANDARD_WIDTH;
    var fullscreenScaleY = window.screen.height / STANDARD_HEIGHT;

    presentationElement = document.getElementsByClassName("presentation")[0];
    if (!presentationElement) {
      presentationElement = document.createElement("div");
      presentationElement.setAttribute("class", "presentation");
      document.body.appendChild(presentationElement);
    }

    presentationElement.innerHTML = "";

    presentationElement.setAttribute("oncontextmenu", "return false;");

    presentationContainer = document.createElement("div");
    presentationContainer.setAttribute("class", "presentation-container");
    presentationElement.appendChild(presentationContainer);

    for (var i = 0; i < slidesArray.length; i++) {
      var presentationSlide = document.createElement("div");
      presentationSlide.setAttribute("class", "presentation-slide");
      presentationSlide.innerHTML = slidesArray[i].element.innerHTML;

      presentationSlide.style.width = STANDARD_WIDTH + "px";
      presentationSlide.style.height = STANDARD_HEIGHT + "px";
      presentationSlide.style.left = (i * Utils.getStyle(presentationElement, "width")) + "px";
      presentationSlide.style.transform = "scale(" + fullscreenScaleX + "," + fullscreenScaleY + ")";

      presentationContainer.appendChild(presentationSlide);
    }

    // Go Fullscreen
    if (presentationElement.requestFullscreen) {
      console.log("Generic Fullscreen");
      presentationElement.requestFullscreen();
    } else if (presentationElement.webkitRequestFullscreen) {
      console.log("Chrome Fullscreen");
      presentationElement.webkitRequestFullscreen();
    } else if (presentationElement.mozRequestFullScreen) {
      console.log("Firefox Fullscreen");
      presentationElement.mozRequestFullScreen();
    } else if (presentationElement.msRequestFullscreen) {
      console.log("MS Fullscreen");
      presentationElement.msRequestFullscreen();
    }

  };

  var exitPresentation = function() {
    presentationElement.parentElement.removeChild(presentationElement);
  };

  var movePresentationSlide = function(index) {
    presentationContainer.style.marginLeft = (-index * Utils.getStyle(presentationElement, "width")) + "px";
  };

  return {
    // Variables
    slideBody: this.slideBody,
    textToolbars: textToolbars,
    playBtn: playBtn,
    newSlideBtn: newSlideBtn,
    saveBtn: saveBtn,
    resizeAnchor: resizeAnchor,
    deleteElement: deleteElement,
    toolbar: toolbar,
    headerItems: headerItems,
    headerToolbar: headerToolbar,

    // Builder Mode Methods
    createSlide: createSlide,
    viewSlide: viewSlide,
    updateSlide: updateSlide,
    deleteSlide: deleteSlide,
    getCurrentSlideIndex: getCurrentSlideIndex,
    getRelativePosition: getRelativePosition,
    setTextToolbarProps: setTextToolbarProps,
    setResizeAnchorPosition: setResizeAnchorPosition,
    setDeleteElementPosition: setDeleteElementPosition,
    clearTextToolbar: clearTextToolbar,

    // Presentation Mode Methods
    startPresentation: startPresentation,
    exitPresentation: exitPresentation,
    movePresentationSlide: movePresentationSlide
  };

})();