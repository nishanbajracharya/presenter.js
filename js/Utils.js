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

  return {
    getStyle: getStyle,
    getRandomNumber: getRandomNumber,
    getRandomColor: getRandomColor
  };
})();