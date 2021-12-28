const MongoMan = require('../../MongoMan');
const {MongoClient} = require('mongodb');
require('dotenv').config();
let man = new MongoMan(process.env.TEST_DB_CONNECT,process.env.TEST_DB_NAME)

describe("deleteOne()", function(){
    beforeAll( async () => {
        let data =  [{"title":"to delete"},{"title":"to not delete"}]
        await expect(man.insertMany("TESTdeleteOne",data,{})).resolves.toBe(true)  
    })
    test("passed should return true",async ()=>{
        await expect(man.deleteOne("TESTdeleteOne",{"title":"to delete"},{})).resolves.toBe(true);
    })
    test("should return typeError",async ()=>{
        await expect(man.deleteOne("TESTdeleteOne",1,{})).rejects.toThrow(TypeError)
        await expect(man.deleteOne(1,{"title":"to delete"},{})).rejects.toThrow(TypeError)
        await expect(man.deleteOne("TESTdeleteOne",{"title":"to delete"},1)).rejects.toThrow(TypeError)
    })
    test("sould trow error if query is empty object", async ()=>{
        await expect(man.deleteOne("TESTdeleteOne",{},{})).rejects.toThrow(TypeError)
        await expect(man.deleteOne("TESTdeleteOne",{},{})).rejects.toThrow("input query object should not be empty")
    })
    afterAll( () => {
        let cleanup = new MongoClient(process.env.TEST_DB_CONNECT)
            cleanup.connect(()=>{
                let db = cleanup.db(process.env.TEST_DB_NAME)
                db.dropCollection("TESTdeleteOne").then(()=>cleanup.close())
            }) 
    })
})  
  
