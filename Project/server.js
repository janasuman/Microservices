require('dotenv').config();
require('dotenv').config({path:`.env.${process.env.ENVIRONMENT ||'dev'}`});
const app = require('./src/app');
const {conncetDB} = require('./src/lib/db-handeler');
const redis = require("./src/lib/redis-config");

const start = ()=>{
    app.listen(process.env.PORT || 3002,()=>{
        console.log("Server is running on",process.env.PORT || 3002);
        conncetDB();
        redis.client.connect();
    })
}
start();