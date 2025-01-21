import { isValidationOptions } from "class-validator";
import { ClassValidatorFields } from "../../domain/validators/class-validator-fields"
import { FieldsErrors } from "../../domain/validators/validator-fields-interface";
import { EntityValidationError } from "../../domain/validators/validation.error";

type Expected = 
 | {
    validator: ClassValidatorFields<any>; 
    data: any;
   }
 | (() => any);

expect.extend({
    containsErrorMessages(expected: Expected, received: FieldsErrors) {
        if (typeof expected === "function") {
            try{
                expected();
                return isValid();
            }catch(e){
                const error = e as EntityValidationError;
                return assertContainsErrorMessages(error.error, received);
            }
        } else {
            const {validator, data } = expected;
            const validated = validator.validate(data);

            if (validated){
                return isValid();
            }

            return assertContainsErrorMessages(validator.erros, received);
        }
    },
});

function assertContainsErrorMessages(expected: FieldsErrors, received: FieldsErrors) {
    const isMatch = expect.objectContaining(received).asymmetricMatch(expected);
    
    return isMatch
    ? isValid()
    : {
        pass: false,
        message: () => `Expected ${JSON.stringify(expected)} to contain ${JSON.stringify(received)}`
    }
}

function isValid() {
    return {
        pass: true,
        message: () => ""
    }
}