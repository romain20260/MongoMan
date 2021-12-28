const ValidatorMan = require('../../ValidatorMan');

describe("collectionValidation", ()=>{
    test.each(["",1,["a"],{"a":"a"},[],{}])
    ("should throw error",collection=>{

            expect(()=>{
                (typeof collection === "string" && collection.length > 0)? collection :function(){throw new TypeError (`collection input no valid should be a STRING`)}();
                
                }
            ).toThrow(TypeError)
            //implement as a method collectionValidation TO ValidatorMan class
            expect(() => {
                ValidatorMan.collectionValidation(collection)
            }).toThrow(TypeError);


    })
    test.each(["",1,["a"],{"a":"a"},[],{}])
    ("message should be",collection=>{

        expect(()=>{
            (typeof collection === "string" && collection.length > 0)? collection :function(){throw new TypeError (`collection input no valid should be a STRING`)}();
            
            }
        ).toThrow(`collection input no valid should be a STRING`)
        //implement as a method collectionValidation TO ValidatorMan class
        expect(() => {
            ValidatorMan.collectionValidation(collection)
        }).toThrow(`collection input no valid should be a STRING`);

    })

            
})   


