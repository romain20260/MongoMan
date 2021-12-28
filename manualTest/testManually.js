const MongoMan = require('../MongoMan');

let tester = new MongoMan(process.env.TEST_DB_CONNECT,process.env.TEST_DB_NAME);
let collection = "test";
//simple CRUD test
///////create
//1
let dataTestOne = {title : "azerty"};
tester.insertOne(collection,dataTestOne)

.then(()=>{
//2
     let dataArr = [{title : "one"},{title : "two"},{title:"three"},{title : "azerty"}]
     tester.insertMany(collection,dataArr)
})
.then(()=>{
//     ///////READ
//         //3
         let queryOne = {title: "one"}
         tester.findByOne(collection,queryOne)
         .then((data) => console.log(data)) 
})
.then(()=>{
            //4
                let queryAll = {}
                tester.findMulti(collection,queryAll,{limit:5})
                .then((data)=> console.log(data))
})
.then(()=>{
// ///////delete
                        //5
                        let queryDelete = {title:"azerty"};
                        tester.deleteOne(collection,queryDelete)
                        .then((m)=>console.log(m))
})
.then(()=>{
                                //6
                                let queryDeleteMany = {}
                                tester.deleteMany(collection,queryDeleteMany)
                                .then((m)=>console.log(m))
})
