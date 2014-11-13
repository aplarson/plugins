$.Tabs = function (el) {
  this.$el = $(el);
  var contentTabs = this.$el.data('content-tabs');
  this.$contentTabs = $(contentTabs.id);
  this.$activeLink = $('a.active')
  this.$activeTab = $('div.active');
  this.$el.on('click', 'a', $.Tabs.clickTab.bind(this));
};

$.Tabs.clickTab = function (event) {

  event.preventDefault();
  this.$activeTab.removeClass('active').addClass('transitioning');
  this.$activeLink.removeClass('active');
  var $target = $(event.currentTarget);

  this.$activeTab.one('transitionend', function () {
    this.$activeTab.removeClass('transitioning')
    this.$activeLink = $target.addClass('active');
    $new = $($target.attr('href')).addClass('active').addClass('transitioning')
    this.$activeTab = $new

    setTimeout(function () {
      $new.removeClass('transitioning')
    }, 0)

  }.bind(this))
};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};
