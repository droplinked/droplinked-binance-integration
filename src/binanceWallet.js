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
        "address" : await getCurrentBinanceAccount()
    };
}

