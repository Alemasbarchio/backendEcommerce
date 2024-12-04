import { usuarioModel } from "../DB/Mongo/models/usuarioModel.js";
import { hashPassword} from "../Utils/index.utils.js";


const postUser= async(userData)=>{
    console.log(userData);
const hashedPassword = await hashPassword(userData.password);
  try {
    
    const user= await usuarioModel.create({
      name:userData.name,
      email: userData.email,
      hashedPassword,
      role:userData.role,
    
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default {postUser};