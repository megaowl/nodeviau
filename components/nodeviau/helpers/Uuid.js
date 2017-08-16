"use strict";

const
    BaseObject = require('../base/BaseObject'),
    RandomBytes = require('crypto').randomBytes;

/**
 * @module nodeviau/helpers/Uuid
 * @author https://github.com/kelektiv/node-uuid
 * @author Itari <itari.onkar@gmail.com>
 * @licence MIT
 *
 * @class
 * @classdesc Helper class for generation UUID
 */
class Uuid extends BaseObject{
    /**
     * Generate UUID
     */
    init(){
        super.init();

        this._value = this._v4();
    }

    /**
     * Returns UUID
     * @returns {*}
     */
    get value(){
        return this._value;
    }

    /**
     * Setting up new UUID
     * @param val
     */
    set value(val){
        this._value = val;
    }

    /**
     * Generate v4 UUID.
     *
     * @param options
     * @param buf
     * @param offset
     * @returns {*}
     * @private
     */
    _v4(options, buf, offset) {
        const i = buf && offset || 0;

        if (typeof(options) === 'string') {
            buf = options === 'binary' ? new Array(16) : null;
            options = null;
        }
        options = options || {};

        let rnds = options.random || (options.rng || RandomBytes(16));

        // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
        rnds[6] = (rnds[6] & 0x0f) | 0x40;
        rnds[8] = (rnds[8] & 0x3f) | 0x80;

        // Copy bytes to buffer, if provided
        if (buf) {
            for (let ii = 0; ii < 16; ++ii) {
                buf[i + ii] = rnds[ii];
            }
        }

        return buf || this._bytesToUuid(rnds);
    }

    /**
     * Convert bytes to UUID.
     *
     * @param buf
     * @param offset
     * @returns {string}
     * @private
     */
    _bytesToUuid(buf, offset){
         let byteToHex = [];
         for (let i = 0; i < 256; ++i) {
             byteToHex[i] = (i + 0x100).toString(16).substr(1);
         }

         i = offset || 0;
         let bth = byteToHex;
         return bth[buf[i++]] + bth[buf[i++]] +
             bth[buf[i++]] + bth[buf[i++]] + '-' +
             bth[buf[i++]] + bth[buf[i++]] + '-' +
             bth[buf[i++]] + bth[buf[i++]] + '-' +
             bth[buf[i++]] + bth[buf[i++]] + '-' +
             bth[buf[i++]] + bth[buf[i++]] +
             bth[buf[i++]] + bth[buf[i++]] +
             bth[buf[i++]] + bth[buf[i++]];
     }
}

module.exports = Uuid;