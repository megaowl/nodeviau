"use strict";

const BaseValidator = require('BaseValidator');

/**
 * @module nodeviau/validator/EmailValidator
 * @author Itari <itari.onkar@gmail.com>
 * @licence MIT
 *
 * @class
 * @classdesc Email address validator
 */
class EmailValidator extends BaseValidator{
    /**
     * Initialize regex.
     */
    init(){
        this.regex =/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    }

    /**
     * Validate incoming attribute.
     * @param model
     * @param attributeName
     * @returns void
     */
    validateAttribute(model, attributeName){
        let email = model[attributeName];
        
        if(typeof model[attributeName] !== 'string' || model[attributeName].length === 0){
            model.addError(attributeName, 'Value can not be empty.');
            return;
        }

        if(email.length > 254){
            model.addError(attributeName, 'Email address is too big.');
            return;
        }

        let valid = this.regex.test(email);
        if(!valid){
            model.addError(attributeName, 'Incoming string is not valid email address.');
            return;
        }

        let parts = email.split("@");
        if(parts[0].length > 64){
            model.addError(attributeName, 'Email address is not valid.');
            return;
        }

        let domainParts = parts[1].split(".");
        if(domainParts.some((part)  => { 
            return part.length > 63; 
        })){
            model.addError(attributeName, 'Email domain group is not valid.');
            return;
        }
    }
}

module.exports = EmailValidator;