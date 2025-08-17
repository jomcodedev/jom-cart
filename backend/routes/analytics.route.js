import { Router } from "express"
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js"
import analyticsController from "../controllers/analytics.controller.js"

const analyticsRouter = Router()

analyticsRouter.get("/", protectRoute, adminRoute, analyticsController)

export default analyticsRouter