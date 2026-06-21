import express from "express"
import { createUser, loginUser ,getdata, increaseClick, getLeaderboard} from "../controllers/auth.controller.js"
import { auth } from "../middleware/auth.middleware.js"


const authRouts = express.Router()

authRouts.post("/signup",createUser)
authRouts.post("/login",loginUser)
authRouts.get("/getdata",auth,getdata)
authRouts.post("/click",auth,increaseClick)
authRouts.get("/leaderboard",auth,getLeaderboard)

export default authRouts;