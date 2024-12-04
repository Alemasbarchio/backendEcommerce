const checkTokenReq = (req,res,next) => {
    const token = req.headers['authorization'];

    if(!token){
        console.log("Não recebi o token!")
        return res.status(403).send({error: 'Usuario não logado'});
    
    }else{
        
        next();
    }
}

export {checkTokenReq};