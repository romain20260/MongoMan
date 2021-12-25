
describe("ArrValidation",()=>{

    test.each(["string",1,{}])
    ('arrValidation error throw ??', (arr) => {

        expect(()=>{
            (Array.isArray(arr))? arr : function(){throw new TypeError(` arr input should be a array of objects`)}();  
        })
        .toThrow(TypeError)
    });

    test.each(["string",1,{}])
    ('arrValidation message throw ??', (arr) => {

        expect(()=>{
        (Array.isArray(arr))? arr : function(){throw new TypeError(` arr input should be a array of objects`)}();  
        })
        .toThrow(" arr input should be a array of objects")
    })
})