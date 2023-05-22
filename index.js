
//// IMPORTATION DES MODULES NECESSAIRES ////

const express = require('express')
const cors = require('cors')
let router = require('express').Router()
require('dotenv').config()
const app = express()
var compression = require('compression')
const serverless = require("serverless-http");

// IMPORTATION DES DIFFERENTES ROUTES DE SERVICE DE L'APP //

const userRoute = require('./routes/userRoute')
const roleRoute = require('./routes/roleRoute')
const eventRoute = require('./routes/eventRoute')
const groupRoute = require('./routes/groupRoute')
const quizRoute = require('./routes/quizRoute')
const answerRoute = require('./routes/answerRoute')
const authenticationRoute = require('./routes/authenticationRoute')

//// IMPLEMENTATION DES DIFFERENTS MODULES ////

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
 }))
 app.use(compression())
/* app.use(express.json({limit: "25mb", extended: true}))
 app.use(express.urlencoded({limit: "25mb", extended: true, parameterLimit: 50000}))
 */

 app.use(express.json({ limit: '50mb' }));
 app.use(express.urlencoded({ extended: true,limit: '50mb', parameterLimit: 50000 }));

//// DEMARRAGE DU SERVEUR SUR UN PORT DEFINI ////

const port = process.env.PORT || 9050;
app.get('/',(req,res)=>{
    res.json({message:"HELLO APIS !"})
})

app.listen(port,()=>{
    console.log(`the server is running on the port ${port} ...`)
})
//// LA MISE EN PLACE DU ROUTAGE DU SERVEUR ////

app.use(userRoute)
app.use(roleRoute)
app.use(eventRoute)
app.use(groupRoute)
app.use(quizRoute)
app.use(answerRoute)
app.use(authenticationRoute)



module.exports = app;








