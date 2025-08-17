import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";

import { checkoutSuccessController, createCheckoutSessionController } from "../controllers/payment.controller.js";

const paymentRouter = Router()
paymentRouter.post("/checkout/session", protectRoute, createCheckoutSessionController)
paymentRouter.post("/checkout/success", protectRoute, checkoutSuccessController)

export default paymentRouter