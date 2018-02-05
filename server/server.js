const _=require('lodash');

const express=require('express');
const body_parser=require('body-parser');
const {ObjectID}=require('mongodb');
var {mongoose}=require('./db/mongoose');

var {todo}=require('./models/todo');
var {User}=require('./models/user');
var {authenticate}= require('./middleware/authenticate');


var app=express();

app.use(body_parser.json());

app.post('/todos',(req,res)=>{
    var mytodo=new todo({
        text: req.body.text
    });

    mytodo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });
});

app.get('/todos',(req,res)=>{
    todo.find().then((docs)=>{
        res.send({docs});
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos/:id',(req,res)=>{
    var id=req.params.id;
    if(!ObjectID.isValid(id))
    {
        return res.status(404).send();
    }

    todo.findById(id).then((docs)=>{
        if(!docs){
            return res.status(404).send();
        }

        res.send({docs});
    }).catch((e)=>{
        res.status(400).send();
    });
});

app.delete('/todos/:id',(req,res)=>{

    var id=req.params.id;

    if(!ObjectID.isValid(id))
    {
        return res.status(404).send();
    }

    todo.findByIdAndRemove(id).then((docs)=>{

        if(!docs){
            return  res.status(404).send();
        }

        res.send({docs});
    }).catch((e)=> {
        res.status(404).send();
    })
})


app.patch('/todos/:id',(req,res)=>{

   var id=req.params.id;
   var body=_.pick(req.body,['text','completed']);

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt=new Date().getTime();
    }
    else
    {
        body.completed=false;
        body.completedAt=null;
    }
    todo.findByIdAndUpdate(id,{$set: body},{new: true}).then((docs)=>{

        if(!docs){
            return res.status(400).send();
        }

        res.send({docs});
    }).catch((e)=>{
        res.status(400).send();
    })
});

app.post('/users',(req,res)=>{

    var body=_.pick(req.body,['email','password']);
    var user=new User(body);

    user.save().then(()=> {
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e) =>{
        res.status(400).send(e);
    })
});

app.get('/users/me',authenticate,(req,res)=>{

    res.send(req.user);
    // var token=req.header('x-auth');
    //
    // User.findByToken(token).then((user)=>{
    //     if(!user){
    //         return Promise.reject();
    //     }
    //     res.send(user);
    //
    // }).catch((e)=>{
    //     res.status(401).send();
    // });
});


app.listen(3001,()=>{
    console.log("Server is started on 3001");
});

module.exports={app};