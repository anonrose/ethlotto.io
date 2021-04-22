const express = require('express')
var logger = require('morgan');
var path = require('path');
var app = express();
const fetch = require('node-fetch');

// log requests
const COINBASE_API = "https://api.coinbase.com/v2/prices/ETH-USD/buy"

app.use(logger('dev'));

app.get('/api/price.json', async (req, res) => {
  const resp = await fetch(COINBASE_API, {
    Headers: { 'CB-VERSION': '2016-03-03' }
  })
  res.json(await resp.json())
})

app.use(express.static(path.join(__dirname, 'dist')));

app.listen(3000);
