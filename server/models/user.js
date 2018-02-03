

var mongoose=require('mongoose');

var User=mongoose.model('tblusers',{
    email:{
        type: String,
        required: true,
        default: "mayur@gmail.com"
    }
});

module.exports={User};

