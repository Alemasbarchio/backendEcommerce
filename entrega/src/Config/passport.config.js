import passport from "passport"
import passportLocal from "passport-local"
import jwt from "passport-jwt"
import { usuarioModel } from "../DB/Mongo/models/usuarioModel.js"
import {validatePassword,hashPassword} from "../Utils/index.utils.js"
import {generateToken} from "../Utils/jwt.utils.js"


const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieStractor = (req) => {
    let token = null;
    if (req && req.cookies){
        return(token = req.cookies["accessToken"]);
    }
}

const initializePassport = () => {
        passport.use("jwt",new JWTStrategy(
            {   jwtFromRequest: ExtractJWT.fromExtractors([cookieStractor]),
                secretOrKey: process.env.SECRET,
            },
        async (jwt_payload,done) => {
            try {
                return done(null,jwt_payload)
            } catch (error) {
                return done(error)
            }
        }))

    passport.use("login",
        new passportLocal.Strategy(
            {usernameField: "email"},
            async (email,password,done) => {
                try{
                    console.log("EMAIL DO LOGIN!!!!!",email);
                    const userFound = await usuarioModel.findOne({email: email});
                    console.log("/USER DO MONGO", userFound)
                    if(!userFound){
                        return done(null, false)
                    }
                    const testPassword = await validatePassword(password,userFound)
                    console.log("passei na validaçao de senha",testPassword);
                    if(testPassword){
                        let user = [userFound];
                        user = user.map(u => u.toJSON() )
                        console.log("user", user);
                        delete user[0].password;
                        console.log("deu ruim aqui? ")
                        const accessToken = generateToken(user[0]);
                        console.log("gerei o token!!", accessToken)
                        user[0].token = accessToken;

                        return done(null,user[0]);
                    }else{
                        return done(null,false)
                    }

                }catch(error){
                    console.error(error);
                    return done(`Erro ao obter user ${error}`)
                }
            }
        )
    )

    passport.use("register",new passportLocal.Strategy({
        passReqToCallback: true, usernameField: "email" },
         async (req, userName, password, done) => {
           const {name,email, role } = req.body;
           try {
             let user = await usuarioModel.findOne({ email: userName });
             if (user) {
    
               return done(null, false);
             }
             const newPass = await hashPassword(password);
             const novoUser = {
               name,
               email,
               hashedPassword: newPass,
               role,
             };
             let newUser = await usuarioModel.create(novoUser);
             return done(null, newUser);
           } catch (error) {
             return done(`Erro ao obter user ${error}`);
           }
         }
        )
       )

    passport.serializeUser((user,done)=> done(null, user._id));
    passport.deserializeUser(async (id,done) => {
        try {
            const user = await usuarioModel.findById(id);
            done(null,user);
        }catch(error){
            done(`Erro ao obter user ${error}` )
        }
    })

};




export {initializePassport} 

 