const {Connection} = require('rabbitmq-client');
const Session = require('../models/session');
const rabbit = new Connection({url:process.env.RABBIT});

const rpcServer = rabbit.createConsumer({
queue: 'getSession'
}, async (req, reply) => {
await reply(await Session.findOne({
    where: {
        SessionId: req.body
    }
}))
})

process.on('SIGINT', async () => {
await rpcServer.close()
await rabbit.close()
});

module.exports = rabbit;
