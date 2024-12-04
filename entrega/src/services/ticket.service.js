import {ticketModel} from "../DB/Mongo/models/ticketModel.js"

const createNewTcket = async (ticket) => {

    try {
        const newTicket = await ticketModel.create(ticket);
        
        return newTicket;
    } catch (error) {
        console.error("Erro ao criar o produto!",error)
        return null;
    }
}

export {createNewTcket}