const MongoMan = require('../../MongoMan');
const assert = require('chai').assert;
const expect = require('chai').expect;
require('dotenv').config();

describe("findByOne",function(){

before(async function (){
            let result = new MongoMan();
            result = await result.insertOne("TESTfindOne",{title:"findOne"})
            assert.isOk(result)
        })

        it("passed", async function(){
                        let result = new MongoMan();
                        let collection = "TESTfindOne"
                        let query =  {title :"findOne"}
                        let options = {}
                        result = await result.findByOne(collection,query,options)
                        assert.isObject(result)
                        assert.strictEqual(result.title,"findOne")
                
                    })
        it("return error if can't find anything ", async function(){
                        let result = new MongoMan();
                        let collection = "TESTfindOne"
                        let query =  {title :"don't exist"}
                        let options = {}
                        result = await result.findByOne(collection,query,options)
                        assert.instanceOf(result,Error)          
                    })
        it("return error if collection is not a string", async function(){
                        let result = new MongoMan();
                        let collection = [1,{},[]]
                        let query =  {title :"findOne"}
                        let options = {}
                        for (const value of collection) {
                            assert.instanceOf(await result.findByOne(value,query,options),Error)   
                        }    
        })
        it("return error if query is not a object", async function(){
            let result = new MongoMan();
            let collection = "TESTfindOne"
            ///TODOintergrated {} in invalid error
            // error is error from mongoclient not from are root module 
            let query =  [[],"test",1]
            let options = {}
            for (const value of query) {
                assert.instanceOf(await result.findByOne(collection,value,options),Error)   
            }
        })
        it("return error if options is not a object", async function(){
                let result = new MongoMan();
                let collection = "TESTfindOne"
                let query =  {title :"findOne"}
                ///TODOintergrated [] in invalid error
                // error is error from mongoclient not from are root module 
                let options = [[],"a",5]
                for (const value of options) {
                    assert.instanceOf(await result.findByOne(collection,options,value),Error)   
            }
        })
           
                
            
              
})
