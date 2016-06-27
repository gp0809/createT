var tplCartcar = require('../templates/cartcar.string');

SPA.defineView('cartcar', {
  html: tplCartcar,
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
  bindEvents:{
  	show:function(){

  	}
  }

});
