let ValidatorMan = require('../../ValidatorMan');

describe("ArrDataValidation",()=>{

    test.each(["string",1,{}])
    ('arrValidation error throw ??', (arr) => {

        expect(()=>{
            (Array.isArray(arr))? arr : function(){throw new TypeError(` arr input should be a array of objects`)}();  
        }).toThrow(TypeError)
        //////implement as a method oarrDataValidation TO ValidatorMan class
        expect(()=>ValidatorMan.arrDataValidation(arr)).toThrow(TypeError)
    });

    test.each(["string",1,{}])
    ('arrValidation message throw ??', (arr) => {

        expect(()=>{
        (Array.isArray(arr))? arr : function(){throw new TypeError(` arr input should be a array of objects`)}();  
        })
        .toThrow(" arr input should be a array of objects")
        //////implement as a method oarrDataValidation TO ValidatorMan class
        expect(()=>ValidatorMan.arrDataValidation(arr)).toThrow(` arr input should be a array of objects`)
    })
})