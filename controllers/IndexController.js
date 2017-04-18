"use strict";

const 
    WebController = require("../components/nodeviau/web/WebController"),
    App = require("../components/nodeviau/base/Application");

/**
 * Index application controller.
 */
class IndexController extends WebController{
    /**
     * Setting up controller name.
     */
    init(){
        super.init();
        
        this._name = 'index';
    }

    /**
     * Index action.
     */
    actionIndex(){
        console.log('b');
        this.title = 'Nodeviau';
        this.render('index', {
            version: App.version,
            text: "Small and flexible framework for node.js based on express."
        });
    }

    /**
     * View action.
     */
    actionView(){
        this.render('view');
    }
}

module.exports = IndexController;