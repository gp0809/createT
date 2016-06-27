var tplItemDetail = require('../templates/itemdetail.string');

SPA.defineView('itemdetail', {
  html: tplItemDetail,
  plugins: ['delegated', {
    name: 'avalon',
    options: function (vm) {
      vm.title = "";
      vm.note = "";
      vm.url = "";
      vm.price="";
      vm.bgurl="";
      vm.bgtitle="";
      vm.detaillist=[];
      vm.isShowLoading = true;
    }
  }],
  init:{
    vm: null,
    detaillistArray: []
  },
  bindActions:{
    'back': function () {
      this.hide();
      console.log(this)
    },
    'tap.share':function(){
      SPA.open('share', {
        ani: {
          name: 'actionSheet',
          distance:200
        }
      });
    }
  },
  bindEvents: {
    'beforeShow': function () {
      var _this=this;
      _this.vm = _this.getVM();
      var d = _this.param.data;
      console.log(d);

      $.ajax({
        url: '/createT/mock/itemdetail.json',
        data: {
          id: d.id
        },
        success: function (rs) {
          _this.vm.detaillist=rs.data;
          _this.detaillistArray = rs.data;
          _this.vm.bgurl=(rs.CATE)[0].URL;
          _this.vm.bgtitle=(rs.CATE)[0].NAME;
          _this.vm.note = rs.data.NOTE;
          _this.vm.url = rs.data.URL;
          _this.vm.title = rs.data.TITLE;
          _this.vm.price = rs.data.PRICE;
          setTimeout(function(){
          _this.vm.isShowLoading =false;
          },500)
         
          console.log(_this.vm.detaillist)
        }
      })
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
                url: '/createT/mock/itemdetail.json',
                data: {
                  rtype: 'refresh',
                },
                success: function (rs) {
                  var newArray = rs.data.concat(_this.detaillistArray);
                  _this.vm.detaillist = newArray;
                  _this.detaillistArray=newArray; 
                  //console.log(_this.vm.detaillist)
              
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
                url: '/createT/mock/itemdetail.json',
                data: {
                  rtype: 'more',
                },
                success: function (rs) {
                  var newArray = _this.detaillistArray.concat(rs.data);
                  _this.vm.detaillist = newArray;
                  _this.detaillistArray=newArray; 
                  //console.log(_this.vm.detaillist)
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
