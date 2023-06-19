# droplinked-binance-integration
The toolkit for integrating Binance into droplinked, including login, gating, record, affiliate, and payment

---

## Sections of this repository


### 1. Login using binance wallet (Front-end)

Simply import loginBinance from `binanceWallet.js` module and use it as below

```js
import {loginBinance} from './src/binanceWallet'
let account_information = await loginBinance();
console.log(account_information);
```

The result would be something like this : 

```json
{
    "signature": "0x8308bd98a2c89fa8c91678f59a3a31533b33f500c8412bf9aa74abb2719a193d2ebc28b32de78586b5a282014339216f31ca533784962a209f0aeac553787cda1c",
    "address": "0x281834aA6936854c71a71a4Cf9F3b0CcB48DfA3d"
}
```
`signature` is the signed message that will be shown to user on login.


### 1.1. Login to binance using metamask (Front-end)

```js
import { BinanceMetamaskLogin } from './src/binanceMetamask';
try{
    let account_information = await BinanceMetamaskLogin();
    console.log(account_information);
}catch(error){
    console.error(error);
    if (error == "Please install Metamask"){
        // TODO: Show a popup to install Metamask
    }
}
```

The result would be something like this : 

```json
{
    "address": "0x89281f2da10fb35c1cf90954e1b3036c3eb3cc78",
    "network": "TestNet",
    "signature": "0x9ba56709ce42f8a022e6dd0fe81639e3a31da0017f922eb3ec355dcf579bb8380a85641d6b771473d26902c64b42411308dfab0837c121a3c29cdda705a4c2111c"
}
```

### 1.3 Signature Verifiaction (Back-end)

Use the `verifyEVMSignature` function from the `src/verifySignature.js` to verify a signature like this :

```js
console.log(verifyEVMSignature("0x89281f2da10fb35c1cf90954e1b3036c3eb3cc78" , "0x9ba56709ce42f8a022e6dd0fe81639e3a31da0017f922eb3ec355dcf579bb8380a85641d6b771473d26902c64b42411308dfab0837c121a3c29cdda705a4c2111c"));
```

It would return a `true` or `false` value based on the signature check.


### 2. Binance Gating

You can use the gating logic like this : 

```js
import {getMaxDiscount , gatedPassesRules} from './src/binanceGating'
let ruleset = {
    "rules":[
    {
        "addresses": [ 
            "0x795eB8FcEa5bd6F9dFEA34F3e639B8CF23912870"
        ],
        "discountPercentage": 10,
        "nftsCount": 1,
        "description": "description",
        "_id": "637a043fa0581bf9d5c568c5"
    }
],
"redeemedNFTs" : [],
"gated" : false
};

let address = "0x21b31be8f8cc9d465a17d8832a876cf50341be6f"; // Instead of this address, put the `address` from account_information that you get from login

let max_discount = await getMaxDiscount(address,ruleset);
console.log("Max discount percentage : " , max_discount.discountPercentage);
console.log("NFTs passed : " , max_discount.NFTsPassed);

let ruleset2 =  {
    "_id": "636b61c5422f885bc43bacf0",
    "collectionID": "636ac267913374ba96de3d0b",
    "rules": [
        {
            "addresses": [
                "0x795eB8FcEa5bd6F9dFEA34F3e639B8CF23912870",
            ],
            "discountPercentage": null,
            "nftsCount": 2,
            "description": "asdfasdf",
            "_id": "63c549c4a2bf46798e499531"
        }
    ],
    "redeemedNFTs": [],
    "gated": true,
    "ownerID": "636ac1e6a8a01cfc350ac117",
    "webUrl": "behdad.com",
    "createdAt": "2022-11-09T08:16:05.360Z",
    "updatedAt": "2023-01-16T12:57:40.669Z",
    "__v": 0
};

if (await gatedPassesRules(address, ruleset2)){
    console.log("You can pass the gate")
}else{
    console.log("You can't pass the gate")
}
```

Result : 
```
Max discount percentage :  10
NFTs passed :  ["0x795eB8FcEa5bd6F9dFEA34F3e639B8CF23912870"]
You can pass the gate
```

