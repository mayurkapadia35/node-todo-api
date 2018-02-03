const expect=require('expect');
const request=require('supertest');
const {ObjectID}=require('mongodb');

const {app}= require('./../server');
const {todo}= require('./../models/todo');

const mytodos=[{
    _id: new ObjectID(),
    text: 'First test todo'
},{
    _id: new ObjectID(),
    text: "Second test todo"
}];

beforeEach((done)=>{
    todo.remove({}).then(()=> {
        return todo.insertMany(mytodos);
    }).then(()=>done());
});


describe('POST/todos',()=>{
   it('should create a new todo',(done)=>{
        var text="test todos text";

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text);
            })
        .end((err,res)=>{
          if(err){
              return done(err);
          }


          todo.find({text}).then((docs)=>{
                  expect(docs.length).toBe(1);
              expect(docs[0].text).toBe(text);
                done();
          }).catch((e)=>done(e));
       });
   });

   it('should not create todo with invalid body data',(done)=>{
      request(app)
          .post('/todos')
          .send({})
          .expect(400)
          .end((err,res)=>{
            if(err)
            {
                return done(err);
            }
            todo.find().then((docs)=>{
               expect(docs.length).toBe(2);
               done();
            }).catch((e)=>done(e));
          });
   });
});

describe('GET/todos',()=>{
   it('should get all todos',(done)=>{
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res)=>{
                expect(res.body.docs.length).toBe(2);
            })
            .end(done);
   });
});

describe('GET /todos/:id',()=>{
    it("should return todo doc",(done)=>{
        request(app)
            .get(`/todos/${mytodos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.docs.text).toBe(mytodos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found',(done)=>{
        var hexId=new ObjectID().toHexString();

        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if todo not found',(done)=>{

        request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done);
    });

});


