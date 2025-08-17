

const setCookies = async (res, tokens = {}) => {
    const { accessToken, refreshToken } = tokens;

    if (accessToken) {
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
        });
    }

    if (refreshToken) {
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    }
};

const clearCookies = (res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
};


export { setCookies, clearCookies }