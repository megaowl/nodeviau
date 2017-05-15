"use strict";

module.exports = function(db, DataTypes){
    return db.define('sessions', {
        sid: {type: DataTypes.STRING, primaryKey: true},
        expires: {type: DataTypes.DATE},
        data: {type: DataTypes.JSON}
    }, {timestamps: false, freezeTableName: true});
};