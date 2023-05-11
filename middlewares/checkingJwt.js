/***********************************/
/*** Import des module nécessaires */
const jwt = require('jsonwebtoken')

//// EXTRACTION DU TOKEN ////
const extractBearer = authorization => {

    if(typeof authorization !== 'string'){
        return false
    }
    // On isole le token
    const matches = authorization.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]

}


//// VERIFICATION DE LA PRESENCE DU TOKEN  ////
const checkTokenMiddleware = (req, res, next) => {

    const token = req.headers.authorization && extractBearer(req.headers.authorization)

    if(!token){
        return res.status(401).json({ message: 'Ho le petit malin !!!'})
    }
    // Vérifier la validité du token
    jwt.verify(token, "lkzndckbjl89HIU%¨µ_çèé", (err, decodedToken) => {
        if(err){
            return res.status(401).json({message: 'Denied of this authoraization :( !'})
        }
        next()
    })
}

module.exports = checkTokenMiddleware