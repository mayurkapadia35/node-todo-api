const expect=require('expect');
const request=require('supertest');
const {ObjectID}=require('mongodb');

const {app}= require('./../server');
const {todo}= require('./../models/todo');

const mytodos=[{
    _id: new ObjectID(),
    text: 'First test todo',
},{
    _id: new ObjectID(),
    text: "Second test todo",
    completed: true,
    completedAt: 333
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

    it('should return 404 if todo non object',(done)=>{

        request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done);
    });

});


describe('DELETE /todos/:id',()=>{
   it('should remove a todo',(done)=>{
        var hexId=mytodos[1]._id.toHexString();


        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.docs._id).toBe(hexId)
            })
            .end((err,res)=>{
            if(err){
                return done(err);
            }

            todo.findById(hexId).then((docs)=>{
                expect(docs).toNotExists;
                done();
            }).catch((e)=>done(e));
       });
   });

   it('should return 404 if todo not found',(done)=>{
       var hexId=new ObjectID().toHexString();

       request(app)
           .delete(`/todos/${hexId}`)
           .expect(404)
           .end(done);
   });

    it('should return 404 if objectid invalid',(done)=>{
        request(app)
            .delete('/todos/123abc')
            .expect(404)
            .end(done);
    });
});


describe('PATCH /todos/:id',()=>{
   it('should update the todo',(done)=>{

       var hexId=mytodos[0]._id.toHexString();
       var text='this should be the new text';

       request(app)
           .patch(`/todos/${hexId}`)
           .send({
               completed: true,
               text: text
           })
           .expect(200)
           .expect((res)=>{
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
           })
           .end(done)
   });

    it('should clear completed at when todo is not completed',(done)=>{

        var hexId=mytodos[1]._id.toHexString();
        var text='this should be the new text!!';

        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: false,
                text
            })
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done)
    });
});