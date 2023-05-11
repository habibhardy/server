
//// IMPORTATION DES DIFFERENTS MODULES ////

const {DataTypes} = require('sequelize')
const bcrypt = require('bcrypt')

//// DEFINITION DU MODELE ////

module.exports = (sequelize)=>{

    const Role = sequelize.define('Role', {
        code_role: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        type:{
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        }
    }, { paranoid: true ,freezeTableName: true,
        timestamps: false, })           // Ici pour faire du softDelete
    

    return Role
}