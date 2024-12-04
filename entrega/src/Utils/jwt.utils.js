import jwt from "jsonwebtoken"

const SECRET = process.env.SECRET;

const generateToken = (user) => {
    const token = jwt.sign(user,process.env.SECRET);
    return token;

}

//Middleware de autenticação
const authToken = (req,res,next) => {
    const authHeader = req.headers["authorization"];
    if(!authHeader){
        return res.status(401).send({error: "Not Authenticated"})
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token,SECRET,(err,credentials) => {
        if(err){
            return res.status(403).json({"erro": "Not Aithorized"})
        }
        console.log(credentials);
        req.user = credentials;
        next();
    })
}

export {
    generateToken, authToken
}