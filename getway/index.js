const http = require("http");
const app = require('./app/app');
const culster = require("cluster");
const os = require("os");
const redis = require('./lib/redis-config');

const numCpu = os.cpus().length;
const server = http.createServer(app);
app.get('/', (req, res) => {
    res.send('Hello World');
});
if (culster.isMaster) {
    for (let i = 0; i < numCpu; i++) {
        culster.fork();
    }
    culster.on("exit", (Worker) => {
        console.log(`process is diad: ${Worker.process.pid}`);
    })
}
else {
    server.listen(3000, () => {
        console.log(`Hello server runing with : ${process.pid} : 3000`);
        redis.client.connect();
    })
}

