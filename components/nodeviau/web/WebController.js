"use strict";

const 
    App = require("../base/Application"),
    HtmlView = require("./HtmlView"),
    StringHelper = require('../helper/StringHelper'),
    BaseObject = require('../base/BaseObject'),
    Reflection = require('../helper/ReflectionHelper'),
    InvalidParamException = require("../exception/InvalidParamException"),
    Crypto = require('crypto');

/**
 * @module nodeviau/web/WebController
 * @author Itari <itari.onkar@gmail.com>
 * @licence MIT
 *
 * @class
 * @classdesc Base controller class.
 */
class WebController extends BaseObject{
    /**
     * Initialize base variables.
     * 
     */
    init(){
        /**
         * Router object
         *
         * @private
         */
        this._router = {};

        /**
         * Format of the response
         *
         * Can be html(default)|json
         *
         * @type {string}
         */
        this.responseFormat = 'html';

        /**
         * Controller title
         *
         * @type {string}
         */
        this.title = '';

        /**
         * Current action
         * 
         * @type {null}
         */
        this.action = null;

        /**
         * Default action for controller
         * 
         * @type {string}
         */
        this.defaultAction = 'actionIndex';

        /**
         * Prepare routes
         * 
         * @type {*}
         * @private
         */
        this.actions = [];
        this.actionsParams = {};
        this._router = App.router;
        this._collectActions();
    }

    /**
     * Collect existed action and link to router.
     * 
     * @private
     */
    _collectActions(){
        let self = this;
        App.core.use('/' + this.name, (req, res, next) => { self.beforeAction(req, res, next); });
        App.core.use('/' + this.name + '/*', (req, res, next) => { self.beforeAction(req, res, next); });
        
        Object.getOwnPropertyNames(Object.getPrototypeOf(self)).filter((prop) => {
            if(typeof self[prop] === 'function' && prop.slice(0, 6) === 'action'){
                self.actions.push(prop.slice(6).toLowerCase());
            }
        });
        
    }

    /**
     * Collection actions, prepare data and run it.
     * 
     * You can override this method in child class, but you
     * must call super.beforeAction() after your code.
     * 
     * @param res
     * @param req
     * @param next
     */
    beforeAction(req, res, next){
        App.afterRequest(req, res);

        if(this.parseAction()){
            this.checkParams(this[this.action]);
            this[this.action]();
        }else{
            return next();
        }
    }

    /**
     * Compare arguments from $_GET and from method params.
     * @param action
     * @returns void
     */
    checkParams(action){
        let 
            actionHash = Crypto.createHash('md5').update(action.toString()).digest('hex'),
            argumentsArray = [];
        
        // get arguments
        if(typeof this.actionsParams[action] === 'undefined'){
            argumentsArray = Reflection.getAttributes(action);
            this.actionsParams[actionHash] = argumentsArray;
        }else{
            argumentsArray = this.actionsParams[actionHash];
        }

        if(argumentsArray.length === 0){
            return;
        }
        
        for(let i = 0; i < argumentsArray.length; i++){
            if(App.request.get(argumentsArray[i]) === null){
                throw new InvalidParamException('Argument not found: ' + argumentsArray[i]);
            }
        }
    }

    /**
     * Checks controller and action.
     * 
     * Url must be like '/controller/action?args1=1&args2=2' etc.
     * 
     * @returns {boolean}
     */
    parseAction(){
        let baseUrl = App.request.fromBody('originalUrl').toLowerCase();
        
        if(baseUrl.indexOf('favicon') > -1
            || baseUrl.indexOf('stylesheets') > -1
            || baseUrl.indexOf('javascripts') > -1
        ){
            return false;
        }
        
        
        let parts = baseUrl.split('/');
        
        if(parts.length <= 2 
            || parts[2] === '' 
            || ('action' + StringHelper.ucfirst(parts[2])).toLowerCase() === this.defaultAction.toLowerCase()
        ){
            this.action = this.defaultAction;
        }else{
            if(typeof this['action' + StringHelper.ucfirst(parts[2])] !== 'undefined'){
                this.action = 'action' + StringHelper.ucfirst(parts[2]);
            }
        }
        
        return (this.action !== null && typeof this[this.action] === 'function');
    }

    /**
     * Render the data.
     *
     * @param template
     * @param data
     */
    render(template, data){
        let view = this.responseFormat === 'html'
            ? new HtmlView(this.name + '/' + template)
            : new HtmlView(this.name + '/' + template);

        view.addVars({title: this.title});
        view.render(data);
    }

    /**
     * Returns base path
     * 
     * @returns {string}
     */
    get basePath(){
        return this._basePath;
    }

    /**
     * Returns router instance
     * 
     * @returns {{}|*}
     */
    get router(){
        return this._router;
    }

    /**
     * Returns name of the controller
     * 
     * @returns {string}
     */
    get name(){
        return this.constructor.name.replace('Controller', '').toLowerCase();
    }
    
}

module.exports = WebController;