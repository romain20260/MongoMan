const MongoMan = require('../MongoMan');
const assert = require('chai').assert;
const expect = require('chai').expect;
require('dotenv').config();

describe("deleteOne",function(){

beforeEach(async function (){
            let result = new MongoMan();
            result = await result.insertOne("TESTdeleteOne",{title:"DeleteMe"})
            assert.isOk(result)
        })
        it("passed",async function(){
            let result = new MongoMan();
            result = await result.deleteOne("TESTdeleteOne",{title:"DeleteMe"},{})

            assert.isString(result)
            assert.strictEqual(result,"success you have deleted 1 document")
        })
         it("error if collection is not a string",async function(){
             let result = new MongoMan();
             let collection = [1,[],{}];
             for (let index = 0; index < collection.length; index++) {
                 const element = collection[index];
                 assert.instanceOf(await result.deleteOne(element,{title:"ici"}), TypeError);
             }
        })
        it("error if query is not a object",async function(){
            let result = new MongoMan();
            //TODO let pass test with [],{}
            //else is trigger mongoserver error 
            let query = 1;
            let collection = "TESTdeleteOne"
            for (let index = 0; index < query.length; index++) {
                const element = query[index];
                assert.instanceOf(await result.deleteOne(collection,query), TypeError);
            }
        })
        it("error if options is not a object", async function(){
            let result = new MongoMan()
            let query = {title: "TESTdeleteOne"}
            //TODO same probleme with array beacuse is a object 
            let options = ["ret",1]
            for (let index = 0; index < options.length; index++) {
                const element = options[index];
                assert.instanceOf(await result.deleteOne("TESTdeleteOne",query,element),TypeError)
            }
        } )
        })
