// console.log(window.BinanceChain);
// console.log("Current Account : " + await window.BinanceChain.enable())
// console.log(await window.BinanceChain.requestAccounts()) // All Accounts
// console.log(await window.BinanceChain.requestAddresses()) // All addresses

/**
 * 
 * @returns {Promise<string>} the Currently active Binance Account
 */
export async function getCurrentBinanceAccount(){
    return (await window.BinanceChain.enable())[0];
}

export async function signBinance(message){
    console.log(window.BinanceChain)
    console.log(await window.BinanceChain.bnbSign(await getCurrentBinanceAccount(), message));
}

export async function loginBinance(){
    let result = await window.BinanceChain.bnbSign(await getCurrentBinanceAccount(), "Please sign this message to let droplinked access to your PublicKey and validate your identity.");
    return {
        "publicKey" : result.publicKey,
        "signature" : result.signature,
        "address" : ""
    };
}

export function publicKeyToAddress(publicKey) {
    const sha256 = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(publicKey));
    const ripemd160 = CryptoJS.RIPEMD160(sha256);
    const words = CryptoJS.enc.Hex.parse(ripemd160.toString());
    const checksum = CryptoJS.SHA256(CryptoJS.SHA256(words)).toString().substr(0, 8);
    return "0x" + words.toString() + checksum;
}