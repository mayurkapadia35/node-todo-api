var MongoClient=require('mongodb').MongoClient;


MongoClient.connect('mongodb://localhost:27017/dbtodo',(err,db)=>{
    if(err){
        return console.log("unable to connect to the Mongodb");
    }
    console.log('Connected to Mongodb server');

    let dbo=db.db('dbtodo');


    dbo.collection('tbltodo').insertOne({
        text: "this is a text",
        completed: true
    },(err,result)=>{
        if(err)
        {
            console.log("something is wrong");
        }
        else
        {
            console.log(JSON.stringify(result.ops,undefined,2));
        }
    });

    db.close();

});


