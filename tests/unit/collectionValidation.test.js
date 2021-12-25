describe("collectionValidation", ()=>{
    test.each(["",1,["a"],{"a":"a"},[],{}])
    ("should throw error",input=>{

            expect(()=>{
                (typeof collection === "string" && collection.length > 0)? collection :function(){throw new TypeError (`collection input no valid should be a STRING`)}();
                
                }
            ).toThrow(TypeError)

    })
    test.each(["",1,["a"],{"a":"a"},[],{}])
    ("message should be",input=>{

        expect(()=>{
            (typeof collection === "string" && collection.length > 0)? collection :function(){throw new TypeError (`collection input no valid should be a STRING`)}();
            
            }
        ).toThrow(`collection input no valid should be a STRING`)

    })

            
})   


