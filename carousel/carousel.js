$.Carousel = function (el) {
  this.$el = $(el);
  this.activeIdx = 0;
  var $images = $(this.$el.children('.items').children('img'));
  $images.eq(0).addClass('active');
  this.$el.on('click', '.slide-right', slideRight.bind(this))
  this.$el.on('click', '.slide-left', slideLeft.bind(this))
};

function slideRight(event) {
  if (this.transitioning === true) {
    return;
  }
  this.transitioning = true
  var $images = $(this.$el.children('.items').children('img'));
  $old = $images.eq(this.activeIdx).addClass('right');
  this.$el.one('transitionend', function () {
    $old.removeClass('active').removeClass('right');
    this.transitioning = false
  }.bind(this))
  if (this.activeIdx === 0) {
    this.activeIdx = $images.length - 1;
  } else {
    this.activeIdx -= 1;
  }
  $new = $images.eq(this.activeIdx).addClass('active').addClass('left');
  setTimeout(function () { $new.removeClass('left')}, 0)
}

function slideLeft(event) {
  if (this.transitioning === true) {
    return;
  }
  this.transitioning = true
  var $images = $(this.$el.children('.items').children('img'));
  $old = $images.eq(this.activeIdx).addClass('left');
  this.$el.one('transitionend', function () {
    $old.removeClass('active').removeClass('left')
    this.transitioning = false
  }.bind(this))
  if (this.activeIdx === $images.length - 1) {
    this.activeIdx = 0;
  } else {
    this.activeIdx += 1;
  }
  $new = $images.eq(this.activeIdx).addClass('active').addClass('right');
  setTimeout(function () { $new.removeClass('right')}, 0)
}

$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};

