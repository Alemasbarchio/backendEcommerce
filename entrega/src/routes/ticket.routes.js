import express from "express"

import {createTicket} from "../controllers/ticket.controller.js"

const ticketRoutes = express.Router();

ticketRoutes.post("/",createTicket);

export default ticketRoutes;
