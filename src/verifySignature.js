import { recoverPersonalSignature } from 'eth-sig-util'
/**
 * 
 * @param {string} address 
 * @param {string} signature 
 * @returns 
 */
function verifyEVMSignature(address, signature){
    let recoveredAddress = recoverPersonalSignature({
        data : "Please sign this message to let droplinked view your PublicKey & Address and validate your identity",
        sig : signature
    });
    return recoveredAddress.toLowerCase() == address.toLowerCase();
}
// Example : 
console.log(verifyEVMSignature("0x89281f2da10fb35c1cf90954e1b3036c3eb3cc78" , "0x9ba56709ce42f8a022e6dd0fe81639e3a31da0017f922eb3ec355dcf579bb8380a85641d6b771473d26902c64b42411308dfab0837c121a3c29cdda705a4c2111c"));