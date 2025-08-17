import User from "../models/user.model.js";
import { accessTokenSecret } from "../services/token.service.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {

    const accessToken = req.cookies.accessToken;
    if (!accessToken) return res.status(401).json({ message: "Unauthorized No access token provided" });

    let decoded;
    try {

        decoded = jwt.verify(accessToken, accessTokenSecret());
    } catch (error) {
        console.log(error)
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Access token expired" });
        }
        return res.status(401).json({ message: "Unauthorized: Invalid Access Token " });
    }

    let user;
    try {
        user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

    } catch (dbError) {
        console.error("Database error:", dbError);
        return res.status(500).json({ message: "Internal server error\n" + dbError });

    }

    req.user = user;
    next()

}

const adminRoute = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next()
    } else {
        res.status(403).json({ message: "Access Denied: Admin Only" })
    }

}


export { protectRoute, adminRoute }