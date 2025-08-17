import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getCouponController, validateCouponController } from "../controllers/coupon.controller.js";


const couponRouter = Router();

couponRouter.get("/", protectRoute, getCouponController);
couponRouter.post("/validate", protectRoute, validateCouponController);


export default couponRouter;