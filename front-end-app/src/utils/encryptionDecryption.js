import crypto from 'crypto-js'
// this function is used to encrypt messageData using AES algorithm of crypto-js package
export const encryption = (messageData, encryptionData) => {
    try {
        let cipher = ''
        if (
            encryptionData.encryptionAlg &&
            encryptionData.encryptionAlg.includes('AES')
        ) {
            cipher = crypto.AES.encrypt(
                messageData,
                encryptionData.encryptionKey,
            )
        } else {
            throw new Error('Invalid Algorithm')
        }
        return cipher.toString()
    } catch (error) {
        console.error(`Encrypt Error: ${error}`)
        throw new Error('Encrypt Failed')
    }
}
// this function is used to decrypt messageData using AES algorithm of crypto-js package
export const decryption = (messageData, encryptionData) => {
    try {
        let decipher = ''
        if (encryptionData.encryptionAlg) {
            if (encryptionData.encryptionAlg.includes('AES')) {
                decipher = crypto.AES.decrypt(
                    messageData,
                    encryptionData.encryptionKey,
                )
            } else {
                throw new Error('Invalid Algorithm')
            }
        } else {
            throw new Error('Invalid Algorithm')
        }
        return decipher.toString(crypto.enc.Utf8)
    } catch (error) {
        console.error(`Decrypt Error: ${error}`)
        throw new Error('Decrypt Failed')
    }
}
