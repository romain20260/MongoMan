const MongoMan = require('../../MongoMan');
const {MongoClient} = require('mongodb');
require('dotenv').config();
let man = new MongoMan(process.env.TEST_DB_CONNECT,process.env.TEST_DB_NAME)

describe('updateMany()', () => {

    beforeEach(async() => {
        data = [{title :"titre 1"},
        {title :"title 2"},
        {title :"title 3"},
        {title :"title 4"},
        {title :"title 5"},
        {title :"title 6"},]
        let ini = new MongoClient(process.env.TEST_DB_CONNECT)
        await ini.connect(()=>{
           let collect = ini.db(process.env.TEST_DB_NAME).collection("TESTupdateMany")
            collect.insertMany(data).then(()=>ini.close())
        })
    });    
    test('should update all ',async  () => {
        await expect(man.updateMany("TESTupdateMany",{},{$set:{title:"all title modified"}})).resolves.toBeGreaterThanOrEqual(0)
    });
    test('should trow error', async () => {
        expect(man.updateMany(1,{title:"title to update"},{$set:{title:"all title modified"}})).rejects.toThrow(TypeError)
        expect(man.updateMany("TESTupdateMany",1,{$set:{title:"all title modified"}})).rejects.toThrow(TypeError)
        expect(man.updateMany("TESTupdateMany",{title:"all title modified"},1)).rejects.toThrow(TypeError)
    });
    afterAll(async () => {
        let ini = new MongoClient(process.env.TEST_DB_CONNECT)
        await ini.connect(()=>{
            let collect = ini.db(process.env.TEST_DB_NAME)
             collect.dropCollection("TESTupdateMany").then(()=>ini.close())
         })

    });
        
    
    
});