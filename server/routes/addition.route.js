import express from "express";
import {
  addBusinessRequest,
  addWashroomRequest,
  addIssue,
} from "../controller/addition.controller.js";

const router = express.Router();

//This end point is used to add user-requested washrooms into the data base for user requested washrooms.
// It needs a body. The body should have the following format:
//USER_ADD_WASHROOM_REQUEST {
//  id: uuid, (provided automatically by mongodb)
//  address: string,
//  city: string,
//  province: string,
//  description: string
//}
//It should be in raw JSON
//no url params are needed.
router.post("/addWashroomRequest", addWashroomRequest);

/*
This is called when the /issue endpoint is called, it handles adding issues into the issues collection
of the db.

Takes in request with format:
BUSINESS_WASHROOM_REQUEST {
    id: uuid, (provided automatically by mongodb)
    businessName: string,
    contactName: string,
    email: string,
    phoneNumber: string,
    address: string,
    city: string,
    province: string,
    description: string,
}
*/
router.post("/addBusinessRequest", addBusinessRequest);

router.post("/add", addWashroomRequest);

/*
This endpoint is for user issue submissions
Uses the following format:
USER_REPORT_WASHROOM_ISSUE {
    id: uuid, (automatically from mongodb)
    name: string,
    phoneNum: int,
    email: string,
    issue: string,
    status: boolean,
    washroomId: uuid (given by the report button, links to the washroom database)
}
*/
router.post("/issue", addIssue);

export default router;
