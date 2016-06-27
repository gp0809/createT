var tplShare = require('../templates/share.string');

SPA.defineView('share', {
  html: tplShare,

  plugins: ['delegated'],

  styles: {
    background: 'transparent !important'
  },

  bindActions: {
    'close': function () {
      this.hide();
    }
  },

  bindEvents: {
    show: function () {
    }
  }

});
