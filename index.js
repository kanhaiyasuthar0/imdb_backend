const http = require("http");
const app = require("./src/controllers/user");
const connect = require("./src/config/db");
const PORT = process.env.PORT ||  9007;
console.log(PORT)
http.createServer(app).listen(PORT, async ()=>{
    await connect();
    console.log(`Server is connected ${PORT}`)
})
