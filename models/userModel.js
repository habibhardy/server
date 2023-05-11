
//// IMPORTATION DES DIFFERENTS MODULES ////

const {DataTypes} = require('sequelize')
const bcrypt = require('bcrypt')

//// DEFINITION DU MODELE ////

module.exports = (sequelize)=>{
    const User = sequelize.define('User', {
        user_id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        firstname:{
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        },
        lastname:{
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        },
        username:{
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        password:{
            type: DataTypes.STRING(64)
           // is: /^[0-9a-f]{64}$/i    // Ici une contrainte
        }
    }, { paranoid: true ,freezeTableName: true,
        timestamps: false, })           // Ici pour faire du softDelete
    
    User.beforeCreate( async (user, options) => {
        let hash = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT_ROUND))
        user.password = hash
    })
    
    User.checkPassword = async (password, originel) => {
        return await bcrypt.compare(password, originel)
    }

    return User
}