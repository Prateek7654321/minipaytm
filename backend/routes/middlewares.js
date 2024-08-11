const  json_secret  = require("../config");
const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader
    console.log(token);

    try {
        const decoded = jwt.verify(token, json_secret);
        
        req.userid = decoded.userid;
        

        next();
    } catch (err) {
        return res.status(403).json({msg:"invalid token"});
    }
};

module.exports = authMiddleware
