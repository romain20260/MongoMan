const MongoMan = require('../MongoMan');
const assert = require('chai').assert;
const expect = require('chai').expect;
require('dotenv').config();
    describe("insertOne()", function(){
          
                    it("passed", async function(){
                        let result = new MongoMan();
                        let collection = "TESTOne"
                        let data = {"title":"test unit OK for insertOne"}
                        result = await result.insertOne(collection,data)
                        assert.isOk(result)
                       
                    })
                    it("error collection", async function(){
                        let result = new MongoMan();
                        let collection = [1,["arr"],{a:1},[],{object:"test"},{},];
                        let data = {title:"test error collection WARNING"}
                         for (const iterator of collection) {
                              let resultTest = await result.insertOne(iterator,data);
                               assert.instanceOf( resultTest,TypeError)
                         }

                    })
                    //TODO build this test unit
                    // if data is a string , number, array should return a error 
                    // it("error data", async function(){
                    //     let result = new MongoMan();
                    //     let collection = "testOne" 
                    //     let data =  ["a",1,[]];
                    //     for (const iterator of data) {
                    //         let resultTest = await result.insertOne(collection,iterator);
                    //         assert.instanceOf(resultTest,TypeError)
                            
                    //     }
                        
                    //})
    
    
    })

