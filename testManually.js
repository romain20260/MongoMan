const MongoMan = require('./MongoMan');

let man = new MongoMan();

async function test(callback){
    
    try {
        let result = await callback(arguments[1],arguments[2],arguments[3])
        console.log(result);
    } catch (error) {
        console.log(error);
        return 
    }
}
 
//test(man.insertOne,1,{title:"test"});