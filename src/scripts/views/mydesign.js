var tplMydesign = require('../templates/mydesign.string');

SPA.defineView('mydesign', {
  html: tplMydesign,

  plugins: ['delegated',{
    name: 'avalon',
    options: function (vm) {
      vm.livelist = [];
      vm.isShowLoading = true;
    }
  }],
  init:{
  	vm: null,
  	livelistArray: []
  },
  bindActions:{
    'exit': function () {
      this.hide();
    },
    'tap.share':function(){
      SPA.open('share', {
        ani: {
          name: 'actionSheet',
          distance:200
        }
      })
    }
  },
  bindEvents: {
    'beforeShow': function () {
     var _this=this;
        _this.vm = _this.getVM();
          $.ajax({
            // url: '/createT/mock/livelist.json',
            url: '/createT/mock/mydesign.json',
            type: 'get',
            data:{
              rtype: 'origin'
            },
            success: function (rs) {
              _this.vm.livelist = rs.data;
              _this.livelistArray = rs.data;
              setTimeout(function(){
                _this.vm.isShowLoading=false;
              },1000)
              console.log(_this.vm)
            }
        });
    },
    'show':function(){
    	// 下拉刷新，上拉加载更多
      var _this=this; 
      var scrollSize = 30;
      var myScroll = this.widgets.homeHotScroll;
      myScroll.scrollBy(0, -scrollSize);

      var head = $('.head img'),
          topImgHasClass = head.hasClass('up');
      var foot = $('.foot img'),
          bottomImgHasClass = head.hasClass('down');
      myScroll.on('scroll', function () {
          var y = this.y,
              maxY = this.maxScrollY - y;
          if (y >= 0) {
              !topImgHasClass && head.addClass('up');
              return '';
          }
          if (maxY >= 0) {
              !bottomImgHasClass && foot.addClass('down');
              return '';
          }
      });

      myScroll.on('scrollEnd', function () {
          if (this.y >= -scrollSize && this.y < 0) {
              myScroll.scrollTo(0, -scrollSize);
              head.removeClass('up');
          } else if (this.y >= 0) {
              head.attr('src', '/createT/images/ajax-loader.gif');
              //TODO ajax下拉刷新数据

               $.ajax({
                url: '/createT/mock/mydesign-refresh.json',
                data: {
                  rtype: 'refresh',
                },
                success: function (rs) {
                  var newArray = rs.data.concat(_this.livelistArray);
                  _this.vm.livelist = newArray;
                  _this.livelistArray=newArray;	
                  //console.log(_this.vm.livelist)
              
                }
              });

              setTimeout(function () {
                  myScroll.scrollTo(0, -scrollSize);
                  head.removeClass('up');
                  head.attr('src', '/createT/images/arrow.png');
              }, 1000);
          }

          var maxY = this.maxScrollY - this.y;
          var self = this;
          if (maxY > -scrollSize && maxY < 0) {
              myScroll.scrollTo(0, self.maxScrollY + scrollSize);
              foot.removeClass('down')
          } else if (maxY >= 0) {
              foot.attr('src', '/createT/images/ajax-loader.gif');
              // ajax上拉加载数据

              $.ajax({
                url: '/createT/mock/mydesign-move.json',
                data: {
                  rtype: 'more',
                },
                success: function (rs) {
                  var newArray = _this.livelistArray.concat(rs.data);
                  _this.vm.livelist = newArray;
                  _this.livelistArray=newArray;	
                  //console.log(_this.vm.livelist)
                  myScroll.refresh();
              
                  myScroll.scrollTo(0, self.y -200);
                  foot.removeClass('down');
                  foot.attr('src', '/createT/images/arrow.png');
              
                }
              });

               $.ajax({
                url: '/createT/mock/mydesign-mv.json',
                data: {
                  rtype: 'mv',
                },
                success: function (rs) {
                  var newArray = _this.livelistArray.concat(rs.data);
                  _this.vm.livelist = newArray;
                  _this.livelistArray=newArray;	
                  myScroll.refresh();
                  myScroll.scrollTo(0, self.y -200);
                  foot.removeClass('down');
                  foot.attr('src', '/createT/images/arrow.png');
                }
              });
          }
      })
    }
  }
});
