"use strict";

const BaseValidator = require('./BaseValidator');

/**
 * @module nodeviau/validator/JsonValidator
 * @author Itari <itari.onkar@gmail.com>
 * @licence MIT
 *
 * @class
 * @classdesc Json text validator
 */
class JsonValidator extends BaseValidator{
    /**
     * Validate incoming attribute.
     * @param model
     * @param attributeName
     * @returns void
     */
    validateAttribute(model, attributeName){

        if(this.isEmptyAndIsAllowed(model, attributeName)){
            return;
        }
        
        let string = model[attributeName];
        if(typeof string !== 'string'){
            model.addError(attributeName, 'Attribute is not string.');
            return;
        }
        string = string.trim();
        
        try{
            JSON.parse(string);
        }catch(e){
            model.addError(attributeName, 'Invalid incoming JSON string.');
        }

    }
}

module.exports = JsonValidator;