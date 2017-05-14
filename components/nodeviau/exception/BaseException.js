"use strict";

/**
 * @module nodeviau/exception/BaseException
 * @author Itari <itari.onkar@gmail.com>
 * @licence MIT
 *
 * @class
 * @classdesc Base exception class for engine
 */
class BaseException extends Error{
    /**
     * Exception contructor.
     * @param message
     * @param code
     * @param previous
     */
    constructor(message, code = 0, previous = null){
        super(message, code);
        
        this._code = code;
        this._message = message;
        this._previous = previous;
    }

    /**
     * Returns exception code and message.
     * @returns {string}
     */
    toString(){
        return this._code + ":" + this._message;
    }

    /**
     * Returns exception message.
     * @returns {string}
     */
    getMessage(){
        return this._message;
    }

    /**
     * Message getter.
     * @returns {string}
     */
    get message(){
        return this._message;
    }

    /**
     * Code getter.
     * @returns {int|string}
     */
    get code(){
        return this._code;
    }

    /**
     * Previous getter.
     * @returns {object}
     */
    get previous(){
        return this._previous.toString();
    }

    /**
     * Stack trace getter.
     * @returns {string|*}
     */
    get stack(){
        return super.stack();
    }

}

module.exports = BaseException;