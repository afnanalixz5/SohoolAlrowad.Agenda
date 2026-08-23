import { Router, type IRouter } from "express";
import healthRouter from "./health";
import interestRouter from "./interest";
import registrationsRouter from "./registrations";

const router: IRouter = Router();

router.use(healthRouter);
router.use(interestRouter);
router.use(registrationsRouter);

export default router;
