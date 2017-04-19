"use strict";

const 
    App = require('../base/Application'),
    fs        = require("fs"),
    path      = require("path"),
    Sequelize = require("sequelize"),
    BaseObject = require("../base/BaseObject");

/**
 * @module nodeviau/db/Db
 * @author Itari <itari.onkar@gmail.com>
 * @licence MIT
 *
 * @class
 * @classdesc DAO class based on sequelize library.
 */
class Db extends BaseObject{
    /**
     * Initialize connection.
     */
    init(){
        // init variables
        this._library = Sequelize;
        this._models = {};

        // if we want to use greedy load, establish connection immediately
        // otherwise, after first call App.db.connection connection will be established
        if(!this.lazyLoad){
            this.connect();
        }
    }

    /**
     * Establish connection to server.
     */
    connect(){
        try{
            this._connection = new Sequelize(this.dsn, this.options);
            App.debug.logger.info("Connection with DB established.");
        }catch(e){
            App.debug.logger.error(e);
            process.exit(-1);
        }
        
        // sync with existing tables
        this._connection.sync(this.syncOptions)
            .then({})
            .catch((e) => {
                App.debug.logger.error(e);
                process.exit(-1);
            });

        // load models
        this._collectModels();
    }

    /**
     * Collect existing models.
     * @private
     */
    _collectModels(){
        let self = this;
        let modelsPath = __dirname + '/../../../models';
        
        fs
            .readdirSync(modelsPath)
            .filter((file) => {
                return (file.indexOf(".") !== 0) && (file !== "index.js");
            })
            .forEach((file) => {
                let model = self._connection.import(path.join(modelsPath, file));
                self._models[model.name] = model;
            });

        Object.keys(self._models).forEach((modelName) => {
            if ("associate" in self._models[modelName]) {
                self._models[modelName].associate(self._models);
            }
        });
    }

    /**
     * Returns models list
     * 
     * @returns {{}|*}
     */
    get models(){
        return this._models;
    }

    /**
     * Returns connection
     * 
     * @returns {Sequelize|*|Promise.Sequelize}
     */
    get connection(){
        if(false === (this._connection instanceof Sequelize)){
            this.connect();
        }
        
        return this._connection;
    }

    /**
     * Returns library
     * 
     * @returns {*|Promise.Sequelize|Sequelize}
     */
    get library(){
        return this._library;
    }
}

module.exports = Db;