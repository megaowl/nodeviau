"use strict";

const BaseObject = require('../base/BaseObject');

/**
 * @module nodeviau/web/Request
 * @author Itari <itari.onkar@gmail.com>
 * @licence MIT
 *
 * @class
 * @classdesc Request handler class.
 */
class Request extends BaseObject{
    /**
     * Init storage
     */
    init(){
        this._data = {};
    }

    /**
     * Returns value from _GET array.
     * 
     * If value is not specified, all _GET array will returns.
     * 
     * @param key
     * @returns mixed
     */
    get(key){
        
        if(typeof key === 'undefined'){
            return typeof this._data.query !== 'undefined' ? this._data.query : null;
        }
        
        return typeof this._data.query !== 'undefined'
            && typeof this._data.query[key] !== 'undefined'
            ? this._data.query[key]
            : null;
    }

    /**
     * Returns value from _POST array.
     * 
     * If value is not specified, all _POST array will returns.
     * 
     * @param key
     * @returns mixed
     */
    post(key){
        if(typeof key === 'undefined'){
            return typeof this._data.body !== 'undefined' ? this._data.body : null;
        }

        return typeof this._data.body !== 'undefined'
        && typeof this._data.body[key] !== 'undefined'
            ? this._data.body[key]
            : null;
    }

    /**
     * Returns data from body.
     * 
     * @param key
     * @returns {null}
     */
    fromBody(key){
        return typeof this._data[key] !== 'undefined' ? this._data[key] : null;
    }

    /**
     * Setting up request data.
     * 
     */
    set data(newData){
        this._data = newData;
    }

    /**
     * Returns full request data.
     */
    get data(){
        return this._data;
    }
}

module.exports = Request;