const mongoose = require('mongoose');
const Like = mongoose.model('Like');

module.exports.likeStock = async (req, res, stock1, stock2, price1, price2) => {
  const ipAdresse = req.headers['x-forwarded-for']
    ? req.headers['x-forwarded-for'].split(',')[0]
    : req.ip;
  let likeStock1 = await Like.findOne({ stock: stock1 });
  let likeStock2 = stock2 ? await Like.findOne({ stock: stock2 }) : null;
  if (likeStock1) {
    if (likeStock1.ip.indexOf(ipAdresse) === -1) {
      likeStock1.ip.push(ipAdresse);
      likeStock1.likes++;
      likeStock1.save();
    }
  }
  if (likeStock2) {
    if (likeStock1.ip.indexOf(ipAdresse) === -1) {
      likeStock2.ip.push(ipAdresse);
      likeStock2.likes++;
      likeStock2.save();
    }
  }
  if (!likeStock1) {
    likeStock1 = await Like.create({
      stock: stock1,
      ip: [ipAdresse],
      likes: 1
    });
  }
  if (!likeStock2 && stock2) {
    likeStock2 = await Like.create({
      stock: stock2,
      ip: [ipAdresse],
      likes: 1
    });
  }
  if (!stock2) {
    res.json({
      stockData: {
        stock: likeStock1.stock,
        price: price1,
        likes: likeStock1.likes
      }
    });
  } else {
    res.json({
      stockData: [
        {
          stock: likeStock1.stock,
          price: price1,
          rel_likes: likeStock1.likes - likeStock2.likes
        },
        {
          stock: likeStock2.stock,
          price: price2,
          rel_likes: likeStock2.likes - likeStock1.likes
        }
      ]
    });
  }
};

module.exports.getStock = async (res, stock1, stock2, price1, price2) => {
  const likeStock1 = await Like.findOne({ stock: stock1 });
  const likeStock2 = stock2 ? await Like.findOne({ stock: stock2 }) : null;
  const data1 = likeStock1
    ? { stock: likeStock1.stock, price: price1, likes: likeStock1.likes }
    : { stock: stock1, price: price1, likes: 0 };
  const data2 = likeStock2
    ? { stock: likeStock2.stock, price: price2, likes: likeStock2.likes }
    : { stock: stock2, price: price2, likes: 0 };
  if (!stock2) {
    res.json({ stockData: data1 });
  } else {
    data1.rel_likes = data1.likes - data2.likes;
    data2.rel_likes = data2.likes - data1.likes;
    delete data1.likes;
    delete data2.likes;
    res.json({ stockData: [data1, data2] });
  }
};
