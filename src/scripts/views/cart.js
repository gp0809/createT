var tplCart = require('../templates/cart.string');

SPA.defineView('cart', {
  html: tplCart,
  plugins: ['delegated'],
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
      });
    },
    'tap.register': function () {
      SPA.open("register");
    }
  },
  bindEvents: {
    show: function () {
      var _this=this;
      var mima=localStorage.getItem("password");
      var zhanghu=localStorage.getItem("account");
      $('#cart-login').click(function(){
        var mima=localStorage.getItem("password");
        var zhanghu=localStorage.getItem("account");
        console.log(zhanghu)
        if($('#cart-ac')[0].value==zhanghu&&$('#cart-ps')[0].value==mima)
        {
          localStorage.setItem("myaccount",zhanghu);
          $('.cart-tips').html();
          $('.suc-wrap').show();
          setTimeout(function(){
            _this.hide();
          },1500)
          $(".suc-suc").click(function(){
            $('.suc-wrap').css({"display":"none"});
          })
          
        }
        else{
          $('.cart-tips').html();
          if($('#cart-ac')[0].value=="")
          {
            $('.cart-tips').html("请输入用户名！");
            return;
          }
          if($('#cart-ac')[0].value!=zhanghu)
          {
            $('.cart-tips').html("您输入的用户名有误！");
            return;
          }
          if($('#cart-ps')[0].value==""){
            $('.cart-tips').html("请输入密码！");
            return;
          }
          if($('#cart-ps')[0].value!=mima)
          {
            $('.cart-tips').html("您输入的密码有误！");
            return;
          }
        }
      })
    }
  }
});
