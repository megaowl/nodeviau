"use strict";

const 
    BaseObject = require("../base/BaseObject"),
    StringHelper = require("../helpers/StringHelper");

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
        // errors object
        this.errors = {};
        
        // loaded validators
        this.validators = {};
        
        this.model();
    }

    /**
     * Load all basic attributes and basic settings of model.
     * 
     * @return void
     */
    model(){
    }
    
    /**
     * Returns names of attributes.
     * @returns {Array}
     */
    attributesNames(){
        return Object.keys(this);
    }

    /**
     * Returns names => values attributes pairs.
     * @returns {{}}
     */
    attributes(){
        let attributes = {}, keys = this.attributesNames;
        for(let i = 0, x = keys.length; i < x; i++){
            attributes[keys[i]] = this[keys[i]];
        }
        return attributes;
    }

    /**
     * Returns labels.
     * @returns {{}}
     */
    labels(){
        return {};
    }

    /**
     * Returns hints for attributes.
     * @returns {{}}
     */
    hints(){
        return {};
    }

    /**
     * Returns label for attribute.
     * @param attributeName
     * @returns {string}
     */
    getLabel(attributeName){
        return typeof this.labels()[attributeName] !== 'undefined'
            ? this.labels()[attributeName]
            : StringHelper.ucfirst(attributeName);
    }

    /**
     * Returns hint for attribute.
     * @param attributeName
     * @returns {string}
     */
    getHint(attributeName){
        return typeof this.hints()[attributeName] !== 'undefined'
            ? this.hints()[attributeName]
            : null;
    }

    /**
     * Attributes rules.
     * @returns []
     */
    rules(){
        return [];
    }

    /**
     * Validate attributes.
     * @param attributes
     * @returns {boolean}
     */
    validate(attributes = null){
        const rulesList = this.rules();
        
        // before validate action returns false - stop validation
        if(!this.beforeValidate()){
            return false;
        }
        
        // if rules is not set, call afterValidate() and returns
        if(rulesList.length === 0){
            this.afterValidate();
            return true;
        }
        
        // validate attrubutes
        for(let i = 0, ai = rulesList.length; i < ai; i++){
            // rule data is: [[attributesNames], validatorName, {params}]
            let ruleData = rulesList[i];
            
            // load or reload validator
            let validatorParams = typeof ruleData[2] !== 'undefined' ? ruleData[2] : {};
            let validatorName = StringHelper.ucfirst(ruleData[1]) + "Validator";
            
            if(typeof this.validators[validatorName] === 'undefined'){
                this.validators[validatorName] = new (require('../validators/' + validatorName))(validatorParams);
            }else{
                this.validators[validatorName].reloadParams(validatorParams);
            }
            
            // loop incoming attributes
            for(let x = 0, ax = ruleData[0].length; x < ax; x++){
                // attribute not found in validation list
                if(attributes !== null
                    && attributes.length > 0 
                    && attributes.indexOf(ruleData[0][x]) === -1){
                    continue;
                }
                // validate attribute
                this.validators[validatorName].validateAttribute(this, ruleData[0][x]);
            }
        }
        
        // call afterValidate()
        this.afterValidate();
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
    load(data = null, formName = null){
        if(typeof data !== 'object' || Object.keys(data).length === 0){
            return false;
        }
        
        if(formName === null){
            formName = this.constructor.name;
        }
        
        let 
            attributesNames = this.attributesNames(),
            attributesLoaded = 0;
        for(let i = 0; i < attributesNames.length; i++){
            let fieldName = formName + "[" + attributesNames[i] + "]";
            // load attribute
            if(typeof data[fieldName] !== 'undefined'){
                this[attributesNames[i]] = data[fieldName];
                attributesLoaded++;
            }
        }
        
        return attributesLoaded > 0;
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

    /**
     * Returns all errors.
     * @returns {{}|*}
     */
    getErrors(){
        return this.errors;
    }

    /**
     * Returns errors for attribute.
     * 
     * @param attributeName
     * @returns {null}
     */
    getError(attributeName){
        return typeof this.errors[attributeName] !== 'undefined' ? this.errors[attributeName] : null;
    }
    
}

module.exports = BaseModel;