import User from "../models/user.model.js"
import { generateTokens, refreshTokenSecret, storeRefreshToken } from "./token.service.js";

import jwt from "jsonwebtoken"
import redis from "../lib/redis.js";
import HttpError from "../errors/HttpError.js";


const signup = async ({ name, email, password }) => {
    try {
        const userExists = await User.exists({ email });
        if (userExists) throw new HttpError("User Already Exist", 409)

        const newUser = await User.create({ name, email, password });

        const { accessToken, refreshToken } = generateTokens(newUser._id)

        await storeRefreshToken(newUser._id, refreshToken)

        return { newUser: newUser, tokens: { accessToken, refreshToken } }

    } catch (error) {
        console.log("Error in signup services \n" + error)
        throw error


    }
}


const login = async ({ email, password }) => {
    try {
        const user = await User.findOne({ email })

        if (!user) throw new HttpError("Invalid Password or Email", 409);


        const isPasswordMatch = await user.comparePassword(password)
        if (user && isPasswordMatch) {
            const { accessToken, refreshToken } = generateTokens(user._id);

            await storeRefreshToken(user._id, refreshToken);


            return { user: user, tokens: { accessToken, refreshToken } }

        } else {
            throw new HttpError("Invalid Password or Email", 409);

        }
    } catch (error) {
        console.log("Error in login services \n", error)
        throw error
    }



}


const logout = async (refreshToken) => {
    if (!refreshToken) {

        return
    };
    if (refreshToken) {
        try {

            const decoded = jwt.verify(refreshToken, refreshTokenSecret())

            if (!decoded?.userId) {
                throw new Error("Invalid token payload.");
            }
            await redis.del(`refresh_token:${decoded.userId}`)

            return { success: true }
        } catch (error) {
            throw error
        }
    }



}

export { signup, login, logout }