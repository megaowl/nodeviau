"use strict";

const 
    crypto = require('crypto'),
    BaseObject = require('../base/BaseObject'),
    App = require('../debug/Debug');

/**
 * Class for encryption and decryption data.
 * Must be singleton.
 */
class Crypt extends BaseObject{
    /**
     * Calculate key and IV.
     */
    init(){
        let md5String = crypto.createHash('md5').update(this.baseKey).digest('hex');

        this.encryptKey = md5String.substring(0, 16);
        this.iv = md5String.substring(16, 32);
    }

    /**
     * Encrypt data and returns hex string.
     *
     * @param data
     * @returns {String}
     */
    encrypt(data){
        if(data.length === 0){
            return '';
        }

        try {
            let cipher = crypto.createCipheriv(this.alhorithm, this.encryptKey, this.iv);
            let crypted = cipher.update(data, 'utf8', 'binary');
            crypted += cipher.final('binary');

            let hexVal = new Buffer(crypted, 'binary');
            return hexVal.toString('hex');
        }catch(e){
            App.debug.logger.error(e);
            return '';
        }
    }

    /**
     * Decrypt data and returns plain data.
     *
     * @param data
     * @returns {String}
     */
    decrypt(data){
        if(data.length === 0){
            return '';
        }

        try {
            let decipher = crypto.createDecipheriv(this.alhorithm, this.encryptKey, this.iv);

            let decrypted = decipher.update(data, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        }catch(e){
            App.debug.logger.error(e);
            return '';
        }
    }
}

module.exports = Crypt;