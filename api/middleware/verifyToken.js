const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function verifyToken(req, res, next){
    
    const bearerHeader = req.headers["authorization"];
    console.log(bearerHeader);
    if(bearerHeader){
        const bearer = bearerHeader.split(' ');

        const bearerToken = bearer[1];
        
        jwt.verify(bearerToken, process.env.SECRET_KEY, (err, user) => {
            if(err){
                console.log(err);
                res.sendStatus(403);
            }
            next();
        });

    }else{
        //Bed Request...
        res.sendStatus(400);
    }

};