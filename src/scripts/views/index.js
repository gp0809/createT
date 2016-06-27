var tplIndex = require('../templates/index.string');

SPA.defineView('index', {
  html: tplIndex,

     // 插件配置
  plugins: ['delegated'],

  init: {
    mySwiper: null
  },

   modules: [{
    name: 'content', // 子视图的名字，用作后边引用的句柄
    views: ['home','myacount'], // 定义子视图的列表数组
    defaultTag: 'home', // 定义默认视图
    container: '.l-container' // 子视图的容器
  }],

  bindActions:{
  	'switch-tabs':function(e,data){
  		console.log(e.el);
      console.log(data.tag);
      this.modules.content.launch(data.tag);
  	},
    'tap.design': function () {
      SPA.open('design')
    },
    'tap.mydesign': function () {
      SPA.open('mydesign')
    },
    'tap.cart':function(){
      SPA.open('cart')
    }
  },
  bindEvents: {
    show: function () {
      // var myScroll = new IScroll('#home-scroll');
      $("footer li").on("click",function(){
      	$(this).addClass("active").siblings().removeClass("active");
        var _index=$("footer li").length;
       for(var i=0;i<_index;i++)
       {
          if($("footer li").hasClass("active"))
          {
            setTimeout(function(){
              $("footer li").removeClass("active")
            },2000)
          }
       }
      });
      
      var mySwiper = new Swiper('#bg-Swiper', {
    	loop:true,
    	autoplay:"1500",
  		});  
      $('#goCart').click(function(){
        if(localStorage.getItem("myaccount"))
        {
          SPA.open("cartcar")
        }
        else{
          SPA.open('cart')
        }
      });
      
   }
  }
  
});
