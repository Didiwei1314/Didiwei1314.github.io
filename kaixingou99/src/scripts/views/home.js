
var tplHome = require('../templates/home.string');

//引用公共方法
var util=require('../utils/fn.js');


SPA.defineView('home', {
	html:tplHome,

	init: {
		formatData:function(arr){
			var tempArr=[];
			for(var i=0; i < Math.ceil(arr.length/2);i++){
				tempArr[i] = [];
				tempArr[i].push(arr[2*i]);
				tempArr[i].push(arr[2*i+1]);
			}
			return tempArr;
		}
	},

	modules: [{
	    name: 'content',
	    views: ['category', 'jiu', 'shop','charge'],
	    container: '.l-container'
	}],

	plugins: ['delegated', {
	    name: 'avalon',
	    options: function (vm) {
	      vm.livelist = [];
	    }
	}],

	bindEvents: {
        'beforeShow':function(){
        	var _this=this;
        	var vm=this.getVM();
        	$.ajax({
        		url:'/kaixingou99/mock/goodlist.json',
        		//url:'/api/getLivelist.php',
        		type:'get',
        		data:{
        			rtype:'refresh'
        		},
        		success:function(res){
        			vm.livelist=_this.formatData(res);
        		}
        	});
        },
	    'show': function () {
	    	util.setFocus('.swiper-container');
	    }
    },

	bindActions: {
	  	'snav-tab':function(e,data){
			SPA.open(data.tag);
	    }
	}

});
