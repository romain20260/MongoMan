const ValidatorMan = require('../../ValidatorMan');
describe('queryValidation', ()=>{

    test.each(["string",1])
    ("error should be trigger",(query) => {
 
        expect(() => {
          (typeof query === "object")? query : function(){throw new TypeError(`query input should be a object`)}();
             
        }).toThrow(TypeError);
        //implement as method queryValidation TO ValidatorMAN Class
        expect(() => {
          ValidatorMan.queryValidation(query)
        }).toThrow(TypeError);       
    })
    test.each(["string",1])
    ("message should be ",(query) => {
 
        expect(() => {
          (typeof query === "object")? query : function(){throw new TypeError(`query input should be a object`)}();
             
        }).toThrow(`query input should be a object`);
          //implement as method queryValidation TO ValidatorMAN Class
          expect(() => {
            ValidatorMan.queryValidation(query)
          }).toThrow(`query input should be a object`);          
    })
})

