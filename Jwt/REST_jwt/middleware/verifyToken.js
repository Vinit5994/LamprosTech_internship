function verifyToken(req, res, next) {

    
    const bearerheader = req.headers['authorization'];
    console.log(bearerheader);
    if (typeof bearerheader != 'undefined') {
        const bearer = bearerheader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
        console.log("done")
    } else {
        res.send({ result: "Token is not valid!" });
    }
}

module.exports={verifyToken}