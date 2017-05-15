"use strict";

const BaseValidator = require('./BaseValidator');

/**
 * @module nodeviau/validator/StringValidator
 * @author Itari <itari.onkar@gmail.com>
 * @licence MIT
 *
 * @class
 * @classdesc String validator
 */
class StringValidator extends BaseValidator{
    /**
     * Check value is string.
     * @param model
     * @param attributeName
     */
    validateAttribute(model, attributeName){
        if(this.isEmptyAndIsAllowed(model, attributeName)){
            return;
        }
        
        if(typeof model[attributeName] !== 'string'){
            model.addError(attributeName, 'Value must be a string.');
            return;
        }
        
        if(typeof this.min !== 'undefined' && model[attributeName].length < this.min){
            model.addError(attributeName, 'Value can not be less than ' + this.min + " symbols.");
            return;
        }
        
        if(typeof this.max !== 'undefined' && model[attributeName].length > this.max){
            model.addError(attributeName, 'Value can not be more than ' + this.max + " symbols.");
            return;
        }
    }
}

module.exports = StringValidator;