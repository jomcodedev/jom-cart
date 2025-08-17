import Redis from "ioredis";
import dotenev from "dotenv";


dotenev.config();

const redisURL = process.env.UPSTASH_REDIS_URL;
if (!redisURL) throw new Error("Missing redis url in environment variables");

const redis = new Redis(redisURL);

export default redis;
