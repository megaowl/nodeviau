"use strict";

const 
    config = require('../../../config/app.js'),
    fs = require('fs'),
    path = require('path'),
    StringHelper = require('../helper/StringHelper'),
    BaseObject = require('./BaseObject'),
    express = require('express'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

/**
 * Main application class.
 */
class Application extends BaseObject{
    /**
     * Initialize the application.
     */
    init(){
        // configure express core
        this._core = express();
        this._core.set('views', this.viewPath);
        this._core.set('view engine', this.viewEngine);

        this._core.use(favicon(path.join(__dirname + '/../../../', config.viewStaticFolder, 'favicon.ico')));
        this._core.use(logger('dev'));
        this._core.use(bodyParser.json());
        this._core.use(bodyParser.urlencoded({ extended: false }));
        this._core.use(cookieParser());
        this._core.use(express.static(path.join(__dirname + '/../../../', config.viewStaticFolder)));
        this._router = express.Router();

        // setting up port
        this._core.set('port', this.port);
        
        // upload params
        this.params = require('../../../config/params');
        
        // setting up components
        this.debug = {};
        this.db = {};
        this.session = {};
        this.request = {};
        this.response = {};
        this.user = {};
    }
    
    /**
     * Creates the application - initialize and configure components.
     */
    create(){
        let keys = Object.keys(this.components);
        for(let i = 0, l = keys.length; i < l; i++){
            let componentsClass = require("../" + this.components[keys[i]].class);
            this[keys[i]] = new componentsClass(this.components[keys[i]]);
        }
        
        return this;
    }

    /**
     * Run the application.
     */
    run(){
        // init routes
        this.controllerList = {};
        let self = this;
        
        fs.readdirSync(path.join(__dirname, "../../../controllers")).forEach(function (file) {
            if (file.substr(-3) === ".js"){
                let basePath = path.basename(file, ".js");
                let Controller = require('../../../controllers/' + file);
                self.controllerList[basePath] = new Controller({
                    _basePath: 'basePath',
                    _name: file
                });
                
                let 
                    contollerName = basePath.replace('Controller', '').toLowerCase(),
                    controllerDefaultAction = Controller.defaultAction;
                
                self._core.use('/' + contollerName + '/' + controllerDefaultAction, self.controllerList[basePath].router);
            }
        });
        
        self._core.use('/', this.controllerList[config.defaultController].router);
        self._core.use('/' + config.defaultRoute, this.controllerList[config.defaultController].router);
        self._core.use(function(req, res, next){self.controllerList[config.errorController].forward(req, res, next)});
        self._core.use(function(err, req, res, next) {self.controllerList[config.errorController].error(err, req, res, next);});
        
        // start server
        this._startServer();
    }

    /**
     * Start server with debugging.
     * 
     * @private
     */
    _startServer(){
        let http = require('http'),
            self = this;

        let server = http.createServer(this._core);
        server.listen(this.port);
        server.on('error', function (error){
            self.onError(error)
        });
        server.on('listening', function(){
            self.onListening(server, self.debug.logger)
        });
    }

    /**
     * Parse data after request.
     * 
     * @param request
     * @param response
     */
    afterRequest(request, response){
        // init session
        this.session.data = request.session;
        
        // init request and response
        this.request.data = request;
        this.response.data = response;
    }
    
    /**
     * Event listener for HTTP server "error" event.
     * @param error
     */
    onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }
    
        let bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;
    
        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     * 
     * @param server
     * @param debug
     */
    onListening(server, debug) {
        let addr = server.address();
        let bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        this.debug.logger.log('Listening on ' + bind);
    }

    /**
     * Returns application instance.
     * 
     * @returns {*|Function}
     */
    get core(){
        return this._core;
    }

    /**
     * Returns application router.
     * 
     * @returns {*}
     */
    get router(){
        return this._router;
    }
}

module.exports = new Application(config);