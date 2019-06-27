'use strict';

export default class DateHandler {


    static getDateSQL() {
        let pad = function(num) { return ('00'+num).slice(-2) };
        let date;
        date = new Date();
        date = date.getUTCFullYear()        + '-' +
            pad(date.getUTCMonth() + 1) + '-' +
            pad(date.getUTCDate())   + ' ' +
            pad(date.getUTCHours())   + ':' +
            pad(date.getUTCMinutes())  + ':' +
            pad(date.getUTCSeconds());
        return date;

    }
    static Date_to_SQL(date) {
        let pad = function(num) { return ('00'+num).slice(-2) };
        date = date.getUTCFullYear()        + '-' +
            pad(date.getUTCMonth() + 1) + '-' +
            pad(date.getUTCDate())   + ' ' +
            pad(date.getUTCHours())   + ':' +
            pad(date.getUTCMinutes())  + ':' +
            pad(date.getUTCSeconds());
        return date;

    }


    static getDateSQLday( nbDay){
        let pad = function(num) { return ('00'+num).slice(-2) };
        let date;
        date = new Date();
        date = date.getUTCFullYear()        + '-' +
            pad(date.getUTCMonth() + 1 ) + '-' +
            pad(date.getUTCDate()+ nbDay)   + ' ' +
            pad(date.getUTCHours())   + ':' +
            pad(date.getUTCMinutes())  + ':' +
            pad(date.getUTCSeconds());
        return date;


    }

}