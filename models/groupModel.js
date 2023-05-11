
//// IMPORTATION DES DIFFERENTS MODULES ////

const {DataTypes} = require('sequelize')
const bcrypt = require('bcrypt')

//// DEFINITION DU MODELE ////

module.exports = (sequelize)=>{
    const Group = sequelize.define('Group', {
        group_id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        group_name:{
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        },
        group_companyname:{
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        },
        group_logo:{
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
        group_color:{
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        }
    }, { paranoid: true ,freezeTableName: true,
        timestamps: false, })           // Ici pour faire du softDelete
    
    return Group
}