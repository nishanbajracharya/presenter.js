(function() {
  var presentationMode = false;

  var index = 0;
  var slidesArray = [];
  for (var i = 0; i < 3; i++) {
    var slide = new Slide(i);
    slidesArray.push(slide);
    UI.createSlide(slide);

    slide.iconElement.onclick = (function(i) {
      return function() {
        UI.viewSlide(slidesArray, i);
      }
    })(i);
  };
  UI.viewSlide(slidesArray, 0);

  document.getElementsByClassName("header-play-btn")[0].onclick = function() {
    UI.startPresentation(slidesArray);
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
    for(var slide in slidesArray) {
      slidesArray[slide].updateElements();
    };
  });

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
})();