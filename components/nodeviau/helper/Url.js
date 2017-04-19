"use strict";

const 
    App = require('../base/Application');

/**
 * @module nodeviau/helper/Url
 * @author Itari <itari.onkar@gmail.com>
 * @licence MIT
 * 
 * @class
 * @classdesc Helper class for creating URL addresses.
 */
class Url{
    /**
     * Making a relative or absolute url.
     * 
     * @param path
     * @param absolute
     * @param scheme
     * @returns {string}
     */
    static to(path = [], absolute = false, scheme = 'http'){
        let url = absolute ? `${scheme}://${App.request.fromBody('headers').host}` : '';
        
        url += path[0];
        
        if(path.length > 1){
            url += '?';
            if(typeof path[1] === 'object'){
                let keys = Object.keys(path[1]);
                for(let i = 0, k = keys.length; i < k; i++) {
                    url += `${keys[i]}=${path[1][keys[i]]}&`;
                }
            }else if (typeof path[1] === 'string'){
                url += path[1];
            } 
            url = url.slice(0, -1);
        }
        
        return url;
    }
    
}

module.exports = Url;