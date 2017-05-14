"use strict";

const BaseObject = require('../base/BaseObject');

/**
 * @module nodeviau/validator/BaseValidator
 * @author Itari <itari.onkar@gmail.com>
 * @licence MIT
 *
 * @class
 * @classdesc Base validator interface
 */
class BaseValidator extends BaseObject{
    validateAttribute(model, attributeName){
        
    }
}

module.exports = BaseValidator;