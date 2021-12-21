
const MongoMan = require('../MongoMan');
const assert = require('chai').assert;
const expect = require('chai').expect;
require('dotenv').config();

describe('mongoMan', ()=>{

    

        describe("instance", ()=>{
                
                    it("no params ...its binding with env Var by default)" ,()=>
                    {
                        let result = new MongoMan()
                        assert.instanceOf(result,MongoMan)
                    })
                    it("make sure private things is not accessible outside class",()=>{
                        let result = new MongoMan()
                        assert.notProperty(result,"#client")
                        assert.notProperty(result,"#dbName")
                        assert.notProperty(result,"#getco()")
                    }) 
        })
       
       
})

