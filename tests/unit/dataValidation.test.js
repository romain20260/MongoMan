
describe('dataValidation', ()=>{
       //TODOmake sure object array doesn t pass 
            test.each([1,"string"])
            ("should throw a error" , data=>
            {
                expect(()=>{
                (typeof data === "object")? data : function(){throw new TypeError (`data input should be a valid object`)}();
                })
                .toThrow(TypeError)
            }
            )
            test.each([1,"string"])
            ("message should be" , data=>
            {
                expect(()=>{
                (typeof data === "object")? data : function(){throw new TypeError (`data input should be a valid object`)}();
                })
                .toThrow(`data input should be a valid object`)
            }
            )         
       
})

