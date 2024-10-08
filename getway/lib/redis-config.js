const redis = require('redis');

// Create Redis client with authentication

const client = redis.createClient({
    url:'redis://'+process.env.REDISURL,
    // password: 'redis123' // Replace with your Redis password
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

// Utility functions for caching
const getCache = async (key) => {
    try {
        const data = await client.get(key);
        return data ? JSON.parse(data):null;
    } catch (err) {
        console.log(err);
    }
};

const setCache = async (key, value, expirationInSeconds) => {
    try {
        await client.set(key, JSON.stringify(value),{
            EX: expirationInSeconds
        });
    } catch (error) {
        console.log(error);
    }
};

const distroyCache = async (key) =>{
    await client.del(key);
};

module.exports = {
    getCache,setCache,distroyCache,client
}
