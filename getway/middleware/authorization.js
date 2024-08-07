const jwt = require('jsonwebtoken');
const {setCache, getCache} = require('../lib/redis-config');

const authorization = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const cacheUser = await getCache(token);
    if (cacheUser) {
        req.authdata = cacheUser;
        return next();
    }
    jwt.verify(token.split(" ")[1], process.env.JWT_KEY, async (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        await setCache(token, user, 3600);
        req.authdata = user;
        next();
    });
};

module.exports = {
    authorization
};
