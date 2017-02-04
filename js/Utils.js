var Utils = (function() {
  /**
   * Get a computed style of a DOM element
   * @param  {DOM Element} element The target DOM element
   * @param  {String} style   Name of style eg. width, margin-left
   * @return {Float}         Computed style value
   */
   var getStyle = function(element, style) {
    return parseFloat(window.getComputedStyle(element).getPropertyValue(style));
  };

  /**
   * Get a random number between two numbers
   * @param  {Integer} low  Lower limit of interval
   * @param  {Integer} high Upper limit of interval
   * @return {Integer}      Random number between interval
   */
   var getRandomNumber = function(low, high) {
    return Math.floor(Math.random() * (high - low + 1)) + low;
  };

  /**
   * Get a random color
   * @param {Float} opacity Opacity of color
   * @return {String} Color in rgba(r, g, b, opacity) format
   */
   var getRandomColor = function(opacity) {
    if (!opacity) {
      opacity = 1;
    }
    var R = parseInt(Math.random() * 255);
    var G = parseInt(Math.random() * 255);
    var B = parseInt(Math.random() * 255);
    var color = "rgba(" + R + "," + G + "," + B + "," + opacity + ")";
    return color;
  };

  /**
   * Generate a random index. Basically a random string generator
   * @param  {Integer} length  Length of the generated index
   * @param  {Boolean} special Flag to check whether to include special characters in generated index
   * @return {String}         A randomly generated index
   */
   var generateIndex = function(length, special) {
    var i = 0;
    var randomNumber;
    var character = "";

    if (special === undefined) {
      special = true;
    }

    while (i < length) {
      randomNumber = Math.floor((Math.random() * 100)) % 94 + 33;
      if (!special) {
        if ((randomNumber >= 33) && (randomNumber <= 47)) {
          continue;
        }
        if ((randomNumber >= 58) && (randomNumber <= 64)) {
          continue;
        }
        if ((randomNumber >= 91) && (randomNumber <= 96)) {
          continue;
        }
        if ((randomNumber >= 123) && (randomNumber <= 126)) {
          continue;
        }
      }
      if(randomNumber !== 39 || randomNumber !== 34) {
        character += String.fromCharCode(randomNumber);
        i++;
      }
    }

    return character;
  };

  /**
   * Get contrast color value of text for different background color
   * @param  {String} color Background color of format rgb(r,g,b)
   * @return {String}       "#333" or "#fff"
   */
  var getColorContrast = function(color) {
    var rgb = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/.exec(color);
    if(rgb === null) {
      return "#333";
    }
    var contrast = (parseInt(rgb[1]) * 299 + parseInt(rgb[2]) * 587 + parseInt(rgb[3]) * 114) / 1000;
    
    console.log(color, rgb, contrast);

    if(contrast > 128) {
      return "#333";
    }
    return "#fff";
  }

  return {
    getStyle: getStyle,
    getRandomNumber: getRandomNumber,
    getRandomColor: getRandomColor,
    generateIndex: generateIndex,
    getColorContrast: getColorContrast
  };
})();