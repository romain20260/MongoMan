
describe('OptionsValidation', ()=>{
     ///TODO different input
           test.each(["string"])
           ("TypeError should be trigger" ,(options)=>
            {
              expect(()=>{
                  (!options || typeof options === "object")? options : function(){throw new TypeError(`options input should be a valid object`)}(); 
              }).toThrow(TypeError)

            })
            test.each(["string"])
            ("messsage should be",(options)=>{
              expect(()=>{
                (!options || typeof options === "object")? options : function(){throw new TypeError(`options input should be a valid object`)}(); 
            }).toThrow("options input should be a valid object")

            })       
           
})

