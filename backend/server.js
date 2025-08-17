import express from "express";
import connectDatabase from "./database/connection.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path"

// import authRouter from "./routes/auth.route.js"
// import productsRouter from "./routes/products.route.js";
// import cartRouter from "./routes/cart.route.js";
// import couponRouter from "./routes/coupon.route.js";
// import paymentRouter from "./routes/payment.routes.js";
// import analyticsRouter from "./routes/analytics.route.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve()


app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());





// app.use("/api/auth", authRouter);
// app.use("/api/products", productsRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/coupons", couponRouter);
// app.use("/api/payments", paymentRouter);
// app.use("/api/analytics", analyticsRouter);

if (process.env.NODE_ENV === "production") {

    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

const startServer = async () => {
    try {
        await connectDatabase();

    } catch (error) {
        console.error("Failed to connect to Database.");
        console.error(error);
        process.exit(1);
    }
    try {
        app.listen(PORT, () => {
            console.log(`Server running at PORT: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Server Error");
        console.error(error);
        process.exit(1);
    }
};

startServer();