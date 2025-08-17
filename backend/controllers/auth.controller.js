import { signup, login, logout } from "../services/auth.service.js"

import { setCookies, clearCookies } from "../utils/cookies.utils.js"
import { getNewAccessToken } from "../services/token.service.js";

const logInController = async (req, res) => {
    try {
        const { user, tokens } = await login(req.body)
        setCookies(res, tokens)


        res.status(201).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            message: "User successfully logged in"
        });
    } catch (error) {
        console.log(error)
        if (error.statusCode === 409) return res.status(409).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }
}


const logOutController = async (req, res) => {
    try {

        await logout(req.cookies.refreshToken)
        clearCookies(res)
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in log out controller", error)
        res.status(500).json({ message: error.message });
    }

}

const signUpController = async (req, res) => {

    try {
        const { newUser, tokens } = await signup(req.body)
        console.log(tokens)
        setCookies(res, tokens)
        res.status(201).json({
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
            message: "User successfully created"
        });

    } catch (error) {
        console.log(error)
        if (error.statusCode === 409) return res.status(409).json({ message: error.message })
        res.status(500).json({ message: error.message })
    }

}
const getNewAccessTokenController = async (req, res) => {

    try {
        const token = await getNewAccessToken(req.cookies.refreshToken)
        setCookies(res, token)
        res.status(201).json({ message: "Access Token Refresh Successfully" });
    } catch (error) {
        console.log("Error in AccessTokenController:" + error)
        res.status(error.statusCode || 500).json({ message: "Server Error" });
    }

}
const getProfile = async (req, res) => {
    const user = req.user
    try {

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,


        });
    } catch (error) {
        res.status(501).json({ message: "Server error", error: error.message })
    }

}
export { logInController, logOutController, signUpController, getNewAccessTokenController, getProfile }
