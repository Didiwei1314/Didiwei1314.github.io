module.exports = {
  rules: [
    {
      pattern: /\/api\/getLivelist.php/,
      respondwith: './goodlist.json'
    },
    {
      pattern: /\/api\/getLivelist.php\?rtype=origin$/,
      respondwith: './goodlistwoman.json'
    }
  ]
};
