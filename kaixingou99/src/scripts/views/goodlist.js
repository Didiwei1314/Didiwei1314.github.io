var tplGoodlist = require('../templates/goodlist.string');

SPA.defineView('goodlist', {
	html: tplGoodlist,

	plugins: ['delegated', {
		name: 'avalon',
		options: function(vm) {
			vm.goods = [];
		}
	}],

	init: {
		vm:null,
		livelistArray: [],
		formatData: function(arr) {
			var tempArr = [];
			for (var i = 0; i < Math.ceil(arr.length / 2); i++) {
				tempArr[i] = [];
				tempArr[i].push(arr[2 * i]);
				tempArr[i].push(arr[2 * i + 1]);
			}
			return tempArr;
		},
		onoff: true
	},

	bindEvents: {
		'beforeShow': function() {
			var _this = this;
			_this.vm = this.getVM();
			$.ajax({
				url: '/kaixingou99/mock/goodlistwoman.json',
				//url:'/api/getLivelist.php',
				type: 'get',
				data: {
					rtype: 'origin'
				},
				success: function(res) {
					_this.vm.goods=_this.formatData(res);
					_this.livelistArray = res;
				}
			});
		},
		'show': function() {
			var _this = this;
			var scrollSize = 30;
			var myScroll = this.widgets.goodLists;
			myScroll.scrollBy(0, -scrollSize);

			var head = $('.head img'),
				topImgHasClass = head.hasClass('up');
			var foot = $('.foot img'),
				bottomImgHasClass = head.hasClass('down');
			myScroll.on('scroll', function() {
				var y = this.y,
					maxY = this.maxScrollY - y;
				if (y >= 0) {
					head.addClass('up');
					return '';
				}
				if (maxY >= 0) {
					foot.addClass('down');
					return '';
				}
			});

			myScroll.on('scrollEnd', function() {
				if (this.y >= -scrollSize && this.y < 0) {
					myScroll.scrollTo(0, -scrollSize);
					head.removeClass('up');
				} else if (this.y >= 0) {
					head.attr('src', '/kaixingou99/images/loader.gif');
					// ajax下拉刷新数据
                    setTimeout(function(){

					$.ajax({
						url: '/kaixingou99/mock/goodlistwomanre.json',
						data: {
							//rtype: 'refresh'
						},
						success: function(res) {
							var newArray = res.concat(_this.livelistArray);
							_this.vm.goods = _this.formatData(newArray);
							_this.livelistArray = newArray;
                            //console.log(_this.vm.goods)
							myScroll.scrollTo(0, -scrollSize);
							head.removeClass('up');
							head.attr('src', '/kaixingou99/images/down.gif');
						}
					});
                    },1000);
				}

				var maxY = this.maxScrollY - this.y;
				var self = this;
				if (maxY > -scrollSize && maxY < 0) {
					myScroll.scrollTo(0, self.maxScrollY + scrollSize);
					foot.removeClass('down');
				} else if (maxY >= 0) {
					foot.attr('src', '/kaixingou99/images/loader.gif');
					// ajax上拉加载数据
                   setTimeout(function(){
					$.ajax({
						url: '/kaixingou99/mock/goodlistwomanmore.json',
						//url: '/api/getLivelist.php',
						data: {
							//rtype: 'more'
						},
						success: function(res) {
							var newArray = _this.livelistArray.concat(res);
							_this.vm.goods = _this.formatData(newArray);
							_this.livelistArray = newArray;
							myScroll.refresh();
                           // console.log(_this.livelistArray)
							myScroll.scrollTo(0, self.y);
							foot.removeClass('down');
							foot.attr('src', '/kaixingou99/images/down.gif');
						}
					});
				},1000);
				}
			});

		}
	},

	bindActions: {
		'hide': function() {
			this.hide();
		},
		'sort-tab': function(e) {
			$(e.el).addClass('active').siblings().removeClass('active');
			//console.log(e.el)
		},
		'change': function(e) {
			if (this.onoff) {
				$(e.el).html('&#xe61b;');
				this.onoff = false;
			} else {
				$(e.el).html('&#xe607;');
				this.onoff = true;
			}
		}
	}
});
