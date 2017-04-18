"use strict";

const 
    WebController = require('../components/nodeviau/web/WebController'), 
    App = require('../components/nodeviau/base/Application');

/**
 * Controller for handling errors.
 */
class ErrorController extends WebController{
    /**
     * Catch 404 and forward to error handler
     * @param req
     * @param res
     * @param next
     */
    forward(req, res, next){
        let err = new Error('Not found.');
        err.status = 404;
        next(err);
    }

    /**
     * Error handler
     * @param err
     * @param req
     * @param res
     * @param next
     */
    error(err, req, res, next){
        App.response.data.locals.message = err.message;
        App.response.data.locals.error = App.environment === 'dev' ? err : {};

        App.response.data.status(err.status || 500);
        this.render('error', {
            env: App.environment,
            message: err.message
        })
    }
}

module.exports = ErrorController;
