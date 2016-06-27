var tplDesign = require('../templates/design.string');
var util = require('../utils/fn.js');
SPA.defineView('design', {
  html: tplDesign,
  plugins: ['delegated', {
    name: 'avalon',
    options: function (vm) {
      vm.livelist = [];
      vm.isShowLoading = true;
    }
  }],
  bindEvents: {
    show: function () {
      // var myScroll = new IScroll('#home-scroll');
      var vm = this.getVM();
      $.ajax({
        url: '/createT/mock/design.json',
        data: {
          rtype: "design"
        },
        success: function (rs) {
          vm.livelist=rs.data;
          setTimeout(function () {
            vm.livelist=rs.data;
            vm.isShowLoading = false;
          }, 500);
        }
      })
      setTimeout(function(){
        $(".pic-true").eq(1).css({"display":"none"});
      },535)
      /**/
      $(".pic-false").css({"display":"none"});
      $(".de-true").on("click",function(){
      	$(this).addClass("active").siblings().removeClass("active");
        //$(".pic-true")[0].src='/createT/images/true1.png'
      	$(".pic-true").eq(0).css({"display":"block"});
      	$(".pic-false").css({"display":"none"});
      });
      $(".de-false").on("click",function(){
      	//console.log($(".de-pic img").attr("src"))
      	$(this).addClass("active").siblings().removeClass("active");
      	$(".pic-false").css({"display":"block"});
        $(".pic-true").eq(0).css({"display":"none"});
        //$(".pic-true")[0].src='/createT/images/false1.png'
      })
      $('.chc').click(function(){
        $('.change-wrap').show();
      })

      $.get("/createT/mock/imgsrc.json",function(data){
          $('.color-items li').click(function(){
          var index=$(this).index();
          $('.pic-true')[0].src=data[index].srctrue;
          $('.pic-false')[0].src=data[index].srcfalse;
          $('.change-wrap').hide();
        })
      })
      $('.mock-back').click(function(){
        $('.change-wrap').hide();
      })
    }
  },
  bindActions: {
    'exit': function () {
   	  this.hide();
    },
    'tap.share': function () {
      SPA.open('share', {
        ani: {
          name: 'actionSheet',
          distance:200
        }
      });
    }
  }

});
