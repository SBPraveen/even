import crypto from 'crypto-js'
// this function is used to encrypt messageData using AES algorithm of crypto-js package
export const encryption = (messageData, key) => {
    try {
        const cipher = crypto.AES.encrypt(messageData, key)
        return cipher.toString();
    } catch (error) {
        console.error(`Encrypt Error: ${error}`)
        throw new Error('Encrypt Failed')
    }
}
// this function is used to decrypt messageData using AES algorithm of crypto-js package
export const decryption = (messageData, key) => {
    try {
        const decipher = crypto.AES.decrypt(messageData, key)
        return decipher.toString(crypto.enc.Utf8);
    } catch (error) {
        console.error(`Decrypt Error: ${error}`)
        throw new Error('Decrypt Failed')
    }

}