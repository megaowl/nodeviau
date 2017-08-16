"use strict";

const 
    BaseObject = require('../base/BaseObject');

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
     * Returns is request method GET.
     * @returns {boolean}
     */
    isGet(){
        return this._data.method === 'GET';
    }

    /**
     * Returns is request method POST.
     * @returns {boolean}
     */
    isPost(){
        return this._data.method === 'POST';
    }

    /**
     * Returns uis request method AJAX.
     * @returns {boolean}
     */
    isAjax(){
        return this._data.xhr && this._data.headers.accept.indexOf('json') !== -1;
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
     * Returns cookie value if it exists.
     * @param name
     * @returns {null}
     */
    cookieGet(name){
        return typeof this.data.cookies[name] !== 'undefined'
            ? this.data.cookies[name]
            : null;
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