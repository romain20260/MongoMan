const MongoMan = require('../MongoMan');
const assert = require('chai').assert;
const expect = require('chai').expect;
require('dotenv').config();
    describe("insertMany()", function(){
          
                    it("passed", async function(){
                        let result = new MongoMan();
                        let collection = "TESTmany"
                        let data =  [{"title":"test unit OK for insertMany...."},{"title":".....suite test unit OK for insertMany"}]
                        result = await result.insertMany(collection,data)
                        assert.isOk(result)
                       
                    })
                     it("error collection", async function(){
                         let result = new MongoMan();
                         let collection = [1,["arr"],{a:1},[],{object:"test"},{},];
                         let data =  [{"title":"WARNING test unit OK for insertMany...."},{"title":"WARNING .....suite test unit OK for insertMany"}]
                          for (const iterator of collection) {
                                let resultTest = await result.insertMany(iterator,data);
                                assert.instanceOf( resultTest,TypeError)
                          }

                    })
                     it("error data", async function(){
                         //TODO make sure a empty array is return a error and also a array of empty objects
                         let result = new MongoMan();
                         let collection = "TESTmany"
                         //let data =  ["a",1,{},[],[{},{}]];
                         let data =  ["a",1,{}];
                         for (const iterator of data) {
                             let resultTest = await result.insertMany(collection,iterator);
                             assert.instanceOf(resultTest,TypeError)
                      
                         }
                  
                     })
    
    
    })

