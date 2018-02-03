const {ObjectID}=require('mongodb');
const {mongoose}=require('./../server/db/mongoose');
const {todo}=require('./../server/models/todo');
const {User}=require('./../server/models/user');
//5a7570b2fb04fa1a2cfb306a

var id ='5a74034f6d4a6b590c464421';

if(!ObjectID.isValid(id)){
    console.log("Id is not found");
}

/*todo.find({
    _id: id
}).then((todos)=>{
    console.log("todos",todos);
},(err)=>{
    console.log("ID me locha",err);
});

todo.findOne({
    _id: id
}).then((res)=>{
    console.log("todo",res);
},(err)=>{
    console.log("ID me locha",err);
})*/

User.findById(id).then((user)=>{
    if(!user){
        return console.log("Id is not milti");
    }
    console.log(user);
}).catch((e)=> console.log(e));



// todo.findById(id).then((todo)=>{
//     if(!todo)
//     {
//         return console.log("id is not milti");
//     }
//     console.log("Todo by id ",todo);
// }).catch((e)=> console.log(e));
