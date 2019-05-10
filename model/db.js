const mongoose = require('mongoose');

const { dbURI = 'mongodb://localhost/likesDB' } = process.env;
mongoose.connect(dbURI, { useNewUrlParser: true });

mongoose.connection.on('connected', () => console.log(`Mongoose connected to ${dbURI}`));
mongoose.connection.on('error', err =>
  console.log(`Mongoose connection error ${err}`)
);
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

const likeSchema  = new mongoose.Schema({
    stock : {type: String, required: true},
    ip : {type: [String], required: true},
    likes : {type: Number, default: 0}
})

mongoose.model('Like', likeSchema);