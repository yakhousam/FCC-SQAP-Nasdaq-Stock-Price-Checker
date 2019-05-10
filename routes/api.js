/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

const requesData = require('../controllers/requesData');
const db = require('../model/db');
const Likes = require('../controllers/likes');

const url = 'https://api.iextrading.com/1.0/stock/';

module.exports = function(app) {
  app.route('/api/stock-prices').get(function(req, res) {
    const stockQuery = req.query.stock;
    const like = req.query.like;
    const stock = Array.isArray(stockQuery)
      ? stockQuery[0].toUpperCase()
      : stockQuery.toUpperCase();

    requesData.getPrice(`${url}${stock}/price`, price1 => {
      price1 = parseFloat(price1).toFixed(2);
      if (!Array.isArray(stockQuery)) {
        if (like === 'true') {
          Likes.likeStock(req, res, stock, null, price1);
        } else {
          Likes.getStock(res, stock, null, price1);
        }
      } else {
        stockQuery[1] = stockQuery[1].toUpperCase();
        requesData.getPrice(`${url}${stockQuery[1]}/price`, price2 => {
          price2 = parseFloat(price2).toFixed(2);
          if (like === 'true') {
            Likes.likeStock(req, res, stock, stockQuery[1], price1, price2);
          } else {
            Likes.getStock(res, stock, stockQuery[1], price1, price2);
          }
        });
      }
    });
  });
};
