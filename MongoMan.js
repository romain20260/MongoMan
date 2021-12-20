const {MongoClient} = require('mongodb');
require('dotenv').config()
/**
 * Class representing a wrapper using MongoClient.<br>
 * method is asynchrone, much return a promise than you can manage with async/await OR with .then()
 */
class MongoMan{
    /**
     * 
     * @param {string} dbConnection - represent the db connection endpoints (by default is come from .env a variable name DB_CONNECT )
     * @param {string} dbName - represent the Db name (by default is come from .env a variable name DB_NAME)
     * @default [process.env.DB_CONNECT,process.env.DB_NAME] 
     */
    #client
    #dbName

    constructor(dbConnection=process.env.DB_CONNECT,dbName=process.env.DB_NAME){
    this.#client = new MongoClient(dbConnection);
    this.#dbName = dbName

    }
//private function to return the connection
async #getCo(collection){
    await this.#client.connect();//made the connection 
        return this.#client.db(this.#dbName).collection(collection);//return the connection with the collection target 
}
///
/**method to insert one document to a collection
 * @param {string} collection -the name of wish collection  you wanna add your document can exist or not (the collection will be create)
 * @param {object} data - represent the document json to insert
 * @throws {InvalidArgumentException} throw an error if the type of argument collection is not a string OR argument data is not a object
 */
async insertOne(collection,data)
{
    try {
        //////check the arg type insert by the caller 
        collection = (typeof collection === "string")? collection : (function(){throw `IN function insertOne firts arg should be a string representing the collection to store the document if the collection is not create, a collection will be create by the process`}());
        data = (typeof data === "object")? data : (function(){throw `IN function insertOne second arg should be a object respresenting the document to insert into database`}());
        /////////////////////////////////////////////
        let collect = await this.#getCo(collection);
        collect.insertOne(data);//execute the query 
    } catch (error) {
        console.log(error);
    }      
} 
/**method to insert multiple documents to a collection
 * 
 * @param {string} collection -the name of wish collection  you wanna add your document can exist or not (the collection will be create)
 * @param {Array<object>} arr - represent a array of objects representing each the document json to insert
 * @throws {InvalidArgumentException} throw an error if the type of argument collection is not a string OR argument arr is not a array
 */
async insertMany(collection,arr)
{
    try {
        //////check the arg type insert by the caller 
        collection = (typeof collection === "string")? collection : (function(){throw `IN function insertMany firts arg should be a string representing the collection to store the document if the collection is not create, a collection will be create by the process`}());
        arr = (Array.isArray(arr))? arr : (function(){throw `IN function insertMany second arg should be a array of object respresenting the documents to insert into database`}());
        /////////////////////////////////////////////
        let collect = await this.#getCo(collection);
        collect.insertMany(arr);//execute the query 
    } catch (error) {
        console.log(error);
    }       
} 
/**method to find One document from a collection
 * 
 * @param {string} collection -the name of target collection where you can find the document
 * @param {object} query - a object represent the query of your request 
 * @param {object} [options] - if you wanna specify optionnal options to your request
 * @throws {InvalidArgumentException} throw an error if the type of argument collection is not a string OR argument query is not a object OR argument options is present and isn't a object
 * @returns {promise<object>} - object of your request
 */
async findByOne(collection,query,options){
    try {
        //////check the arg type insert by the caller 
        collection = (typeof collection === "string")? collection : (function(){throw `IN function findByOne firts arg should be a string representing the collection where the document is stored`}());
        query = (typeof query === "object")? query : (function(){throw `IN function findByOne second arg should be a object respresenting the query to execute `}());
        options = (!options || typeof options === "object")? options : (function(){throw `IN function findByOne third(optionnel) arg should be a object respresenting the options of the query to execute `}());
        /////////////////////////////////////////////
        let collect = await this.#getCo(collection);//made the connection 
        let result = collect.findOne(query,options)
        //TODO can we checj inside dbmongo official client if we can catch the error like to precise if the name of collection does'nt exist
        result = (result === null)?(function(){throw `type null , check if the name of collection is correct also if the query is correct OR we can't find any match in the database`}()):result;
        return result
    } catch (error) {
        console.log(error);
    }
}
//TODO add possibilites to retrieve a object of objects instead of a array 
/**method to find Multiple documents from a collection
 * 
 * @param {string} collection -the name of target collection where you can find the documents
 * @param {object} query - a object represent the query of your request 
 * @param {object} [options] - if you wanna specify optionnal options to your request
 * @throws {InvalidArgumentException} throw an error if the type of argument collection is not a string OR argument query is not a object OR argument options is present and isn't a object
 * @returns {promise<array<object>>} - a array of objects of your request
 */
