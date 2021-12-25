
const MongoMan = require('../../MongoMan');
require('dotenv').config();

describe('mongoMan', ()=>{

                    test("no params ...its binding with env Var by default)" ,()=>
                    {
                        let test = new MongoMan()
                        expect(test).toBeInstanceOf(MongoMan)
                    })
                    test("make sure private things is not accessible outside class",()=>{
                        let result = new MongoMan()
                        expect(result).not.toHaveProperty("#client")
                        expect(result).not.toHaveProperty("#dbName")
                    }) 
        })
       
       


