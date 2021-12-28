const MongoMan = require('../../MongoMan');
const {MongoClient} = require('mongodb');
require('dotenv').config();
let man = new MongoMan(process.env.TEST_DB_CONNECT,process.env.TEST_DB_NAME)

describe("deleteMany()", function(){
    beforeEach( async () => {
        let data =    [  
        {title:"findMulti ....1"},
        {title:"findMulti ....2"},
        {title:"findMulti ....3"},
        {title:"findMulti ....4"},
        {title:"findMulti ....5"}
    ]
        await expect(man.insertMany("TESTdeleteMulti",data,{})).resolves.toBe(true)
       
    })
    test("passed should return a number ",async ()=>{
        await expect(man.deleteMany("TESTdeleteMulti",{},{})).resolves.toBeGreaterThanOrEqual(0);
    })
    test("should return typeError",async ()=>{
        await expect(man.deleteMany("TESTdeleteMulti",1,{})).rejects.toThrow(TypeError)
        await expect(man.deleteMany(1,{"title":"to delete"},{})).rejects.toThrow(TypeError)
        await expect(man.deleteMany("TESTdeleteMulti",{"title":"to delete"},1)).rejects.toThrow(TypeError)
    })
    afterAll( () => {
        let cleanup = new MongoClient(process.env.TEST_DB_CONNECT)
            cleanup.connect(()=>{
                let db = cleanup.db(process.env.TEST_DB_NAME)
                db.dropCollection("TESTdeleteMulti").then(()=>cleanup.close())
            }) 
    })
})  
  
