/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(10000)
    
    suite('GET /api/stock-prices => stockData object', function() {

      let likes;
      
      test('1 stock', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog'})
        .end(function(err, res){          
          //complete this one too
          assert.equal(res.status, 200);
          assert.isObject(res.body.stockData, 'the returned value should be an Object');
          assert.property(res.body.stockData, 'stock', 'stockData object should have property: stock')
          assert.isString(res.body.stockData.stock, 'stock property should be a String')
          assert.property(res.body.stockData, 'price', 'stockData object should have property: price')
          assert.ok(/^\d+\.\d+$/.test(res.body.stockData.price), 'price should be in decimal format')          
          assert.property(res.body.stockData, 'likes', 'stockData object should have property: likes');
          assert.isNumber(res.body.stockData.likes, 'likes property should be an integer');
                    
          done();
        });
      });
      
      test('1 stock with like', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog', like: 'true'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isObject(res.body.stockData, 'the returned value should be an Object');
          assert.property(res.body.stockData, 'stock', 'stockData object should have property: stock')
          assert.isString(res.body.stockData.stock, 'stock property should be a String')
          assert.property(res.body.stockData, 'price', 'stockData object should have property: price')
          assert.ok(/^\d+\.\d+$/.test(res.body.stockData.price), 'price should be in decimal format')          
          assert.property(res.body.stockData, 'likes', 'stockData object should have property: likes');
          assert.equal(res.body.stockData.stock, 'GOOG', 'stock should be equal to "GOOG"')
          assert.isNumber(res.body.stockData.likes, 'likes property should be an integer');
          assert.isAbove(res.body.stockData.likes, 0, 'likes should be greater than 0');

          likes = res.body.stockData.likes;

          done();
        })
      });
      
      test('1 stock with like again (ensure likes arent double counted)', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog', like: 'true'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isObject(res.body.stockData, 'the returned value should be an Object');
          assert.property(res.body.stockData, 'stock', 'stockData object should have property: stock')
          assert.isString(res.body.stockData.stock, 'stock property should be a String')
          assert.property(res.body.stockData, 'price', 'stockData object should have property: price')
          assert.ok(/^\d+\.\d+$/.test(res.body.stockData.price), 'price should be in decimal format')          
          assert.property(res.body.stockData, 'likes', 'stockData object should have property: likes');
          assert.equal(res.body.stockData.stock, 'GOOG', 'stock should be equal to "GOOG"')
          assert.isNumber(res.body.stockData.likes, 'likes property should be an integer');
          assert.equal(res.body.stockData.likes, likes, 'likes should be equal to likes');

          done();
        })
        
      });
      
      test('2 stocks', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock: ['goog', 'msft']})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body.stockData, 'the returned value should be an array');
          assert.property(res.body.stockData[0], 'stock', 'stockData object should have property: stock')
          assert.property(res.body.stockData[1], 'stock', 'stockData object should have property: stock')
          assert.isString(res.body.stockData[0].stock, 'stock property should be a String')
          assert.isString(res.body.stockData[1].stock, 'stock property should be a String')
          assert.property(res.body.stockData[0], 'price', 'stockData object should have property: price')
          assert.property(res.body.stockData[1], 'price', 'stockData object should have property: price')
          assert.ok(/^\d+\.\d+$/.test(res.body.stockData[0].price), 'price should be in decimal format')          
          assert.ok(/^\d+\.\d+$/.test(res.body.stockData[1].price), 'price should be in decimal format')          
          assert.property(res.body.stockData[0], 'rel_likes', 'stockData object should have property: rel_likes');
          assert.property(res.body.stockData[1], 'rel_likes', 'stockData object should have property: rel_likes');
          assert.equal(res.body.stockData[0].stock, 'GOOG', 'stock should be equal to "GOOG"');
          assert.equal(res.body.stockData[1].stock, 'MSFT', 'stock should be equal to "MSFT"');
          assert.equal(res.body.stockData[0].rel_likes + res.body.stockData[1].rel_likes, 0);

          done();
        })
        
      });
      
      test('2 stocks with like', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock: ['goog', 'msft'], like: 'true'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body.stockData, 'the returned value should be an array');
          assert.property(res.body.stockData[0], 'stock', 'stockData object should have property: stock')
          assert.property(res.body.stockData[1], 'stock', 'stockData object should have property: stock')
          assert.isString(res.body.stockData[0].stock, 'stock property should be a String')
          assert.isString(res.body.stockData[1].stock, 'stock property should be a String')
          assert.property(res.body.stockData[0], 'price', 'stockData object should have property: price')
          assert.property(res.body.stockData[1], 'price', 'stockData object should have property: price')
          assert.ok(/^\d+\.\d+$/.test(res.body.stockData[0].price), 'price should be in decimal format')          
          assert.ok(/^\d+\.\d+$/.test(res.body.stockData[1].price), 'price should be in decimal format')          
          assert.property(res.body.stockData[0], 'rel_likes', 'stockData object should have property: rel_likes');
          assert.property(res.body.stockData[1], 'rel_likes', 'stockData object should have property: rel_likes');
          assert.equal(res.body.stockData[0].stock, 'GOOG', 'stock should be equal to "GOOG"');
          assert.equal(res.body.stockData[1].stock, 'MSFT', 'stock should be equal to "MSFT"');
          assert.equal(res.body.stockData[0].rel_likes + res.body.stockData[1].rel_likes, 0);

          done();
        })
      });
      
    });

});
