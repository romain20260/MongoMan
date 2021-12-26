
const MongoMan = require('../../MongoMan');
const {MongoClient, MongoServerError} = require('mongodb');
require('dotenv').config();
let man = new MongoMan(process.env.TEST_DB_CONNECT,process.env.TEST_DB_NAME)
// let NativeClient = new MongoClient(process.env.TEST_DB_CONNECT,process.env.TEST_DB_NAME)

describe('deleteCollection', () => {
    beforeEach(async () => {
        await expect(man.insertOne("deleteCollection",{title:"should not appaer"},{})).resolves.toBe(true);
    })
    test('should return True', async () => {
       await expect(man.documentDelete("deleteCollection")).resolves.toBe(true)
    })
    //TODO catch mongoservererror and custom it 
    test('should throw error ', async () => {
        await expect(man.documentDelete("doesntExist")).rejects.toThrow(MongoServerError)
    });
    test.each(["",1,["a"],{"a":"a"},[],{}])
    ('should trows error TypeError',async collection => {
            await expect(man.documentDelete(collection)).rejects.toThrow(TypeError)
        }
    );
    afterAll( () => {
        let cleanup = new MongoClient(process.env.TEST_DB_CONNECT)
            cleanup.connect(()=>{
                let db = cleanup.db(process.env.TEST_DB_NAME)
                db.dropCollection("deleteCollection").then(()=>cleanup.close())
            }) 
    })


})