"use strict";

/**
 * @module nodeviau/helper/String
 * @author Itari <itari.onkar@gmail.com>
 * @licence MIT
 *
 * @class
 * @classdesc Helper class for date parsing.
 */
class DateHelper{
    /**
     * Format unix timestamp to iso format.
     * 
     * @param unixTimestamp
     * @returns {string}
     */
    static toIsoDatetime(unixTimestamp){
        let 
            a = new Date(unixTimestamp * 1000),
            months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        
        let 
            year = a.getFullYear(),
            month = months[a.getMonth()],
            date = a.getDate(),
            hour = a.getHours(),
            min = a.getMinutes(),
            sec = a.getSeconds();
        
        return date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    }

    /**
     * Create some date from unix timestamp using format.
     * 
     * @param unixTimestamp
     * @param format
     * @returns {string}
     */
    static fromUnixtime(unixTimestamp, format){
        switch(format){
            case 'iso':
                return DateHelper.toIsoDatetime(unixTimestamp);
                break;
                
            default:
                throw new Error('Unavailable time format');
                break;
        }
    }
}

module.exports = DateHelper;