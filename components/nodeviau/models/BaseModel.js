"use strict";

const BaseObject = require("../base/BaseObject");

/**
 * @module nodeviau/models/BaseModel
 * @author Itari <itari.onkar@gmail.com>
 * @licence MIT
 *
 * @class
 * @classdesc Base model class
 */
class BaseModel extends BaseObject{
    /**
     * Init base attributes.
     * @returns void
     */
    init(){
        this.errors = {};
    }
    
    /**
     * Returns existed attributes.
     * @returns {Array}
     */
    attributes(){
        return Object.keys(this);
    }

    /**
     * Returns labels.
     * @param attributes
     * @returns {{}}
     */
    labels(attributes = null){
        return {};
    }

    /**
     * Attributes rules.
     * @returns {{}}
     */
    rules(){
        return {};
    }

    /**
     * Validate attributes.
     * @param attributes
     * @returns {boolean}
     */
    validate(attributes = null){
        return true;
    }

    /**
     * Event executes before validate action.
     * @returns {boolean}
     */
    beforeValidate(){
        return true;
    }

    /**
     * Event executes after validate action.
     * @returns void
     */
    afterValidate(){
    }

    /**
     * Load data from some array.
     * @returns boolean
     */
    load(data = null){
        if(typeof data !== 'object' || Object.keys(data).length === 0){
            return false;
        }
        
        let dataKeys = Object.keys(data);
        for(let i = 0; i < dataKeys.length; i++){
            this[dataKeys[i]] = data[dataKeys[i]];
        }
        
        return true;
    }

    /**
     * Adds an error to attribute.
     * @param attributeName
     * @param errorText
     */
    addError(attributeName, errorText){
        if(typeof this.errors[attributeName] === 'undefined'){
            this.errors[attributeName] = [];
        }
        
        this.errors[attributeName].push(errorText);
    }

    /**
     * Returns has model errors on validation or not.
     * @returns {boolean}
     */
    hasErrors(){
        return Object.keys(this.errors).length > 0;
    }
    
}

module.exports = BaseModel;