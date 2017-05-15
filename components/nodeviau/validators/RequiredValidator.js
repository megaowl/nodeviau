"use strict";

const BaseValidator = require('./BaseValidator');

/**
 * @module nodeviau/validator/RequiredValidator
 * @author Itari <itari.onkar@gmail.com>
 * @licence MIT
 *
 * @class
 * @classdesc Required validator
 */
class RequiredValidator extends BaseValidator{
    /**
     * Checks is attribute defined and not empty.
     * 
     * @param model
     * @param attributeName
     */
    validateAttribute(model, attributeName){
        if(typeof model[attributeName] === 'undefined' 
            || (this.isScalar(model[attributeName]) && model[attributeName].toString().length === 0)
        ){
            model.addError(attributeName, 'Value is required.');
        }
    }
    
}

module.exports = RequiredValidator;