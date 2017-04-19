"use strict";

const 
    BaseObject = require('../base/BaseObject'),
    App = require('../base/Application');

/**
 * @module nodeviau/web/Response
 * @author Itari <itari.onkar@gmail.com>
 * @licence MIT
 *
 * @todo
 * @class
 * @classdesc User realization.
 */
class User extends BaseObject{
    /**
     * Init base data.
     */
    init(){
        this.isGuest = true;
        this.id = -1;
    }
}

module.exports = User;