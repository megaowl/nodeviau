"use strict";

const BaseValidator = require('./BaseValidator');

/**
 * @module nodeviau/validator/NumberValidator
 * @author Itari <itari.onkar@gmail.com>
 * @licence MIT
 *
 * @class
 * @classdesc Number (integer and float) validator
 */
class NumberValidator extends BaseValidator{
    /**
     * Init arguments.
     */
    init(){
        super.init();
        
        if(typeof this.canFloat === 'undefined'){
            this.canFloat = true;
        }
    }
    
    /**
     * Validate attribute which must be a number.
     * @param model
     * @param attributeName
     * @returns void
     */
    validateAttribute(model, attributeName){
        
        if(this.isEmptyAndIsAllowed(model, attributeName)){
            return;
        }
        
        let checkValue = model[attributeName];
        
        if(isNaN(checkValue)){
            model.addError(attributeName, "Value must be number.");
            return;
        }

        // value can not be float
        if(this.canFloat === false
            && (+checkValue === checkValue && (!isFinite(checkValue) || !!(checkValue % 1)))
        ){
            model.addError(attributeName, "Value can not be float.");
            return;
        }
        
        // if defined min or max
        if(typeof this.min !== 'undefined' && model[attributeName] < this.min){
            model.addError(attributeName, "Value can not be less than " + this.min +".");
            return;
        }
        
        if(typeof this.max !== 'undefined' && model[attributeName] > this.max){
            model.addError(attributeName, "Value can not be more than " + this.max +".");
            return;
        }
    }
}

module.exports = NumberValidator;