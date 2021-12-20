const MongoMan = require('../MongoMan');

let tester = new MongoMan();
let collection = "testOne";

//simple CRUD test
///////create
//1
let dataTestOne = {title : "azerty"};
tester.insertOne(collection,dataTestOne)
//2
let dataArr = [{title : "one"},{title : "two"},{title:"three"},{title : "azerty"}]
tester.insertMany(collection,dataArr)
///////READ
//3
let queryOne = {title: "one"}
tester.findByOne(collection,queryOne)
.then((data) => console.log(data))
//4
let queryAll = {}
tester.findMulti(collection,queryAll,{limit:5})
.then((data)=> console.log(data))
///////delete
//5
let queryDelete = {title:"azerty"};
tester.deleteOne(collection,queryDelete)
.then((m)=>console.log(m))
//6
let queryDeleteMany = {}
tester.deleteMany(collection,queryDeleteMany)
.then((m)=>console.log(m))