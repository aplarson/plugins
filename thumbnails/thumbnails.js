$.Thumbnail = function (el) {
  this.$el = $(el);
  this.gutterIdx = 0;
  this.$images = $(this.$el.find('.gutter-images').children('img'));
  this.$gutter = $(this.$el.find('.gutter-images'));
  fillGutterImages.call(this);
  this.activate(this.$images.eq(0))
  this.$activeImg = this.$images.eq(0);
  this.$gutter.on('click', 'img', activateThumbnail.bind(this));
  this.$gutter.on('mouseenter', 'img', bringUpImage.bind(this));
  this.$gutter.on('mouseleave', 'img', restoreImage.bind(this));
  $(this.$el.find('.gutter')).on('click', '.nav', function (event) {
    var len = this.$images.length
    if ($(event.currentTarget).hasClass('right')) {
      this.gutterIdx = ((this.gutterIdx + 1) % (len))
    } else {
      this.gutterIdx = ((this.gutterIdx + len - 1) % (len))
    }
    fillGutterImages.call(this)
  }.bind(this))
};

function activateThumbnail(event) {
  var $newActive = $(event.currentTarget)
  this.activate($newActive)
  this.$activeImg = $newActive;
}

function bringUpImage(event) {
  this.activate($(event.currentTarget));
}

function restoreImage(event) {
  this.activate(this.$activeImg);
}

function fillGutterImages() {
  var gutterIdx = this.gutterIdx
  var $gutter = this.$gutter
  $gutter.empty();
  for(var i = gutterIdx; i < (gutterIdx + 5); i++) {
    var imgIdx = i % this.$images.length
    this.$images.eq(imgIdx).clone().appendTo($gutter)
  }
}

$.Thumbnail.prototype.activate = function ($img) {
  $('.active').empty();
  $img.clone().appendTo('.active')
}

$.fn.thumbnail = function () {
  return this.each(function () {
    new $.Thumbnail(this);
  });
};
