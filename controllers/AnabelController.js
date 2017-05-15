"use strict";

const 
    WebController = require('../components/nodeviau/web/WebController'),
    Url = require('../components/nodeviau/helpers/Url'),
    AnabelModel = require('../models/AnabelModel'),
    App = require('../components/nodeviau/base/Application');

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
    actionSpeak(){
        const anabel = new AnabelModel();
        let phrase = null;
        
        if(App.request.isPost() && anabel.load(App.request.post())){
            if(anabel.validate()){
                phrase = anabel.generatePhrase();
            }
        }
        
        this.title = 'Anabel';
        this.render('speak', {
            anabel: anabel,
            phrase: phrase
        });
    }
}

module.exports = AnabelController;