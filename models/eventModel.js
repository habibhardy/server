
//// IMPORTATION DES DIFFERENTS MODULES ////

const {DataTypes} = require('sequelize')
const bcrypt = require('bcrypt')

//// DEFINITION DU MODELE ////

module.exports = (sequelize)=>{
    const Event = sequelize.define('Event', {
        event_id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        event_name:{
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        },
        event_place:{
            type: DataTypes.STRING(100),
            defaultValue: ''
        },
        event_parainage:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        event_praticalinfos:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        event_gamespirits:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        event_rolesgame:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        event_timeinterval:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        event_date:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        event_image:{
            type: DataTypes.TEXT('long'),
            allowNull: false
        }

    }, { paranoid: true ,freezeTableName: true,
        timestamps: false, })           // Ici pour faire du softDelete
    
    return Event
}