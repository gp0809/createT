var tplHome = require('../templates/home.string');

SPA.defineView('home', {
  html: tplHome,
  init:{
  	mySwiper:null,
    vm:null,
    /*formatData: function (arr) {
      var tempArr = [];
      for (var i = 0; i < Math.ceil(arr.length/4); i++) {
        tempArr[i] = [];
        tempArr[i].push(arr[4*i]);
        tempArr[i].push(arr[4*i+1]);
        tempArr[i].push(arr[4*i+2]);
        tempArr[i].push(arr[4*i+3]);
      }
      return tempArr;
    },*/
    ajax:function(){
       var _this=this;
       var vm = _this.getVM();
          $.ajax({
            // url: '/createT/mock/livelist.json',
            url: '/api/getLivelist.php',
            type: 'get',
            data:{
              rtype: 'refresh'
            },
            success: function (rs) {
              vm.livelist = rs.data;
            }
        });
    }
  },
  plugins: ['delegated',{
    name: 'avalon',
    options: function (vm) {
      vm.livelist = [];
      vm.homelist = [];
    }
  }],
  
  bindActions: {
    'tap.slide': function (e, data) {
      this.mySwiper.slideTo($(e.el).index())
      //console.log($(e.el).index())
    },
    'goto.detail': function (e, data) {
      SPA.open('detail', {
        param: {
          data: data
        }
      });
    },
    'tap.share': function () {
      SPA.open('share', {
        ani: {
          name: 'actionSheet',
          distance:200
        }
      });
    },
    'tap.detail': function (e, data) {
      SPA.open('itemdetail',{
        param: {
          data: data
        }
      });
    }
  },
  bindEvents: {
    'beforeShow': function () {
        var that=this
        that.vm = this.getVM();
          $.ajax({
            // url: '/createT/mock/livelist.json',
            url: '/api/getLiveHome.php',
            type: 'get',
            data:{
              rtype: 'refresh'
            },
            success: function (rs) {
              that.vm.homelist = rs.data;
              //console.log(vm.homelist)
            }
        });
    },
    show: function () {
     $('.jingxuan').eq(0).show(); 
     var _this=this;
     this.ajax();
     this.mySwiper = new Swiper('#home-Swiper',{
     	loop: false,
      jsonName:"getLivelist",
     	onSlideChangeStart: function (swiper) {
          $('.jingxuan').hide();
          $('.spinner').show();
          var index = swiper.activeIndex;
          setTimeout(function(){
            $('.jingxuan').eq(index).show();
            $('.spinner').hide();
          },1000)
          
          var $lis = $('.m-search-menu li b');
          $lis.eq(index).addClass("active").siblings().parent().siblings().children().removeClass("active");
          var $list = $('.m-search-menu.fixed li b');
          $list.eq(index).addClass("active").siblings().parent().siblings().children().removeClass("active");
         switch(index){
          case 0: this.jsonName="getLivelist";
            break;
          case 1:this.jsonName="getLivelist2";
            break;
          case 2:this.jsonName="getLivelist3";
            break;
          case 3:this.jsonName="getLivelist4";
            break;
         }
          _this.vm = _this.getVM();
          $.ajax({
            url: '/api/'+this.jsonName+'.php',
            type: 'get',
            data:{
              rtype: 'refresh'
            },
            success: function (rs) {
              _this.vm.livelist = rs.data;
            }
          })
        } 
     });


     var fixScroll = this.widgets.fixScroll;
      fixScroll.on('scroll', function () {
        if(this.y <= -120) {
          if($('.m-home').siblings().length > 1){
            ;
          } else {
            $('.m-home').after($('.m-search-menu').clone(true).addClass('fixed'));
          }
        } else {
          $('.m-search-menu.fixed').remove();
        }
      });
    }
  }
});
