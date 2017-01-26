var UI = (function() {
  console.log("UI");

  document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode === 13 && !evt.shiftKey) {
      if(evt.target.getAttribute("contenteditable") === "true") {
        evt.preventDefault();
        var caretPosition = window.getSelection().getRangeAt(0).startOffset;
        console.log(caretPosition);
        evt.target.innerHTML += "<br/><br/>";
        var range = document.createRange();
        console.log(evt.target.childNodes);

        range.setStart(evt.target.firstChild, caretPosition);
        range.setEnd(evt.target.firstChild, caretPosition);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }
    }
  };

  var that = this;

  var presentationElement = null;
  var presentationContainer = null;

  var currentSlideIndex = 0;

  var toolbar = document.getElementsByClassName("toolbar")[0];
  var textToolbars = document.getElementsByClassName("header-toolbar-icon");
  var playBtn = document.getElementsByClassName("header-play-btn")[0];
  var newSlideBtn = document.getElementsByClassName("header-new-slide-btn")[0];
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
      slide.content[elem].tagObj.element = e;
      slide.content[elem].tagObj.initMove(slideElement);
      if (slide.content[elem].value) {
        e.innerText = slide.content[elem].value;
      }

      for (var attribute in slide.content[elem].attributes) {
        e.setAttribute(attribute, slide.content[elem].attributes[attribute]);
      }

      for (var style in slide.content[elem].styles) {
        e.style[style] = slide.content[elem].styles[style];
      }

      e.style.top = slide.content[elem].position.y + "px";
      e.style.left = slide.content[elem].position.x + "px";


      slideElement.appendChild(e);
    }

    slideElement.style.width = (width * 0.8) + "px";
    slideElement.style.height = (width * 0.8 * 9 / 16) + "px";
    //slideElement.style.top = ((height - width * .8 * 9 / 16) / 2) + "px";
    slideElement.style.top = "2.5%";
    that.slideBody.appendChild(slideElement);

    var slideListIcon = slide.iconElement = document.createElement("div");
    slideListIcon.setAttribute("class", "slide-list-icon");
    slideListIcon.setAttribute("index", slide.index);
    slideListIcon.innerHTML = "<p>" + (slide.index + 1) + "</p>";

    that.slidesList.appendChild(slideListIcon);

  };

  var updateSlide = function(slidesArray, index) {
    var slide = slidesArray[index];
    var slideElement = slide.element;
    slideElement.innerHTML = "";
    for (var elem in slide.content) {
      var e = document.createElement(slide.content[elem].tag);
      slide.content[elem].tagObj.element = e;
      slide.content[elem].tagObj.initMove(slideElement);
      if (slide.content[elem].value) {
        e.innerText = slide.content[elem].value;
      }

      for (var attribute in slide.content[elem].attributes) {
        e.setAttribute(attribute, slide.content[elem].attributes[attribute]);
      }

      for (var style in slide.content[elem].styles) {
        e.style[style] = slide.content[elem].styles[style];
      }

      e.style.top = slide.content[elem].position.y + "px";
      e.style.left = slide.content[elem].position.x + "px";
      slideElement.appendChild(e);
    }
  };

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
    return {
      posX: posX,
      posY: posY
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
    textToolbars[10].getElementsByClassName("fa-paint-brush")[0].style.color = elem.style.background;
  };

  var setResizeAnchorPosition = function(elem) {
    resizeAnchor.style.left = (Utils.getStyle(elem, "left") + Utils.getStyle(elem, "width") + Utils.getStyle(elem.parentElement, "margin-left") - 4) + "px";
    resizeAnchor.style.top = (Utils.getStyle(elem, "top") + Utils.getStyle(elem, "height") + Utils.getStyle(elem.parentElement, "margin-top") + 10) + "px";
    resizeAnchor.style.display = "block";
  };

  var setDeleteElementPosition = function(elem) {
    deleteElement.style.left = (Utils.getStyle(elem, "left") + Utils.getStyle(elem, "width") + Utils.getStyle(elem.parentElement, "margin-left") - 8) + "px";
    deleteElement.style.top = (Utils.getStyle(elem, "top") + Utils.getStyle(elem.parentElement, "margin-top") + 4) + "px";
    deleteElement.style.display = "block";
  };

  var clearTextToolbar = function() {
    for(var i = 0, elem; elem = textToolbars[i]; i++) {
      elem.classList.remove("active");
    }
  };




  // Presentation Mode
  var startPresentation = function(slidesArray) {

    var fullscreenScale = window.screen.width / Utils.getStyle(document.getElementsByClassName("slide")[0], "width");

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

      presentationSlide.style.width = Utils.getStyle(presentationElement, "width") + "px";
      presentationSlide.style.height = Utils.getStyle(presentationElement, "height") + "px";
      presentationSlide.style.left = (i * Utils.getStyle(presentationElement, "width")) + "px";
      presentationSlide.style.transform = "scale(" + fullscreenScale + ")";

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
    resizeAnchor: resizeAnchor,
    deleteElement: deleteElement,
    toolbar: toolbar,
    headerToolbar: headerToolbar,

    // Builder Mode Methods
    createSlide: createSlide,
    viewSlide: viewSlide,
    updateSlide: updateSlide,
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