"use strict";

const 
    BaseModel = require("../components/nodeviau/models/BaseModel");

/**
 * Sample simple model for example.
 */
class AnabelModel extends BaseModel{
    /**
     * Define attributes.
     */
    model(){
        this.id = null;
        this.name = null;
        this.phrase = null;
        this.email = null;
        this.time = null;
    }

    /**
     * Returns attributes labels. 
     * @returns {{id: string, name: string, phrase: string, email: string}}
     */
    labels(){
        return {
            id: "ID",
            name: "Name",
            phrase: "Phrase",
            email: "Email"
        };
    }

    /**
     * Returns hints for attributes.
     * @returns {{id: string, name: string, phrase: string, email: string}}
     */
    hints(){
        return {
            id: "Enter your ID (numbers only).",
            name: "Enter your name.",
            phrase: "Enter phrase for Anabel.",
            email: "Enter your e-mail address."
        };
    }

    /**
     * Define rules.
     * 
     * @returns {[*,*,*,*]}
     */
    rules(){
        return [
            [['id', 'name', 'phrase', 'email'], 'required'],
            [['id'], 'number', {'min': 3, 'max': 10}],
            [['name', 'phrase'], 'string', {'min': 2, 'max': 20}],
            [['email'], 'email', {'allowEmpty': true}]
        ];
    }

    /**
     * Returns some phrase.
     * @returns {string}
     */
    generatePhrase(){
        const phrases = [
            '',
            'Hi sweet! What are you doing evening today?',
            'Hi! I\'m Anabel and I say: Wow! What\'s your name? ;)',
            'Honey, I miss you! Please speak with me again!',
            'You are driving me crazy ;);) You are my dream!',
            'I love being with you; I’m so happy we are together'
        ];
        let index = this.randomIntInc(1, 4);
        return phrases[index];
    }

    /**
     * Returns random integer. Just for test.
     * @param low
     * @param high
     * @returns {number}
     */
    randomIntInc (low, high) {
        return Math.floor(Math.random() * (high - low + 1) + low);
    }

    /**
     * Calculate time before validation.
     * @returns {boolean}
     */
    beforeValidate(){
        this.time = (new Date).getTime() / 1000;
        
        return super.beforeValidate();
    }
    
}

module.exports = AnabelModel;