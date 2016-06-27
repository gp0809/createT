// 引入spa类库
require('./lib/spa.min.js');
require('./lib/swiper.jquery.min.js');

// 引入views
require('./views/home.js');
require('./views/myacount.js');
require('./views/design.js');
require('./views/detail.js');
require('./views/mydesign.js');
require('./views/cart.js');
require('./views/index.js');
require('./views/guide.js');
require('./views/share.js');
require('./views/itemdetail.js');
require('./views/register.js');
require('./views/cartcar.js');

SPA.config({
	indexView:"guide"
})