import {v4} from "uuid"
import {createNewTcket} from "../services/ticket.service.js"

const createTicket = async (req,res) => {
    console.log("entrei no ticketControler")
    const {purchaser,products,valorTotal} = req.body;

    const code = v4(); 
    
    const ticket = {purchaser,code,products,valorTotal, qtdProducts: products.length}

    const newTicket = await createNewTcket(ticket)

    if(!newTicket){
        return res.status(400)
    }
    
    return res.status(201).json(newTicket);
    
}

export {createTicket}