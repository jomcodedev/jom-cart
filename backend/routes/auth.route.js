import { Router } from "express"

import {
    signUpController,
    logInController,
    logOutController,
    getNewAccessTokenController,
    getProfile
}
    from "../controllers/auth.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js"

const authRouter = Router()

authRouter.post("/signup", signUpController)
authRouter.post("/login", logInController)
authRouter.post("/logout", logOutController)
authRouter.post("/token/refresh", getNewAccessTokenController)
authRouter.get("/profile", protectRoute, getProfile);

export default authRouter