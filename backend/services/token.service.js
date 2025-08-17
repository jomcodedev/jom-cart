
import jwt from "jsonwebtoken"
import redis from "../lib/redis.js"

import dotenv from "dotenv"
import HttpError from "../errors/HttpError.js";

dotenv.config()


const accessTokenSecret = () => {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) throw new Error(" ACCESS_TOKEN_SECRET is missing");
    return secret;
};

// const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const refreshTokenSecret = () => {
    const secret = process.env.REFRESH_TOKEN_SECRET;
    if (!secret) throw new Error("REFRESH_TOKEN_SECRET is missing");
    return secret;
};

// const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
const generateAccessToken = (userId) => jwt.sign({ userId }, accessTokenSecret(), { expiresIn: "15m" })

const generateRefreshToken = (userId) => jwt.sign({ userId }, refreshTokenSecret(), { expiresIn: "7d" })

const generateTokens = (userId) => {
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);
    return { accessToken, refreshToken }
}

const storeRefreshToken = async (userId, refreshToken) => {
    await redis.set(`refresh_token:${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60)
}

const getNewAccessToken = async (refreshToken) => {
    try {

        const decodedRefreshToken = jwt.verify(refreshToken, refreshTokenSecret())

        const savedRefreshToken = await redis.get(`refresh_token:${decodedRefreshToken.userId}`)

        if (refreshToken !== savedRefreshToken) throw new HttpError("Invalid Refresh Token", 401)

        const newAccessToken = generateAccessToken(decodedRefreshToken.userId)

        return { accessToken: newAccessToken }

    } catch (error) {
        console.log(`Error in getAccessNewTokenService: ${error}`)
        throw error
    }


}

export { generateTokens, storeRefreshToken, refreshTokenSecret, accessTokenSecret, getNewAccessToken }










