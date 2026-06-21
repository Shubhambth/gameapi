import express from "express"
import { connectDB } from "./db/db.js"
import dotenv from "dotenv"
import authRouts from "./routes/auth.routes.js"

dotenv.config()

const app = express()

app.use(express.json())

app.use("/api/v1/auth", authRouts)

app.get("/test",(req,res)=>{
    res.json({
        message:"working"
    })
})


connectDB()

export default app