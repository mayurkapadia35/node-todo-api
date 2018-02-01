var MongoClient=require('mongodb').MongoClient;


MongoClient.connect('mongodb://localhost:27017/dbtodo',(err,db)=>{
    if(err){
        return console.log("unable to connect to the Mongodb");
    }
    console.log('Connected to Mongodb server');

    let dbo=db.db('dbtodo');

    dbo.collection('tblusers').find({
        name: "Geet"
    }).toArray().then((docs)=>{
       console.log("Users: ");
       console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log(`error: ${err}`);
    });

    db.close();

});


