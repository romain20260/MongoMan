describe('queryValidation', ()=>{

    test.each(["string",1])
    ("error should be trigger",(query) => {
 
        expect(() => {
          (typeof query === "object")? query : function(){throw new TypeError(`query input should be a object`)}();
             
        }).toThrow(TypeError);       
    })
    test.each(["string",1])
    ("message should be ",(query) => {
 
        expect(() => {
          (typeof query === "object")? query : function(){throw new TypeError(`query input should be a object`)}();
             
        }).toThrow(`query input should be a object`);       
    })
})

