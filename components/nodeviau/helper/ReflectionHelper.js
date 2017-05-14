"use strict";

/**
 * @module nodeviau/web/WebController
 * @author Itari <itari.onkar@gmail.com>
 * @licence MIT
 *
 * @class
 * @classdesc Reflection helper class
 */
class ReflectionHelper{
    /**
     * Returns attributes of a method.
     * @param method
     * @returns {Array.<*>}
     */
    static getAttributes(method){
        return (method.toString() + '')
            .replace(/[/][/].*$/mg,'') // strip single-line comments
            .replace(/\s+/g, '') // strip white space
            .replace(/[/][*][^/*]*[*][/]/g, '') // strip multi-line comments  
            .split('){', 1)[0].replace(/^[^(]*[(]/, '') // extract the parameters  
            .replace(/=[^,]+/g, '') // strip any ES6 defaults  
            .split(',').filter(Boolean); // split & filter [""]
    }
    
}

module.exports = ReflectionHelper;