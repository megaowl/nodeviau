"use strict";

const 
    BaseObject = require('../base/BaseObject'),
    Winston = require('winston'),
    StringHelper = require('../helpers/StringHelper');

/**
 * @module nodeviau/debug/Debug
 * @author Itari <itari.onkar@gmail.com>
 * @licence MIT
 *
 * @class
 * @classdesc Debugger class
 */
class Debug extends BaseObject{
    /**
     * Initialize base logger.
     */
    init(){
        this._logger = new (Winston.Logger)({
            level: this.logLevel
        });
        
        for(let i = 0, k = this.transports.length; i < k; i++){
            // transport is string - just add the transport
            if (typeof this.transports[i] === 'string'){
                this._logger.add(Winston.transports[StringHelper.ucfirst(this.transports[i])]);
            } else if (typeof this.transports[i] === 'object') {
                // transport is object with configuration
                let keys = Object.keys(this.transports[i]);
                for (let x = 0, y = keys.length; x < y; x++) {
                    this._logger.add(
                        Winston.transports[StringHelper.ucfirst(keys[x])],
                        this.transports[i][keys[x]]
                    );
                }
            }
        }
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