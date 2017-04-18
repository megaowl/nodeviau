"use strict";

/**
 * Base object class.
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
     * This method will be called after costructor will be running.
     */
    init(){
    }

}

module.exports = BaseObject;