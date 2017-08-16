"use strict";

const BaseObject = require('../base/BaseObject');

/**
 * @module nodeviau/web/Response
 * @author Itari <itari.onkar@gmail.com>
 * @licence MIT
 *
 * @class
 * @classdesc Handle response helpers
 */
class Response extends BaseObject{
    /**
     * Init base response.
     */
    init(){
        this.data = {};
    }

    /**
     * Settings up new cookie.
     * @param cookieParam
     * @returns {Response}
     */
    cookieSet(cookieParam = null){
        const options = {};
        const keys = ['maxAge', 'httpOnly'];
        for(let i = 0; i < keys.length; i++){
            if(typeof cookieParam.get(keys[i]) !== 'undefined'){
                options[keys[i]] = cookieParam.get(keys[i]);
            }
        }
        
        this.data.cookie(
            cookieParam.get('name'),
            cookieParam.get('value'),
            options
        );
        
        return this;
    }

    /**
     * Remove existed cookie.
     * @param name
     * @returns {Response}
     */
    cookieRemove(name){
        this.data.clearCookie(name);
        return this;
    }

    /**
     * Render the data.
     * 
     * @param template
     * @param data
     */
    render(template, data){
        this.data.render(template, data);
    }
    
}

module.exports = Response;