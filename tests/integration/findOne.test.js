const MongoMan = require('../../MongoMan');
const {MongoClient, Collection} = require('mongodb');
require('dotenv').config();
let man = new MongoMan(process.env.TEST_DB_CONNECT,process.env.TEST_DB_NAME)

describe("findOne()", function(){
 
    beforeEach( async () => {
        let data =  [{"title":"test unit OK for insertMany...."},{"title":".....suite test unit OK for insertMany"}]
        await expect(man.insertMany("TESTfindOne",data,{})).resolves.toBe(true)  
    });
    test('should passed ', async () => {
        
        await expect(man.findByOne("TESTfindOne",{title:"test unit OK for insertMany...."})).resolves.toHaveProperty("title","test unit OK for insertMany....")  
    });
    test('should error cause NOTfound  ', async () => {

        await expect(()=>man.findByOne("TESTfindOne",{title:"insertMany...."})).rejects.toThrow(Error);
        await expect(()=>man.findByOne("TESTfindOne",{title:"insertMany...."})).rejects.toThrow("can find any result on your request, check twice pls your collection name and query object");
    });
    test("error input", async ()=>{
        await expect(()=>man.findByOne("TESTfindOne",1)).rejects.toThrow(Error);
        await expect(()=>man.findByOne(1,{title:"test unit OK for insertMany...."})).rejects.toThrow(Error);
        await expect(()=>man.findByOne("TESTfindOne",{title:"test unit OK for insertMany...."},1)).rejects.toThrow(Error);
    })
  
    afterAll( () => {
        let cleanup = new MongoClient(process.env.TEST_DB_CONNECT)
            cleanup.connect(()=>{
                let db = cleanup.db(process.env.TEST_DB_NAME)
                db.dropCollection("TESTfindOne").then(()=>cleanup.close())
            }) 
    })
})  
  
