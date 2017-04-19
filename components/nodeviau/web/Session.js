"use strict";

const 
    BaseObject = require('../base/BaseObject'),
    App = require('../base/Application'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    sessionStore = require('sequelstore-connect')(session);

/**
 * @module nodeviau/web/Session
 * @author Itari <itari.onkar@gmail.com>
 * @licence MIT
 *
 * @class
 * @classdesc Class for session saving and handling.
 */
class Session extends BaseObject{
    /**
     * Initialize session storage.
     */
    init(){
        
        if(!this.lazyLoad){
            this.connect();
        }
        
        // session data
        this._data = {};
    }

    /**
     * Establish connection with the sessions storage.
     * 
     * If you do not want greedy loading, you must call App.session.connect() before using the sessions.
     */
    connect(){
        // add a session
        App.core.use(bodyParser.urlencoded({extended: true}));
        App.core.use(bodyParser.json());
        App.core.use(cookieParser());

        // init store
        this.config.store = new sessionStore({
            database: App.db.connection, // there will be stablished connection in lazyLoad mode
            sessionModel: App.db.models.sessions,
            transform: function (data) {
                return data;
            },
            ttl: (60 * 60 * 24),
            autoRemoveInterval: (60 * 60 * 3)
        });

        // run session 
        App.core.use(session(this.config));
    }
    
    set data(value){
        this._data = value;
    }
    
    get data(){
        return this._data;
    }
    
}

module.exports = Session;