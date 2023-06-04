import * as Moralisd from 'moralis'
let Moralis = Moralisd.default;
let binanceTestNet = Moralis.EvmUtils.EvmChain.BSC_TESTNET;
let binanceMainNet = Moralis.EvmUtils.EvmChain.BSC;
await Moralis.start({
    apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjJkZTk3NzZlLTMwZTUtNGNjMy1hMTc2LWFkZjViM2E2YWM1YyIsIm9yZ0lkIjoiMzQwOTYxIiwidXNlcklkIjoiMzUwNTE3IiwidHlwZUlkIjoiMjEzMTU2ZDUtYTM1Yi00ZjY0LThkNDMtZWYwMTJlMTJlMTQ2IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODU4NzY2MTYsImV4cCI6NDg0MTYzNjYxNn0.y1C9uIZ7WVjWNS_fBYVAjExFLOGgHlPDNYz7FtyZAOo",
});
/**
 * 
 * @param {string} NFTContractAddress 
 * @param {string} address 
 * @returns 
 */
export async function getAccountBalance(NFTContractAddress, address){
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
        "address" : address,
        "chain" : binanceTestNet,
    });
    return response.toJSON().result.filter(value => value.token_address.toLowerCase() == NFTContractAddress.toLowerCase()).length;
}

/**
 * Gets the amount of tokens owned by the address in the contract_address
 * @param {string} contract_address 
 * @param {string} ownerAddress 
 * @returns 
 */
async function get_address_amount(contract_address, ownerAddress){
    return Number(await getAccountBalance(contract_address, ownerAddress));
}

/**
 * @param {string} address 
 * @param {{addresses : [string], discountPercentage: number, nftsCount : number , description:string, _id : string}} rule 
 * @param {*} reedemedNFTs 
 * @returns 
 */
async function nonGatedPassesRules(
    address,
    rule,
    reedemedNFTs,
){
    let total_amount = 0;
    let NFTsPassed = [];
    for (let i = 0 ; i < rule.addresses.length; i++){
        let contract_address = rule.addresses[i];
        let nftAmount = await get_address_amount(contract_address, address);
        total_amount += nftAmount;
        if (!reedemedNFTs.includes(contract_address) && nftAmount!=0){
            NFTsPassed.push(contract_address);
        }
    }
    return {
        passes : total_amount >= rule.nftsCount,
        NFTsPassed : NFTsPassed
    }
}
/**
 * Checks if the address passes any of the rules in the ruleset sorted by discount percentage
 * @param {string} address 
 * @param {{redeemedNFTs: [*], gated : boolean , rules: [{addresses : [string], discountPercentage: number, nftsCount : number , description:string, _id : string}]}} ruleset 
 * @returns { Promise<{discountPercentage : number, NFTsPassed : [string]}> } the discount percentage and the NFTs that passed the rules
 */
async function getMaxDiscount(address, ruleset){
    const max_discount = {
        discountPercentage :0,
        NFTsPassed : []
    };
    ruleset.rules.sort((a,b) => {
        return b.discountPercentage - a.discountPercentage;
    });
    for (let i = 0 ; i < ruleset.rules.length; i++){
        let rule = ruleset.rules[i];
        const result = await nonGatedPassesRules(address, rule, ruleset.redeemedNFTs);
        if (result.passes){
            return {
                discountPercentage: rule.discountPercentage,
                NFTsPassed : result.NFTsPassed
            };
        }
    }
    return max_discount;
}
/**
 * 
 * @param {string} address 
 * @param {{redeemedNFTs: [*], gated : boolean , rules: [{addresses : [string], discountPercentage: number, nftsCount : number , description:string, _id : string}]}} ruleset 
 * @returns {Promise<boolean>} true if the address passes any of the rules in the ruleset 
*/
const gatedPassesRules = async(
    address,
    ruleset
) => {
    let passes = false;
    for (let i = 0 ; i < ruleset.rules.length; i++){
        let rule = ruleset.rules[i];
        let total_amount = 0;
        for (let j = 0 ; j < rule.addresses.length; j++){
            let contract_address = rule.addresses[j];
            let amount = await get_address_amount(contract_address, address);
            total_amount += amount;
        }
        passes = total_amount >= rule.nftsCount;
        if (passes)
            break;
    }
    return passes;
}

export { getMaxDiscount, gatedPassesRules }