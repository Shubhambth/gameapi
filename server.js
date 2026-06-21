import express from "express"
import { connectDB } from "./db/db.js"
import dotenv from "dotenv"
import authRouts from "./routes/auth.routes.js"

dotenv.config()

const app = express()

app.use(express.json())

connectDB()


app.use("/api/v1/auth",authRouts)

export default app;