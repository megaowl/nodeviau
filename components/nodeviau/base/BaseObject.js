"use strict";

/**
 * @module nodeviau/base/BaseObject
 * @author Itari <itari.onkar@gmail.com>
 * @licence MIT
 *
 * @class
 * @classdesc Base object class
 */
class BaseObject{
    /**
     * Base object constructor
     * @param config
     */
    constructor(config = null){
        // add configuration if it needed
        if(typeof config === 'object' && config !== null){
            let keys = Object.keys(config);
            for(let i = 0, k = keys.length; i < k; i++){
                this[keys[i]] = config[keys[i]];
            }
        }

        this.init();
    }

    /**
     * This method will be called at end of constructor.
     */
    init(){
    }

    /**
     * Returns attribute of current object.
     * @param attributeName
     * @returns mixed
     */
    getAttribute(attributeName){
        return this[attributeName] === 'undefined' ? null : this[attributeName];
    }

    /**
     * Returns attributes count.
     * @returns {Number}
     */
    get length(){
        return Object.keys(this).length;
    }
    
}

module.exports = BaseObject;