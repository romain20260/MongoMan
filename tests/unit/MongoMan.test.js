
const MongoMan = require('../../MongoMan');
require('dotenv').config();

describe('mongoMan', ()=>{

                    test("no params ...its binding with env Var by default)" ,()=>
                    {
                        expect(new MongoMan()).toBeInstanceOf(MongoMan)
                    })
                    test("params input define in constructu",()=>{
                        expect(new MongoMan(process.env.TEST_DB_CONNECT,process.env.TEST_DB_NAME)).toBeInstanceOf(MongoMan);
                    })
                    test("make sure private things is not accessible outside class",()=>{
                        expect(new MongoMan()).not.toHaveProperty("#client")
                        expect(new MongoMan()).not.toHaveProperty("#dbName")
                    }) 
        })
       
       


