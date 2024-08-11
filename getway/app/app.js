const express = require('express')
const app = express()
var proxy = require('express-http-proxy');
var cors = require('cors')
var helmet = require('helmet');
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
var hpp = require('hpp');
const fs = require("fs");
const { authorization } = require('../middleware/authorization');
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// store: ... , // Use an external store for more precise rate limiting
})

const proxyOptions = {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        if (srcReq.authdata) {
            // Add authdata as a JSON string to the headers
            proxyReqOpts.headers['X-Auth-Data'] = JSON.stringify(srcReq.authdata);
        }
        return proxyReqOpts;
    }
};


app.use(limiter)
app.use(cors())
app.use(helmet())
// app.use(express.urlencoded())
app.use(express.json())
app.use(xss())
app.use(hpp())
app.use('/api/v1/auth',authorization, proxy(process.env.AUTH_URL, proxyOptions));
app.use('/api/v1/user', proxy(process.env.AUTH_URL));
app.use('/api/v1/project',authorization, proxy(process.env.PROJECT_URL, proxyOptions));
app.use('/', proxy('http://localhost:3003'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;