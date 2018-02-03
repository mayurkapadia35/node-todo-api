var express=require('express');
var body_parser=require('body-parser');
var {ObjectID}=require('mongodb');
var {mongoose}=require('./db/mongoose');

var {todo}=require('./models/todo');
var {User}=require('./models/user');

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


app.listen(3001,()=>{
    console.log("Server is started on 3001");
});

module.exports={app};