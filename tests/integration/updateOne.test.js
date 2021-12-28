const MongoMan = require('../../MongoMan');
const {MongoClient} = require('mongodb');
require('dotenv').config();
let man = new MongoMan(process.env.TEST_DB_CONNECT,process.env.TEST_DB_NAME)

describe('updateOne()', () => {
    
    beforeEach(async() => {
        let test = async ()=>{
            let ini = new MongoClient(process.env.TEST_DB_CONNECT)
            await ini.connect();
            let db = ini.db(process.env.TEST_DB_NAME)
            let collection = db.collection("testasync")
            await collection.insertOne({title:"test"})
        }
        // 
        // await ini.connect(()=>{
        //    et collect = ini.db.collection("TESTupdateOne")
        //     collect.insertOne({title:"title to update"}).then(()=>ini.close())l
        // })
        await man.insertOne("TESTupdateOne",{title:"title to update"})
        await expect(man.findByOne("TESTupdateOne",{title:"title to update"})).resolves.toHaveProperty("title","title to update")
    });
    test('should passed',async () => {
        await expect(man.updateOne("TESTupdateOne",{title:"title to update"},{$set:{title:"title has been modified"}})).resolves.toBeGreaterThanOrEqual(0);
    })
    test('should trow error', async () => {
        expect(man.updateOne(1,{title:"title to update"},{$set:{title:"title has been modified"}})).rejects.toThrow(TypeError)
        expect(man.updateOne("TESTupdateOne",1,{$set:{title:"title has been modified"}})).rejects.toThrow(TypeError)
        expect(man.updateOne("TESTupdateOne",{title:"title to update"},1)).rejects.toThrow(TypeError)
    });
    test('should be find  ', async () => {
        await expect(man.findByOne("TESTupdateOne",{title:"title has been modified"})).resolves.toHaveProperty("title","title has been modified")
    });
    afterAll(async () => {
        let ini = new MongoClient(process.env.TEST_DB_CONNECT)
        await ini.connect(()=>{
            let collect = ini.db(process.env.TEST_DB_NAME)
             collect.dropCollection("TESTupdateOne").then(()=>ini.close())
         })

    });

});