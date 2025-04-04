import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";


// export const authUser = async(req, res, next)=>{
//     try{
//         const token = req.cookies.token || req.headers.authorization.split('')[ 1 ];

//         if(!token){
//             return res.status(401).send({errors: 'Unauthorized User'});
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     }catch(error){
//         // console.log(error);
//         res.status(401).send({errors: 'Unauthorized User'});
//     }
// }


export const authUser = async (req, res, next) => {
    try {
        let token = req.cookies.token;

        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith("Bearer ")) {
                token = authHeader.split(" ")[1];
            }
        }

        if (!token) {
            return res.status(401).json({ error: "Unauthorized User: No Token Provided" });
        }

        const isBlackListed = await redisClient.get(token);
        if(isBlackListed){
            res.cookies('token',' ');

            return res.status(401).send({error: 'Unauthorized User'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        
        res.status(401).json({ error: "Unauthorized User" });
    }
};