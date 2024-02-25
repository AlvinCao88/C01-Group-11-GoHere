import express from "express";
import { addWashroomRequest } from "../controller/addition.controller.js";

const router = express.Router();

router.post("/add", addWashroomRequest);
//This end point is used to add user-requested washrooms into the data base for user requested washrooms.
// It needs a body. The body should have the following format:
//USER_ADD_WASHROOM_REQUEST {
//  id: uuid,
//  address: string,
//  city: string,
//  province: string,
//  description: string
//}
//It should be in raw JSON
//no url params are needed.

export default router;
