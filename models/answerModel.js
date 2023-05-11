
//// IMPORTATION DES DIFFERENTS MODULES ////

const {DataTypes} = require('sequelize')
const bcrypt = require('bcrypt')

//// DEFINITION DU MODELE ////

module.exports = (sequelize)=>{
    const Answer = sequelize.define('Answer', {
        answer_id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        answer_value:{
            type: DataTypes.TEXT,
            defaultValue: '',
            allowNull: false
        },
        answer_group:{
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        }
    }, { paranoid: true ,freezeTableName: true,
        timestamps: false, })           // Ici pour faire du softDelete
    
    return Answer
}