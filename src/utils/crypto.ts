import crypto from 'crypto-js';
import environments from '../environments';

 export function encryptValue(data: string){
    const dataEncrypt = crypto.AES.encrypt(data, environments.KEY_SECRET_ENCRYPT).toString();
    return dataEncrypt;
 }

 export function decryptValue(data: string){
    const bytes  = crypto.AES.decrypt(data,  environments.KEY_SECRET_ENCRYPT);
    return bytes.toString(crypto.enc.Utf8);
 }