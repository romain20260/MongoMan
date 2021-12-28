const MongoMan = require('../../MongoMan');
const {MongoClient, Collection} = require('mongodb');
require('dotenv').config();
let man = new MongoMan(process.env.TEST_DB_CONNECT,process.env.TEST_DB_NAME)

describe("insertmany()", function(){
 
    test('should passed', async () => {
        let data =  [{"title":"test unit OK for insertMany...."},{"title":".....suite test unit OK for insertMany"}]

        await expect(man.insertMany("TESTinsertMany",data,{})).resolves.toBe(true)  

       
    });
    test.each([1,["arr"],{a:1},[],{object:"test"},{},])
    ('collection input error trhrow',async collection => {
            let data =  [{"title":"WARNING test unit OK for insertMany...."},{"title":"WARNING .....suite test unit OK for insertMany"}]
            await expect(man.insertMany(collection,data,{})).rejects.toThrow(TypeError)
        }
    );
    //TODO make sure a empty array is return a error and also a array of empty objects
    test.each(["a",1,{}])
    ('data input throw Error', async data => {
        await expect(man.insertMany("TESTinsertMany",data,{})).rejects.toThrow(TypeError)
    });

    afterAll( () => {
        let cleanup = new MongoClient(process.env.TEST_DB_CONNECT)
            cleanup.connect(()=>{
                let db = cleanup.db(process.env.TEST_DB_NAME)
                db.dropCollection("TESTinsertMany").then(()=>cleanup.close())
            }) 
    })
})  
  
