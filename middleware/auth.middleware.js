import jwt from "jsonwebtoken";


export const auth = (req,res,next)=>{


    const token =
    req.headers.authorization?.split(" ")[1];


    if(!token){
        return res.status(401).json({
            message:"No token"
        });
    }


    try{

        const data = jwt.verify(
            token,
            "secretkey"
        );


        req.user=data;

        next();

    }
    catch(err){

        res.status(401).json({
            message:"Token expired"
        });

    }

}