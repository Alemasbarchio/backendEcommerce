
const authCheck= (req,res,next)=>{

if(!req.user){
res.redirect("/login")
}
else{
    next();
}

}

const isAdm=(req,res,next)=>{
    if(!req.user){
        res.redirect("/login");
    }
    else{
        
        if(req.user.role!="admin"){
            res.status(400).json();
        }
        else{
            next();
        }
        
    }
    
    }
export {authCheck,isAdm};