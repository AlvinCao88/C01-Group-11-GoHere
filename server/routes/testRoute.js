import { Router } from "express";
import { testHandlerFunc1, testHandlerFunc2 } from "../handlers/testHandler.js";

const router = Router();

router.get("/one", testHandlerFunc1);
router.get("/two", testHandlerFunc2);

export default router;
