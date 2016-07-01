var tplCategory = require('../templates/category.string');

SPA.defineView('category', {
	html:tplCategory,

	plugins: ['delegated', {
	    name: 'avalon',
	    options: function (vm) {
	      vm.categories = [];
	      vm.curentIndex=0;
	      vm.goods=function(index) {
			$(this).addClass('active').siblings().removeClass('active');
			vm.curentIndex=index;
		};
	    }
	}],

	init:{
		onoff:true
	},

	bindActions: {

		'hide': function(e, data) {
			this.hide();
		},
		'goodList': function(e,data){
			SPA.open(data.tag);
		}
	},

	bindEvents: {
		'beforeShow':function(){
        	var _this=this;
        	var vm=this.getVM();
        	$.ajax({
        		url:'/kaixingou99/mock/category.json',
        		//url:'api/getLivelist.php',
        		type:'get',
        		data:{
        			rtype:'refresh'
        		},
        		success:function(res){
        			vm.categories=res;
        			//console.log(res)
        		}
        	});
        },

		'show': function(){
			$('.act-color').eq(0).addClass('active');
		}
	}
});
