$.Zoomable = function (el) {
  this.$el = $(el);
  this.focusSize = 100
  this.$el.on('mousemove', 'img', showFocusBox.bind(this));
  this.$el.on('mouseleave', 'img', removeFocusBox.bind(this));
  this.$focusBox = null;
  this.$zoomBox = null;
};

function showFocusBox(event) {
  if (!this.$focusBox){
    this.$focusBox = $("<div class='focus-box'>");
    this.$focusBox.css('height', this.focusSize + 'px');
    this.$focusBox.css('width', this.focusSize + 'px');
    this.$focusBox.appendTo(this.$el);
  }
  this.$focusBox.css('top', (event.offsetY - (this.focusSize / 2)) + 'px');
  this.$focusBox.css('left', (event.offsetX - (this.focusSize / 2)) + 'px');
  showZoom.call(this, event.offsetX, event.offsetY)
}

function removeFocusBox(event){
  this.$focusBox.remove();
  this.$focusBox = null;
}

function showZoom(xDiff, yDiff) {
  if (!this.$zoomBox){
      this.$zoomBox = $("<div class='zoomed-image'>")
      this.$zoomBox.appendTo($('body'))
    }
  this.$zoomBox.attr('background-image', "'../t_rex_jet.jpg'")
  this.$zoomBox.css('background-size', '200%')
}

$.fn.zoomable = function () {
  return this.each(function () {
    new $.Zoomable(this);
  });
};
