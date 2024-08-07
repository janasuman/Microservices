const {scrypt,randomBytes} = require('crypto')
const { promisify } = require('util')
const scryptAsync = promisify(scrypt)
class Password {
    static async toHash(password){
        const salt  = randomBytes(8).toString('hex')
        const buf = Buffer.alloc(16,await scryptAsync(password,salt,64))
        return `${buf.toString('hex')}.${salt}`

    }
    static async compare(storepass,suppliarpass){
        const [hashedpassword,salt] = storepass.split('.');
        const buf = Buffer.alloc(16,await scryptAsync(suppliarpass,salt,64))
        return buf.toString('hex') === hashedpassword
    }
}

module.exports = Password