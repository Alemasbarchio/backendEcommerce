
import express from "express"
import passport from "passport"
import {postCreatUser, loginUsuario, logoutUsuario,getAccess,controlRegister, getLogin} from "../controllers/user.controller.js"
import { authCheck } from "../middleware/authCheck.js";

const userRouter = express.Router();

userRouter.get("/",getAccess) 

userRouter.get("/login",getLogin); 
userRouter.get("/register",controlRegister);
userRouter.get("/logout",logoutUsuario);
userRouter.post("/login",passport.authenticate("login",{failureRedirect: "/login"}),loginUsuario );
userRouter.post("/register", postCreatUser);



export default userRouter;
