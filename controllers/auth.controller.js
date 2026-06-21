import bcrypt from "bcrypt";
import User from "../db/models/user.schema.js";
import jwt from "jsonwebtoken";



export const createUser = async(req,res)=>{

    const {
        fullname,
        email,
        password
    } = req.body;


    const existingUser = await User.findOne({
        email
    });


    if(existingUser){
        return res.status(400).json({
            message:"User already exists"
        });
    }


    const hashPassword = await bcrypt.hash(
        password,
        10
    );


    const user = await User.create({
        fullname,
        email,
        password:hashPassword
    });


    res.json({
        message:"Account created"
    });

};





export const loginUser = async(req,res)=>{

    const {
        email,
        password
    } = req.body;


    const user = await User.findOne({
        email
    });


    if(!user){
        return res.status(404).json({
            message:"User not found"
        });
    }


    const match = await bcrypt.compare(
        password,
        user.password
    );


    if(!match){
        return res.status(401).json({
            message:"Wrong password"
        });
    }



    const token = jwt.sign(
        {
            id:user._id
        },
        "secretkey",
        {
            expiresIn:"1h"
        }
    );


    res.json({
        token,
        user:{
            fullname:user.fullname,
            email:user.email
        }
    });

};


export const getdata = async(req,res) => {

    const user = await User.findById(req.user.id)

    
    res.json({
        "data" : req.user.id,
        user
    })
}

export const increaseClick = async(req,res)=>{

    const user = await User.findByIdAndUpdate(
        req.user.id,
        {
            $inc:{
                clickcount:1
            }
        },
        {
            new:true
        }
    );

    console.log(user.clickcount)

    res.json({
        clickCount:user.clickcount
    });

};



export const getLeaderboard = async(req,res)=>{

    const leaderboard = await User.find()
        .select("fullname clickcount")
        .sort({
            clickcount:-1
        })
        .limit(10);


    res.json({
        leaderboard
    });

}