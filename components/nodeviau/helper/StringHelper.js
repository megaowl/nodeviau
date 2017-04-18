"use strict";

/**
 * String helper class
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
}

module.exports = StringHelper;