import mongoose, { Schema } from "mongoose";

const usuarioColection = "usuarios";


const usuarioSchema = new Schema({
    email: {
        type:String,
        required: true
    },
  name: {
    type:String,
    required: true
},
hashedPassword: {
    type:String,
    required: true
},
role: {
    type:String,
    default: "user"
},
createdAt: {
    type: Date,
    default: new Date()
}
  
},
{
    timestamps: true
}
);

export const usuarioModel = mongoose.model(usuarioColection, usuarioSchema);
