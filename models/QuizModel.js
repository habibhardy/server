
//// IMPORTATION DES DIFFERENTS MODULES ////

const {DataTypes} = require('sequelize')
const bcrypt = require('bcrypt')

//// DEFINITION DU MODELE ////

module.exports = (sequelize)=>{
    const Quiz = sequelize.define('Quiz', {
        quiz_id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        quiz_name:{
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        },
        quiz_number:{
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        },
        quiz_type:{
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        quiz_question:{
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        quiz_textsubject:{
            type: DataTypes.TEXT,
            defaultValue: '',
            allowNull: false
        },
        quiz_nb:{
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        quiz_textaction:{
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        quiz_image:{
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        }
    }, { paranoid: true ,freezeTableName: true,
        timestamps: false, })           // Ici pour faire du softDelete
    
    return Quiz
}