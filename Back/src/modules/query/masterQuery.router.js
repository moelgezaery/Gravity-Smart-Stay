import { Router } from "express";
import * as queryController from "./controller/query.controller.js";

const router = Router();
//post query
router.post("/query",queryController.queryMaster)

export default router;
