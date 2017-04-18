"use strict";

const BaseObject = require('../base/BaseObject');

/**
 * Handle response.
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