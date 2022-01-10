#  MONGOMAN
######   a mongowrapper

- "KISS" CRUD for mongo database
-  wrapp from mongo-driver official
-  easy-to-use simple crud asynchronus method
------------
### installation

use npm to install 
```bash
$ npm install wrap_mongoman
``` 

------------

### started guide
- after install the package you just have to setup your .env file 
with 2 variable : <br>
 DB_CONNECT<br>DB_NAME
 ```
DB_CONNECT= your url connection
DB_NAME = your database
TEST_DB_CONNECT = your url connection
TEST_DB_NAME = "mongoManTEST"


 ```

 - after that you just have to initialize MongoMan and to use the async method

```
const MongoMan = require('wrap_mongoman');

let ManOne = new MongoMan()
let collection = "NameOfCollection"
let query = {title:"hello World"}

ManOne.insertOne(collection,query)
```
------------

### documentation Api

- you have auto-gen jsDoc on referenceDoc folder 
- or
- https://mongoman.romainbousquie.com


------------
##### more info
