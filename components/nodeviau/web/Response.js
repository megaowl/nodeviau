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