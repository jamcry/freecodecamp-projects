exports.isValidUrl = (url) => {
  var expression = /\b(https?):\/\/[\-A-Za-z0-9+&@#\/%?=~_|!:,.;]*[\-A-Za-z0-9+&@#\/%=~_|]/;
  var regex = new RegExp(expression);
  return url.match(regex);
};