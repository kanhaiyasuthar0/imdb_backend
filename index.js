const http = require("http");
const app = require("./src/controllers/user");
const connect = require("./src/config/db");
const PORT =  9008;

http.createServer(app).listen(PORT, async ()=>{
   await connect();
    console.log(`Server is connected ${PORT}`)
})
