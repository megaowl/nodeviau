"use strict";

const WebController = require('../components/nodeviau/web/WebController');

/**
 * This is a simple controller which say: 'wow!'.
 */
class AnabelController extends WebController{
    /**
     * Index action.
     */
    actionIndex(){
        this.render('index', {
            name: "I am Anabel"
        });
    }

    /**
     * Wow action.
     */
    actionSay(){
        this.render('index', {
            name: "I am Anabel, and I say: wow!"
        });
    }
}

module.exports = AnabelController;