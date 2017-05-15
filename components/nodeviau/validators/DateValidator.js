"use strict";

const 
    BaseValidator = require('./BaseValidator'),
    DateHelper = require('../helpers/DateHelper');

/**
 * @module nodeviau/validator/DateValidator
 * @author Itari <itari.onkar@gmail.com>
 * @licence MIT
 *
 * @class
 * @classdesc Date and time validator
 */
class DateValidator extends BaseValidator{
    /**
     * Init base variables.
     */
    init(){
        super.init();
        
        if(typeof this.format === 'undefined'){
            this.format = 'Y-m-d';
        }
    }
    
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

        if(!DateHelper.strtotime(string, DateHelper.time())){
            model.addError(attributeName, 'Entered date is wrong.');
        }
    }
}

module.exports = DateValidator;