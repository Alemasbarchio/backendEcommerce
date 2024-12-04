//import do express
import express from "express";
//import do cookie e session!!
import cookieParser from "cookie-parser";
import session from "express-session";
//import FileStore from ("session-file-store")(session)

//import do passport!!
import passport from "passport";

import {initializePassport} from "../config/passport.config.js"

//import do mongo-store
import mongoStore from "connect-mongo";

//importando o template engine do handlebars
import { engine } from "express-handlebars";

//path e url para trabalhar com caminhos
import path from "path";
import { fileURLToPath } from "url";

//import da classe para conexao com mongoDB
import mongoDBConection from "../DB/Mongo/mongoConnect.js";

//imports do socket IO para real time.
import { Server as socketIO } from "socket.io";
import http from "http";

//Import das rotas!
import prodRouter from "../routes/products.routes.js";
import cartsRoutes from "../routes/carts.routes.js";
import { populateRouter } from "../routes/populate.routes.js";

import userRouter from "../routes/user.routes.js"
import cors from "cors";
import { checkTokenReq } from "../middleware/tokenCheck.js";
import ticketRoutes from "../routes/ticket.routes.js";


//config dos caminhos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//config do express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


//config da Seesion
app.use(
  session({
    store: mongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      mongoOptions: {},
      ttl: 600,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//inicializando o passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//confif pasta public
const staticPath = path.join(`${__dirname}/../public`);
app.use(express.static(staticPath));

//config do Handlebars
const pathView = path.resolve(`${__dirname}/../views/`);
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", pathView);

//conf
app.use("/",userRouter);
app.use("/populate", populateRouter);
app.use("/api", prodRouter)
app.use("/cart", cartsRoutes);
app.use("/ticket",ticketRoutes)
app.use(checkTokenReq)


//config do socket io
const server = http.createServer(app);
const io = new socketIO(server,{cors: {
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, 
}});

io.on("connection", (socket) => {
  console.log("Usuario conectado");
  socket.on("connection",
     (data) =>{console.log(data)
      switch (data){
        case "ola": return socket.emit("connection",[`Olá,bem vindo ao chat! Como posso te ajudar? Digite 1 para informações sobre pedidos ou 2 para outras informações`])
        case "1": return socket.emit("connection",["Seu pedido está em preparação!"])
        case "2": return socket.emit("connection",["Entre em contato com o número 0800 123!"])
        default: return socket.emit("connection",[`Olá, como posso te ajudar? Digite 1
           para informações sobre pedidos ou 2 para outras informações`])
      }
      
     } 
     
);

 
});

//export do server com o express e socket juntos.
export default server;

//config do mongoose
const mongoDBconect = await mongoDBConection();
mongoDBconect.on("error", (error) => {
  console.log(`Erro ao conectar no MongoDB!! Erro: ${error}`);
});
mongoDBconect.once("open", () => {
  console.log("Conexão feita com sucesso!!");
});
