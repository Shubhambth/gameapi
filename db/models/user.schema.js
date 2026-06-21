import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullname : {
        type : String,

    },
    email : {
        type : String,
        unique : true,

    },
    password : {
        type : String
    },
    clickcount : {
        type : Number,
        default : 0
    }

})


const User = mongoose.model("User" , userSchema)

export default User;