"use strict";

const 
    App = require('./Application');

/**
 * @module nodeviau/base/I18n
 * @author Itari <itari.onkar@gmail.com>
 * @licence MIT
 *
 * @class
 * @classdesc I18n class.
 */
class I18n{
    /**
     * Init base variables.
     */
    constructor(){
        this.locale = typeof App.locale !== 'undefined' ? App.locale : null;
        this.defaultLocale = typeof App.defaultLocale !== 'undefined' ? App.defaultLocale : 'en-EN';
        this.storage = {};
    }

    /**
     * Translate phrase to it's analog or return phrase from default locale.
     * @param path
     * @param phrase
     * @param replacements
     * @returns {*}
     */
    t(path, phrase, replacements = null){

        if(this.locale === null || this.locale === this.defaultLocale){
            return this.r(phrase, replacements);
        }
        
        // path = front/test
        const currentLocale = this.locale !== null ? this.locale : this.defaultLocale;
        
        // en-EN/front/test
        const fullPath = currentLocale + '/' + path;
        
        // language file already loaded
        if(typeof this.storage[fullPath] !== 'undefined'){
            
            let rawPhrase = typeof this.storage[fullPath].get(phrase) !== 'undefined'
                ? this.storage[fullPath].get(phrase)
                : phrase;
            return this.r(rawPhrase, replacements);
        }
        
        // load file with translate if file with translates exists
        // raw phrase othewwise
        try{
            this.storage[fullPath] = require('../../../i18n/' + fullPath);
            return this.r(this.storage[fullPath].get(phrase), replacements);
        }catch(e){
            return this.r(phrase, replacements);
        }
    }

    /**
     * Replace symbols to it's replacements.
     * @param phrase
     * @param replacements
     * @returns {*}
     */
    r(phrase, replacements = null){
        if(replacements === null){
            return phrase;
        }
        
        const keys = Object.keys(replacements);
        for(let i = 0; i < keys.length; i++){
            let point = '{' + keys[i] + '}';
            phrase = phrase.replace(point, replacements[keys[i]]);
        }
        
        return phrase;
    }

    /**
     * Settings up new locale.
     * @param newLocale
     * @returns {I18n}
     */
    setLocale(newLocale){
        this.locale = newLocale;
        return this;
    }
    
}

module.exports = new I18n();