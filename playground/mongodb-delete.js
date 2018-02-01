var MongoClient=require('mongodb').MongoClient;


MongoClient.connect('mongodb://localhost:27017/dbtodo',(err,db)=>{
    if(err){
        return console.log("unable to connect to the Mongodb");
    }
    console.log('Connected to Mongodb server');

    let dbo=db.db('dbtodo');

    //deleteMany

    // dbo.collection("tblusers").deleteMany({name: "Heena" }).then((result)=>{
    //     console.log(result);
    // });


    //deleteOne
    // dbo.collection("tblusers").deleteOne({name: "Heena" }).then((result)=>{
    //     console.log(result);
    // });

    dbo.collection("tblusers").findOneAndDelete({age: 25 }).then((result)=>{
        console.log(result);
    });
    db.close();
});