const MongoMan = require('../MongoMan');
const assert = require('chai').assert;
const expect = require('chai').expect;
require('dotenv').config();

describe("deleteMulti",function(){

beforeEach(async function (){
            let result = new MongoMan();
            result = await result.insertMany("TESTdeleteMulti",
            [
                {title:"findMulti ....1"},
                {title:"findMulti ....2"},
                {title:"findMulti ....3"},
                {title:"findMulti ....4"},
                {title:"findMulti ....5"}
            ]
        )
            assert.isOk(result)
        })
        it("passed delete all documents", async function(){
                        let result = new MongoMan();
                        let collection = "TESTdeleteMulti"
                        let query =  {}
                        let options = {}
                        result = await result.deleteMany(collection,query,options)         
                        assert.isString(result)
        })
        it("error input type not correct", async function(){
                    //TODO error with []{} for query and options should be implemented
                    let collection = [1,[],{}];
                    let query = [1,"argh"]
                    let options = [1,"argh"]
                    let result = new MongoMan();

                    for (let index = 0; index < collection.length; index++) {
                        const element = collection[index];
                        assert.instanceOf(await result.deleteMany(element,{},{}),TypeError)
                    }
                    for (let index = 0; index < query.length; index++) {
                        const element = query[index];
                        assert.instanceOf(await result.deleteMany("TESTdeleteMulti",element,{}),TypeError)
                    }
                    for (let index = 0; index < options.length; index++) {
                        const element = query[index];
                        assert.instanceOf(await result.deleteMany("TESTdeleteMulti",{},element),TypeError)
                    }
        })  
})
describe("if you r deleted only 1 document",function(){

    beforeEach("insertion..",async function(){
        let result = new MongoMan();
        result = await result.insertOne("TESTdeletedMulti",{title:"supressed unique"},{})
        assert.isOk(result);
    })
//WARNING MAYBE IS EXISTING N TUPLE OF SUPRESSED UNIQUE
    it("should return a message", async function(){    
                    let result = new MongoMan();
                    result = await result.deleteMany("TESTdeletedMulti",{title:"supressed unique"},{});
                    assert.isString(result);
                    assert.strictEqual(result,"you have only 1 document match you query it be deleted")
    })
})
                       
 

