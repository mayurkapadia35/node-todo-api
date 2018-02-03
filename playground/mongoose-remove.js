const {ObjectID}=require('mongodb');
const {mongoose}=require('./../server/db/mongoose');
const {todo}=require('./../server/models/todo');
const {User}=require('./../server/models/user');
//5a7570b2fb04fa1a2cfb306a

var id ='5a74034f6d4a6b590c464421';

// todo.remove({}).then((result)=>{
//    console.log(result);
// });

//todo.findOneAndRemove

// todo.findByIdAndRemove

todo.findByIdAndRemove('5a75a1dfeb63d113192a9909').then((docs)=>{
    console.log(docs);

});
