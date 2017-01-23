var UI = (function() {
  var that = this;

  var presentationElement = null;
  var presentationContainer = null;

  this.container = document.getElementsByClassName("main-container")[0];
  this.slidesList = this.container.getElementsByClassName("slides-list")[0];
  this.slideBody = this.container.getElementsByClassName("slide-body")[0];
  this.slideNotes = this.container.getElementsByClassName("slide-notes")[0];

  var width = Utils.getStyle(this.slideBody, "width");
  var height = Utils.getStyle(this.slideBody, "height");

  this.slides = [];

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
      };

      for (var attribute in slide.content[elem].attributes) {
        e.setAttribute(attribute, slide.content[elem].attributes[attribute]);
      };

      for (var style in slide.content[elem].styles) {
        e.style[style] = slide.content[elem].styles[style];
      };

      e.style.top = slide.content[elem].position.y + "px";
      e.style.left = slide.content[elem].position.x + "px";
      slideElement.appendChild(e);
    };

    slideElement.style.width = (width * .8) + "px";
    slideElement.style.height = (width * .8 * 9 / 16) + "px";
    slideElement.style.top = ((height - width * .8 * 9 / 16) / 2) + "px";
    that.slideBody.appendChild(slideElement);

    var slideListIcon = slide.iconElement = document.createElement("div");
    slideListIcon.setAttribute("class", "slide-list-icon");
    slideListIcon.setAttribute("index", slide.index);
    slideListIcon.innerHTML = "<p>" + (slide.index + 1) + "</p>";

    that.slidesList.appendChild(slideListIcon);

  };

  var viewSlide = function(slideArray, index) {
    for (var i = 0; i < slideArray.length; i++) {
      if (slideArray[i].index === index) {
        slideArray[i].element.style.display = "block";
        slideArray[i].iconElement.className = "slide-list-icon active";
        that.slideNotes.getElementsByTagName("textarea")[0].value = slideArray[i].notes;
      } else {
        slideArray[i].element.style.display = "none";
        slideArray[i].iconElement.className = "slide-list-icon";
      };
    };
  };

  // Presentation Mode
  var startPresentation = function(slidesArray) {

    var fullscreenScale = window.screen.width / Utils.getStyle(document.getElementsByClassName("slide")[0], "width");

    presentationElement = document.getElementsByClassName("presentation")[0];
    if (!presentationElement) {
      presentationElement = document.createElement("div");
      presentationElement.setAttribute("class", "presentation");
      document.body.appendChild(presentationElement);
    };

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
    };

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
    };

  };

  var exitPresentation = function() {
    presentationElement.parentElement.removeChild(presentationElement);
  };

  var movePresentationSlide = function(index) {
    presentationContainer.style.marginLeft = (-index * Utils.getStyle(presentationElement, "width")) + "px";
  };

  return {
    createSlide: createSlide,
    viewSlide: viewSlide,
    startPresentation: startPresentation,
    exitPresentation: exitPresentation,
    movePresentationSlide: movePresentationSlide
  };

})();