async findMulti(collection,query,options){
    try {
         //////check the arg type insert by the caller 
         collection = (typeof collection === "string")? collection : (function(){throw `IN function findByMulti arg should be a string representing the collection where the document is stored`}());
         query = (typeof query === "object")? query : (function(){throw `IN function findMulti second arg should be a object respresenting the query to execute `}());
         options = (!options || typeof options === "object")? options : (function(){throw `IN function findMulti third(optionnel) arg should be a object respresenting the options of the query to execute `}());
         /////////////////////////////////////////////
        let collect = await this.#getCo(collection);
        let cursor = collect.find(query,options)//that return a object call Cursor that a can call the methaod toarray to parse the reslut a put in a array 
        // can be refactoc to : return coollect.find().toarray
        // can be chained
        return cursor.toArray()
    } catch (error) {
        console.log(error);
    }
}
///
///
/**method to delete one document from a collection
 * 
 * @param {string} collection -the name of target collection where you wanna delete the document
 * @param {object} data - a object represent the query of your request 
 * @param {object} [options] - if you wanna specify optionnal options to your request
 * @throws {InvalidArgumentException} throw an error if the type of argument collection is not a string OR argument query is not a object OR argument options is present and isn't a object
 * @throws {ProcessError} throw an error if the request fail 
 * @returns {string} - a sucess message 
 */
async deleteOne(collection,query,options){
    try {
        //////check the arg type insert by the caller 
        collection = (typeof collection === "string")? collection : (function(){throw `IN function DeleteOne firts arg should be a string representing the collection where the document is stored`}());
        query = (typeof query === "object")? query : (function(){throw `IN function deleteOne second arg should be a object respresenting the query to execute `}());
        options = (!options || typeof options === "object")? options : (function(){throw `IN function DeleteOne third(optionnel) arg should be a object respresenting the options of the query to execute `}());
        /////////////////////////////////////////////
        let collect = await this.#getCo(collection)
        let result = await collect.deleteOne(query,options)//delete return une promise
        //TODO refacto to ternairy condition return 
        if(result.deletedCount === 1){
            return "success you have deleted 1 document";
        }
        else if (result.deletedCount > 1 ){
            return `you ave deleted more than 1 document ....deleted count : ${result.deletedCount}`;
        }
        else{
            throw `a error occured you didn't delete any document`
        }

    } catch (error) {
        console.log(error);
        
    }
}
///
/**method to delete many documents from a collection
 * 
 * @param {string} collection -the name of target collection where you wanna delete the documents
 * @param {object} data - a object represent the query of your request if is EMPTY object it will deleted all documents in the collections
 * @param {object} [options] - if you wanna specify optionnal options to your request
 * @throws {InvalidArgumentException} throw an error if the type of argument collection is not a string OR argument query is not a object OR argument options is present and isn't a object
 * @throws {ProcessError} throw an error if the request fail 
 * @returns {string} - a sucess message 
 */
async deleteMany(collection,query,options){
    try {
        //////check the arg type insert by the caller 
        collection = (typeof collection === "string")? collection : (function(){throw `IN function deleteMany firts arg should be a string representing the collection where the document is stored`}());
        query = (typeof query === "object")? query : (function(){throw `IN function DeleteMany second arg should be a object respresenting the query to execute `}());
        options = (!options || typeof options === "object")? options : (function(){throw `IN function deleteMany third(optionnel) arg should be a object respresenting the options of the query to execute `}());
        /////////////////////////////////////////////

        let collect = await this.#getCo(collection)
        let result = await collect.deleteMany(query,options)

        //TODO refacto to ternairy condition return 
        if(result.deletedCount === 1){
            return"you have only 1 document match you query it be deleted";
        }
        else if (result.deletedCount > 1 ){
            return`deleted count : ${result.deletedCount}`;
        }
        else{
            throw `a error occured you didn't delete any document`
        }
    } catch (error) {
        console.log(error);
    }
}


}
module.exports = MongoMan;
