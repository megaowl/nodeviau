"use strict";

const BaseObject = require('../base/BaseObject');

/**
 * @module nodeviau/validator/BaseValidator
 * @author Itari <itari.onkar@gmail.com>
 * @licence MIT
 *
 * @class
 * @classdesc Base validator interface
 */
class BaseValidator extends BaseObject{
    /**
     * Init base values if not set.
     */
    init(){
        // attribute can be empty
        if(typeof this.allowEmpty === 'undefined'){
            this.allowEmpty = true;
        }
    }
    
    validateAttribute(model, attributeName){
        
    }

    /**
     * Returns true if value is scalar.
     * @param value
     * @returns {boolean}
     */
    isScalar(value){
        return (typeof value === 'number'
            || typeof value === 'string'
            || typeof value === 'boolean'
        );
    }

    /**
     * Attribute is undefined and can be empty or attribute was defined but empty.
     * @param model
     * @param attributeName
     * @returns {boolean}
     */
    isEmptyAndIsAllowed(model, attributeName){
        return (typeof model[attributeName] === 'undefined' && this.allowEmpty)
            || (this.isScalar(model[attributeName]) && model[attributeName].toString().length === 0 && this.allowEmpty);
    }

    /**
     * Reload params for loaded validator.
     * @param newParams
     */
    reloadParams(newParams){
        let keys = Object.keys(newParams);
        for(let i = 0; i < keys.length; i++){
            this[keys[i]] = newParams[keys[i]];
        }
    }
}

module.exports = BaseValidator;