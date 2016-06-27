var tplRegister = require('../templates/register.string');

SPA.defineView('register', {
  html: tplRegister,
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
      })
    }
  },
  bindEvents: {
    show: function () {
      var _this=this;
      var oTxt=$('.code-wrap')[0];
      var oBtn=$('.code-wrap')[0];
      //console.log(oTxt)
      shengcheng();//一开始先调用一次（初始化）
      oBtn.onclick=function() //点击时验证码更换
      {
        shengcheng();
      } 
      function shengcheng() //生成验证码的函数
      {
        var arr=[];    //定义一个空数组，放0-10，a-z，A-Z
        for(var i=0;i<10;i++)
        {
          arr.push(i);  //将0-9放入数组
        }
        
        for(var j=65;j<=90;j++)
        {
          arr.push(String.fromCharCode(j)) // 将ASCAL码转换成A-Z放入数组
        }
        for(var j=97;j<=122;j++)
        {
          arr.push(String.fromCharCode(j))// 将ASCAL码转换成a-z放入数组
        }
        var str='';
        for(var i=0;i<4;i++)
        {
          str+=arr[parseInt(Math.random()*62)];//从数组里随意取4个数做验证码
        }
        
        oTxt.innerHTML=str;
      }

      /*-----------表单验证-----------*/
        var oEmail=$('#email')[0];
        var oPsw=$('#psw')[0];
        var oRePsw=$('#repsw')[0];
        var oTestCode=$('#ts-code')[0];
        //console.log(oEmail)
        //定义正则
        var reEmail=/^\w+@[a-z0-9]{1,5}\.[a-z]{2,5}$/;
        var rePsw=/^\S{6,20}$/;
        var reTestCode=0;

        /*---------注册完成按钮被点击时---------*/
      $('#register-btn')[0].onclick=function()
      {
        
        $(".tips")[0].innerHTML="";
        if(oEmail.value==''&&oPsw.value==''&&oRePsw.value==''&&oTestCode.value=='')
        {
          $(".tips")[0].innerHTML="您未输入任何信息，请输入！"
          return;
        }
        if(!reEmail.test(oEmail.value))
        {
          $(".tips")[0].innerHTML="您的邮箱输入不正确！"
          return;
        }
        if(!rePsw.test(oPsw.value))
        {
          $(".tips")[0].innerHTML="密码小于20位大于6位！"
          return;
        }
        if(oPsw.value!=oRePsw.value)
        {
          $(".tips")[0].innerHTML="两次密码不一致！"
          return;
        }

        if($('#ts-code')[0].value.toLowerCase()!=$('.code-wrap')[0].innerHTML.toLowerCase())
        {
          $(".tips")[0].innerHTML="验证码错误"
          return;
        }
          $(".tips")[0].innerHTML="";
        /*填写的信息正确*/
          localStorage.setItem("account",oEmail.value);
          localStorage.setItem("password",oRePsw.value);
          $('.suc-wrap').show();
          $('.suc-suc').click(function(){
            $('.suc-wrap').hide();
            _this.hide();
          })
        }
      }
  }
});
