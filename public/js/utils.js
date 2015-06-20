var $ = require('jquery');

module.exports = new Utils();

function Utils () {
	this.masonryContainer = $("#masonry-container")
};

Utils.prototype.addHtml = function (html) {
	var self = this;
	var originalItemsLength = $("#masonry-container .item").length;
	self.masonryContainer.append(html);
	if (originalItemsLength > 0) {
		var items = $("#masonry-container .item");
		items = shuffle(items);
		self.masonryContainer.html('');
		self.masonryContainer.append(items);
	}

	var grid = new Masonry('.collage', {
		itemSelector: '.item',
		columnWidth: 95
	});
}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
