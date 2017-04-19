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
        if(typeof config === 'object'){
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

}

module.exports = BaseObject;