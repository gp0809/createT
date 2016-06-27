var tplDetail = require('../templates/detail.string');

SPA.defineView('detail', {
  html: tplDetail,
  plugins: ['delegated', {
    name: 'avalon',
    options: function (vm) {
      vm.imgsrc = "";
      vm.name = "";
      vm.imgsrclogo = "";
      vm.price="";
      vm.isShowLoading = true;
    }
  }],
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
    'show': function () {
      var vm = this.getVM();
      var d = this.param.data;
      console.log(d);

      $.ajax({
        url: '/api/getLiveDetail.php',
        data: {
          id: d.id
        },
        success: function (rs) {
          vm.name = rs.data.name;
          vm.imgsrc = rs.data.imgsrc;
          vm.imgsrclogo = rs.data.imgsrclogo;
          vm.price = rs.data.price;
          setTimeout(function(){
            vm.isShowLoading =false;
          },500)
         
          console.log(rs.data)
        }
      })
    }
  }
});
