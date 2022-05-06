const jwt = require("jsonwebtoken");
const mySecretCode = "MySecretCode";

const getToken = (payload)=>{
    
    let token = jwt.sign(payload, mySecretCode);
    return token
}
const verifyToken = (token)=>{
        let data = jwt.verify(token, mySecretCode);
        return data;
}

module.exports = {
    getToken,
    verifyToken
}