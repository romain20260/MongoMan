class ValidatorMan{

static collectionValidation(collection){
    (typeof collection === "string" && collection.length > 0)? collection :function(){throw new TypeError (`collection input no valid should be a STRING`)}();
}
//TODOmake sure data is a object prototype only object 
static dataValidation(data){
(typeof data === "object")? data : function(){throw new TypeError (`data input should be a valid object`)}();
}
//TODO link to is unit make sure to check is the arrays is not ermpty and don t contain empty objects 
static arrDataValidation(arr){
(Array.isArray(arr))? arr : function(){throw new TypeError(` arr input should be a array of objects`)}();
}
static queryValidation(query){
(typeof query === "object")? query : function(){throw new TypeError(`query input should be a object`)}();    
}
static optionsValidation(options){
(!options || typeof options === "object")? options : function(){throw new TypeError(`options input should be a valid object`)}();

}

}
module.exports = ValidatorMan;