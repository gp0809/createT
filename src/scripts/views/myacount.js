var tplMyacount = require('../templates/myacount.string');

SPA.defineView('myacount', {
  html: tplMyacount,
  plugins: ['delegated'],
  bindActions:{
  	'tap.register': function () {
      SPA.open('register')
    },
    'tap.login': function () {
      SPA.open('cart')
    }
  },
  bindEvents: {
    show: function () {
      //console.log(localStorage.getItem("myaccount"))
      var timer=null;
      timer=setInterval(function(){
        if(localStorage.getItem("myaccount"))
        {
          $('.re-lo').html(localStorage.getItem("myaccount"));
          $('.ac-back').show();
        }
      },50)
     
      if($('.re-lo').html()==localStorage.getItem("myaccount"))
      {
        clearInterval(timer);
      }
        
      $('.ac-back').click(function(){
        if(localStorage.getItem("myaccount"))
        {
          localStorage.clear();
          $('.re-lo').html('<div class="ac-login" action-type="tap.login">登录</div>'+
            '<div class="register" action-type="tap.register">注册</div>')
          $('.ac-back').hide();
        }
      })
    }
  }
});