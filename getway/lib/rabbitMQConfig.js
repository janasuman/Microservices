const {Connection} = require('rabbitmq-client');
const rabbit = new Connection({url:process.env.RABBIT});

const rpcClient = rabbit.createRPCClient({confirm: true});

const sendMessage = async (req) => {
    const res = await rpcClient.send('getSession',req)
    // await rpcClient.close()
    // await rabbit.close()
    return res.body;
};


module.exports = {sendMessage};