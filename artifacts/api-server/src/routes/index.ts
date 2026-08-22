import { Router, type IRouter } from "express";
import healthRouter from "./health";
import interestRouter from "./interest";

const router: IRouter = Router();

router.use(healthRouter);
router.use(interestRouter);

export default router;
