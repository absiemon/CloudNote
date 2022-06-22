const jwt = require('jsonwebtoken');
const JWT_SECRET = 'abshaddpadk';


const fetchuser = (req, res, next)=>{
    // in jwt there are three parts the third part(called header) contains the id 
    // get the user from the jwt token and add id to req obj

    const token = req.header('auth-token');  // auth-token is the name of the header
    
    if(!token){
        res.status(401).send({error:"please authenticate the user with valid token"}) 

    }
    // may be the token could be invalid so warppin in the try catch

    try {
        const data = jwt.verify(token, JWT_SECRET); // decoding the header part to get the user id. see how verify works(Synchronously verify given token using a secret or a public key to get a decoded token token -)
        req.user = data.user;  // gettig the user in the req.user
        next();  // after getting the user calling the next user

    } catch (error) {
        
        res.status(401).send({error:"please authenticate the user with valid token"}) 
    }

}

module.exports = fetchuser;