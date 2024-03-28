const User = require('../user')
const jwt = require("jsonwebtoken")
require('dotenv').config();

function Token(user){
    const accessToken = jwt.sign({ username: user.username, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
    const refreshToken = jwt.sign({ username: user.username, role: user.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
}


async function authenticateUser(req,res,next){
    const{username,password}=req.body;
    const user = await User.findOne({username});
    if(!user || user.password !== password){
        return res.status(401).json({MESSAGE:'invalid'});
    }
    const {accessToken , refreshToken} = Token(user);
    console.log("isAdmin",isAdmin)
    console.log({ accessToken, refreshToken });
    next();
}

module.exports = {authenticateUser}