const Password = require('../service/password');
const users = require('../models/users');
const Session = require('../models/session');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const {BadRequestError,CustomError} = require('@sumanauth/common');
const { distroyCache, setCache } = require('../lib/redis-config');

const signup = async(userData) =>{
    try {
    const {Username, password, Email, FullName} = userData;
    const existinguser = await users.findOne({
        where:{
            Username:Username,
            Email:Email
        }
    });

    if (existinguser) throw new BadRequestError('User already exist');

    const PasswordHash = await Password.toHash(password);

    await users.create({Username,Email,FullName,PasswordHash});

    return 'user created successfully'
        
    } catch (err) {
        if(err instanceof CustomError) throw err
        throw new Error(err.message)
    }

};

const login = async(userData) =>{
    try {
        const {Username,password} = userData;
        const existinguser = await users.findOne({
            where:{
                Username:Username
            }
        });
        if (!existinguser) throw new BadRequestError('User does not exist');
        const match = await Password.compare(existinguser.PasswordHash,password);
        if (!match) throw new BadRequestError('Password is not valid');
        const sessionId = crypto.randomUUID();
        const checkSession = await Session.findOne({
            where:{
                userId:existinguser.UserID
            }
        });
        if(checkSession) await Session.destroy({
            where:{
            userId:existinguser.UserID
        }});
        await Session.create({
            userId:existinguser.UserID,
            expires:new Date(),
            SessionId:sessionId
        })
        const payload = {UserID:existinguser.UserID,Username:existinguser.Username,FullName:existinguser.FullName,SessionId:sessionId};
        
        const Token = CreateJwtToken(payload);
        setCache(Token,payload,3600)
        return {Token};
    } catch (err) {
        if(err instanceof CustomError) throw err
        throw new CustomError(err.message)
    }
};

const logout = async(Token, authdata) =>{
    try {
        await Session.destroy({
            where:{
                SessionId:authdata.SessionId
            }
        });
        distroyCache(Token);
        const message = 'User logout successfuly';
        return {message};
    } catch (err) {
       throw new CustomError(err.message);
    }
};

const CreateJwtToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: process.env.SESSION_TIME+'h', // Token expiration time
    });

    return 'Bearer ' + token;
};

module.exports = {
    signup,login,logout
}