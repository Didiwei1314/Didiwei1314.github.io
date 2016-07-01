var tplIndex = require('../templates/index.string');

SPA.defineView('index', {
		html: tplIndex,
	
		modules: [{
			name: 'content',
			views: ['home', 'search', 'my', 'cart'],
			defaultTag: 'home',
			container: '.l-container'
		}],
	
		plugins: ['delegated'],
	
		bindActions: {
			'switch-tab': function(e, data) {
				$(e.el).addClass('active').siblings().removeClass('active');
				//console.log(this.modules)
				this.modules.content.launch(data.tag);
				
			}
		}
	
});