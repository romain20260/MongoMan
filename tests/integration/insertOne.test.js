
const MongoMan = require('../../MongoMan');
const {MongoClient} = require('mongodb');
require('dotenv').config();
let man = new MongoMan(process.env.TEST_DB_CONNECT,process.env.TEST_DB_NAME)

describe("insertOne()", function(done){
 
    test('resolve return True', async () => {
       await expect(man.insertOne("TESTinsertOne",{title:"test integration insertOne method"})).resolves.toBe(true);
    });
    test.each([1,{},"",[]])
    ('message collection ', async (collection) => {
        await expect(man.insertOne(collection,{})).rejects.toThrow("collection input no valid should be a STRING")
    });
    //TODO [] not passing test
    test.each([1,""])
    ('message arr ', async (query) => {
        await expect(man.insertOne("TESTinsertOne",query)).rejects.toThrow("data input should be a valid object")
    });
    afterAll( () => {
        let cleanup = new MongoClient(process.env.TEST_DB_CONNECT)
            cleanup.connect(()=>{
                let db = cleanup.db(process.env.TEST_DB_NAME)
                db.dropCollection("TESTinsertOne").then(()=>cleanup.close())
            }) 
    })
})  
  
