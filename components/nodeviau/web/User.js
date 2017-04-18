"use strict";

const 
    BaseObject = require('../base/BaseObject'),
    App = require('../base/Application');

/**
 * User realization.
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