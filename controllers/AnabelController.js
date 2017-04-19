"use strict";

const 
    WebController = require('../components/nodeviau/web/WebController'),
    Url = require('../components/nodeviau/helper/Url');

/**
 * This is a simple controller that says: 'wow!'.
 */
class AnabelController extends WebController{
    /**
     * Index action.
     */
    actionIndex(){
        this.title = 'Anabel';
        this.render('index', {
            name: "I am Anabel"
        });
    }

    /**
     * Wow action.
     */
    actionSay(){
        this.title = 'Anabel';
        this.render('index', {
            name: "I am Anabel, and I say: wow!"
        });
    }
}

module.exports = AnabelController;