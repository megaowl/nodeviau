"use strict";

/**
 * @module nodeviau/helpers/StringHelper
 * @author Itari <itari.onkar@gmail.com>
 * @licence MIT
 *
 * @class
 * @classdesc String helpers class
 */
class StringHelper{
    /**
     * Capitalize first letter of a word.
     * 
     * @param word
     * @returns {string}
     */
    static ucfirst(word){
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    /**
     * Replace special symbols.
     * 
     * @param word
     * @returns {string}
     */
    static entities(word){
        return word
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }
    
}

module.exports = StringHelper;