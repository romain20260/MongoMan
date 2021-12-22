const MongoMan = require('../MongoMan');
const assert = require('chai').assert;
const expect = require('chai').expect;
require('dotenv').config();

describe("findMulti",function(){

before(async function (){
            let result = new MongoMan();
            result = await result.insertMany("TESTfindMulti",
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

        it("passed find all documents", async function(){
             
                        let result = new MongoMan();
                        let collection = "TESTfindMulti"
                        let query =  {}
                        let options = {}
                        result = await result.findMulti(collection,query,options)
                        assert.isArray(result)
                        for (const index in result) {
                            assert.property(result[index],"title")
                            assert.property(result[index],"_id")
                        }
                     })
        it("passed find options 5 documents", async function(){

           let result = new MongoMan();
           let collection = "TESTfindMulti"
           let query =  {}
           let options = {limit:5}
           result = await result.findMulti(collection,query,options)
           assert.isArray(result)
           assert.lengthOf(result,options.limit)
           for (const index in result) {
               assert.property(result[index],"title")
               assert.property(result[index],"_id")
           }
        })
        it("return error if can't find anything ", async function(){
                        let result = new MongoMan();
                        let collection = "TESTfindOne"
                        let query =  {title :"don't exist"}
                        let options = {}
                        result = await result.findMulti(collection,query,options)
                        assert.instanceOf(result,Error)          
                    })
        it("return error if collection is not a string", async function(){
                        let result = new MongoMan();
                        let collection = [1,{},[]]
                        let query =  {}
                        let options = {}
                        for (const value of collection) {
                            assert.instanceOf(await result.findMulti(value,query,options),Error)   
                        }    
        })
        it("return error if query is not a object", async function(){
            let result = new MongoMan();
            let collection = "TESTfindMulti"
            ///TODOintergrated {} in invalid error
            // error is error from mongoclient not from are root module 
            let query =  [[],"test",1]
            let options = {}
            for (const value of query) {
                assert.instanceOf(await result.findMulti(collection,value,options),Error)   
            }
        })
        it("return error if options is not a object", async function(){
                let result = new MongoMan();
                let collection = "TESTfindMulti"
                let query =  {}
                ///TODOintergrated [] in invalid error
                // error is error from mongoclient not from are root module 
                let options = [[],"a",5]
                for (const value of options) {
                    assert.instanceOf(await result.findMulti(collection,options,value),Error)   
            }
        })
           
                
            
              
})
                    //  

                    // })
                    //  it("error data", async function(){
                    //      //TODO make sure a empty array is return a error and also a array of empty objects
                    //      let result = new MongoMan();
                    //      let collection = "testMany"
                    //      //let data =  ["a",1,{},[],[{},{}]];
                    //      let data =  ["a",1,{}];
                    //      for (const iterator of data) {
                    //          let resultTest = await result.insertMany(collection,iterator);
                    //          assert.instanceOf(resultTest,TypeError)
                      
                    //      }
                  
                    //  })
    
    
 

