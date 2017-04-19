"use strict";

const 
    App = require('../base/Application'),
    Url = require('../helper/Url');

/**
 * @module nodeviau/web/HtmlView
 * @author Itari <itari.onkar@gmail.com>
 * @licence MIT
 *
 * @class
 * @classdesc Class for render html views.
 */
class HtmlView{
    /**
     * Class constructor.
     * 
     * @param template
     */
    constructor(template){
        this.response = App.response;
        this.template = template;
        this.vars = {};
    }

    /**
     * Add global variables to object.
     * 
     * @param varObject
     * @returns {HtmlView}
     */
    addVars(varObject){
        this.vars = Object.assign(varObject, this.vars);
        return this;
    }

    /**
     * Render the view.
     * 
     * @param data
     */
    render(data){
        if(typeof data === 'undefined'){
            data = {};
        }
        let fullData = Object.assign(data, this.vars, {Url: Url});

        if (this.response && this.template){
            this.response.render(this.template, fullData);
        }
    }
}

module.exports = HtmlView;