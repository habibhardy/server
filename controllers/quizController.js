
//// IMPORTATION DES MODULES ////

const DB = require('../db')
const Quiz = DB.Quiz
const Event = DB.Event
const bcrypt = require('bcrypt')

//// LES DIFERRENTS ROUTAGES DE LA RESSOURCE QUIZ ////


// GET QUIZS //

module.exports.getQuizs = async(req,res) => {

    Quiz.findAll()
    .then(quizs => res.json({ data: quizs }))
    .catch(err => res.status(500).json({ message: 'Database Error', error: err }))}


    // GET QUIZS //

exports.getQuiz = async (req, res) => {
    let quizId = parseInt(req.params.quiz_id)

    // Vérification si le champ id est présent et cohérent
    if (!quizId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try{
        // Récupération de l'utilisateur et vérification
        let quiz = await Quiz.findOne({ where: { quiz_id: quizId }, attributes: ['quiz_id','quiz_name','quiz_number'],include: {model: Event, attributes:['event_id','event_name']}})
        if (quiz === null) {
            return res.status(404).json({ message: 'This quiz does not exist !' })
        }

        return res.json({ data: quiz })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}

// ADD QUIZ //

exports.addQuiz = async (req, res) => {
    const { quiz_name, quiz_number, quiz_type, quiz_question,
        quiz_textsubject, quiz_nb, quiz_textaction, quiz_image } = req.body

    // Validation des données reçues
    if (!quiz_name || !quiz_number || !quiz_type || !quiz_question,
        !quiz_textsubject || !quiz_nb || !quiz_textaction || !quiz_image) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try{
        // Vérification si l'utilisateur existe déjà
        const quiz = await Quiz.findOne({ where: { quiz_name: quiz_name }, raw: true })
        if (quiz !== null) {
            return res.status(409).json({ message: `The quiz ${quiz_name} already exists !`})
        }

        // Hashage du mot de passe utilisateur
        //let hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
        //req.body.password = hash

        // Céation de l'utilisateur
        let quizc = await Quiz.create(req.body)
        return res.json({ message: 'Quiz Created', data: quizc })
    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
        res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}



// UPDATE QUIZ //

exports.updateQuiz = async (req, res) => {
    let quizId = parseInt(req.params.quiz_id)
    // Vérification si le champ id est présent et cohérent
    if (!quizId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }
    try{
        // Recherche de l'utilisateur et vérification
        let quiz = await Quiz.findOne({ where: {quiz_id: quizId}, raw: true})
        if(quiz === null){
            return res.status(404).json({ message: 'This quiz does not exist !'})
        }

        // Mise à jour de l'utilisateur
        await Quiz.update(req.body, { where: {quiz_id: quizId}})
        return res.json({ message: 'Quiz Updated'})
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}


// DELETE QUIZ

exports.deleteQuiz =  (req, res) => {
    let quizId = parseInt(req.params.quiz_id)

    // Vérification si le champ id est présent et cohérent
    if (!quizId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression de l'utilisateur
    Quiz.destroy({ where: {quiz_id: quizId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}