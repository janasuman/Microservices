require('dotenv').config();
const app = require('./app/app');
const {conncetDB} = require('./app/lib/db-handeler');
const redis = require("./app/lib/redis-config");

const start = ()=>{
    app.listen(process.env.PORT || 3001,()=>{
        console.log("Server is running on",process.env.PORT || 3001);
        conncetDB();
        redis.client.connect();
    })
}
start();