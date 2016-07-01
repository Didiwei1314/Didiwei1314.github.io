var tplCart=require('../templates/search');
SPA.defineView('search',{
	html: tplCart,

	plugins: ['delegated'],

	bindActions: {
		'hide': function() {
			console.log(this);

		}
	}
});
