module.exports = {
  rules: [
    {
      pattern: /\/api\/getLivelist.php/,
      respondwith: './livelist.json'
    },
    {
      pattern: /\/api\/getLivelist2.php/,
      respondwith: './livelist2.json'
    },
    {
      pattern: /\/api\/getLivelist3.php/,
      respondwith: './livelist3.json'
    },
    {
      pattern: /\/api\/getLivelist4.php/,
      respondwith: './livelist4.json'
    },
    {
      pattern: /\/api\/getDesignlist.php\?rtype=origin$/,
      respondwith: './mydesign.json'
    },
    {
      pattern: /\/api\/getDesignlist.php\?rtype=more$/,
      respondwith: './mydesign-move.json'
    },
    {
      pattern: /\/api\/getDesignlist.php\?rtype=mv$/,
      respondwith: './mydesign-mv.json'
    },
    {
      pattern: /\/api\/getDesignlist.php\?rtype=refresh$/,
      respondwith: './mydesign-refresh.json'
    },
    {
      pattern: /\/api\/getLiveDetail.php\?id=1$/,
      respondwith: './detail.json'
    },
    {
      pattern: /\/api\/getLiveDetail.php\?id=2$/,
      respondwith: './detail2.json'
    },
    {
      pattern: /\/api\/getLiveDesign.php/,
      respondwith: './design.json'
    },
    {
      pattern: /\/api\/getLiveHome.php/,
      respondwith: './homelist.json'
    },
    {
      pattern: /\/api\/getLiveItemDetail.php\?id=1$/,
      respondwith: './itemdetail.json'
    },
    {
      pattern: /\/api\/getLiveItemDetail.php\?rtype=more$/,
      respondwith: './itemdetail.json'
    },
     {
      pattern: /\/api\/getLiveItemDetail.php\?rtype=refresh$/,
      respondwith: './itemdetail.json'
    }
  ]
};
