"use strict";

const 
    BaseObject = require('../base/BaseObject'),
    Winston = require('winston');

/**
 * Debugger class.
 */
class Debug extends BaseObject{
    /**
     * Initialize base logger.
     */
    init(){
        this._logger = Winston;
        this._logger.level = this.logLevel;
    }

    /**
     * Returns logger components.
     * 
     * @returns {*}
     */
    get logger(){
        return this._logger;
    }
}

module.exports = Debug;