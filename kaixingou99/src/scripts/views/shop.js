var tplShop = require('../templates/shop.string');

SPA.defineView('shop', {
	html:tplShop,

	bindEvents: {
		'show': function () {
	      var lifenavScroll = this.widgets['store-scroll'];
	      lifenavScroll.options.scrollX = true;
	      lifenavScroll.options.scrollY = false;
	    }
	}


});	
