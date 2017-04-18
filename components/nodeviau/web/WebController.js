"use strict";

const 
    App = require("../base/Application"),
    HtmlView = require("./HtmlView"),
    StringHelper = require('../helper/StringHelper'),
    BaseObject = require('../base/BaseObject');

/**
 * Base controller class.
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
        
        // initialize the router
        this._router = App.router;
        this._router.all("*", (req, res, next) => { this.beforeAction(req, res, next); });
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
            this[this.action]();
        }else{
            return next();
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
            return true;
        }else{
            if(typeof this['action' + StringHelper.ucfirst(parts[2])] !== 'undefined'){
                this.action = 'action' + StringHelper.ucfirst(parts[2]);
                return true;
            }else{
                return false;
            }
        }
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