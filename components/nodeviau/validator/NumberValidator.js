"use strict";

const BaseValidator = require('BaseValidator');

/**
 * @module nodeviau/validator/NumberValidator
 * @author Itari <itari.onkar@gmail.com>
 * @licence MIT
 *
 * @class
 * @classdesc Number validator
 */
class NumberValidator extends BaseValidator{
    /**
     * Validate attribute which must be a number.
     * @param model
     * @param attributeName
     * @returns void
     */
    validateAttribute(model, attributeName){
        if(Number.isNaN(model[attributeName])){
            model.addError(attributeName, "Value must be number.");
        }
    }
}

module.exports = NumberValidator;