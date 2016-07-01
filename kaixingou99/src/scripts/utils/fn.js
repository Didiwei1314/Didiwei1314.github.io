var Util = {
  setFocus: function (container) {
    var mySwiper = new Swiper(container, {
        loop: true,
        autoplay:2000,
        pagination: '.swiper-pagination'
    });
  }
  
  
};

module.exports = Util;
