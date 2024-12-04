import {model,Schema} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ticketColetions = "Ticket"


const ticketSchema = new Schema({
    purchaser: String,
    code: {
        type: String,
        unique: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    products: [],
    total: Number,
    
})
ticketSchema.plugin(mongoosePaginate);

export const ticketModel = model(ticketColetions,ticketSchema);