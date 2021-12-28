const MongoMan = require('../../MongoMan');
const {MongoClient} = require('mongodb');

require('dotenv').config();
let man = new MongoMan(process.env.TEST_DB_CONNECT,process.env.TEST_DB_NAME)

describe("findMulti()", function(){
 
    beforeEach( async () => {
        let data =  [{"title":"test unit OK for insertMany...."},{"title":".....suite test unit OK for insertMany"},{"title":"test unit OK for insertMany...."},
        {"title":".....suite test unit OK for insertMany"},{"title":"test unit OK for insertMany...."},{"title":".....suite test unit OK for insertMany"}]
        await expect(man.insertMany("TESTfindMulti",data,{})).resolves.toBe(true)  
    });
    test('should passed find all documents ', async () => {
        await expect(man.findMulti("TESTfindMulti",{},{})).resolves.toBeInstanceOf(Array)
    });
    test('should passed with op^tions find limit 5 ', async () => {
        await expect(man.findMulti("TESTfindMulti",{},{limit:5})).resolves.toBeInstanceOf(Array)
        await expect(man.findMulti("TESTfindMulti",{},{limit:5})).resolves.toHaveLength(5);
    });
    test('should have property', async () => {
        let data = await man.findMulti("TESTfindMulti",{},{limit:5})
        for (let index = 0; index < data.length; index++) {
            const test = data[index];
             expect(test).toHaveProperty("title");
             expect(test).toHaveProperty("_id");
        }
    });
    test('should error ', async () => {
        await expect(man.findMulti(1,{},{})).rejects.toThrow(TypeError);
        await expect(man.findMulti("TESTfindMulti",1,{})).rejects.toThrow(TypeError);
        await expect(man.findMulti("TESTfindMulti",{},1)).rejects.toThrow(TypeError);
    });
    afterAll( () => {
        let cleanup = new MongoClient(process.env.TEST_DB_CONNECT)
            cleanup.connect(()=>{
                let db = cleanup.db(process.env.TEST_DB_NAME)
                db.dropCollection("TESTfindMulti").then(()=>cleanup.close())
            }) 
    })

    // test('should error cause NOTfound  ', async () => {

    //     await expect(()=>man.findByOne("TESTfindOne",{title:"insertMany...."})).rejects.toThrow(Error);
    //     await expect(()=>man.findByOne("TESTfindOne",{title:"insertMany...."})).rejects.toThrow("can find any result on your request, check twice pls your collection name and query object");
    // });
    // test("error input", async ()=>{
    //     await expect(()=>man.findByOne("TESTfindOne",1)).rejects.toThrow(Error);
    //     await expect(()=>man.findByOne(1,{title:"test unit OK for insertMany...."})).rejects.toThrow(Error);
    //     await expect(()=>man.findByOne("TESTfindOne",{title:"test unit OK for insertMany...."},1)).rejects.toThrow(Error);
    // })
  
   
})  
  
