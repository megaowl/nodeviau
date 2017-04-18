"use strict";

const App = require('../base/Application');

/**
 * Class for render html views.
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
        let fullData = Object.assign(data, this.vars);

        if (this.response && this.template){
            this.response.render(this.template, fullData);
        }
    }
}

module.exports = HtmlView;