
//// IMPORTATION DES MODULES ////

const Sequelize = require('sequelize')

//// CONNEXION A LA BASE DE DONNEE ////

let sequelize = new Sequelize.Sequelize(process.env.DATABASE_DBNAME,process.env.DATABASE_USERNAME,process.env.DATABASE_PASSWORD,{

    host:process.env.DATABASE_HOST,
    port:process.env.PORT_,
    dialect:'mysql',
    logging:false

});

//// PARAMETRAGE DES ASSOCIATIONS DES TABLES ////

const db = {}

db.sequelize = sequelize
db.User = require('./models/userModel')(sequelize)
db.Role = require('./models/roleModel')(sequelize)
db.Event = require('./models/eventModel')(sequelize)
db.Group = require('./models/groupModel')(sequelize)
db.Quiz = require('./models/QuizModel')(sequelize)
db.Answer = require('./models/answerModel')(sequelize)



db.Role.hasMany(db.User, {foreignKey: 'code_role', onDelete: 'cascade'})
db.User.belongsTo(db.Role, {foreignKey: 'code_role'})

db.Event.hasMany(db.Group,{foreignKey: 'event_id', onDelete: 'cascade'})
db.Group.belongsTo(db.Event, {foreignKey: 'event_id'})

db.Event.hasMany(db.Quiz,{foreignKey: 'event_id', onDelete: 'cascade'})
db.Quiz.belongsTo(db.Event, {foreignKey: 'event_id'})

db.Quiz.hasMany(db.Answer,{foreignKey: 'quiz_id', onDelete: 'cascade'})
db.Answer.belongsTo(db.Quiz, {foreignKey: 'quiz_id'})

//// SYNCHRONISATION DES MODULES ////

db.sequelize.sync({ alter: false})
//db.sequelize.sync({ alter: true,force:true})

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });


module.exports = db

