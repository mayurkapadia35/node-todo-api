// var mongoose =require('mongoose');
//
// mongoose.Promise=global.Promise;
// mongoose.connect('mongodb://localhost:27017/dbtodo');
//
// module.exports={mongoose};

var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/dbtodo');
mongoose.Promise=global.Promise;

module.exports={mongoose};











