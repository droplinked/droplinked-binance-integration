# droplinked-binance-integration
The toolkit for integrating Binance into droplinked, including login, gating, record, affiliate, and payment

---

## Sections of this repository


### 1. Login using binance wallet

Simply import loginBinance from `binanceWallet.js` module and use it as below

```js
import {loginBinance} from './src/binanceWallet'
let account_information = await loginBinance();
console.log(account_information);
```

The result would be something like this : 

```json
{
    "publicKey": "0x048d086181d965823c07ad7e6cc2416b3b981ee23c133a1835ca556f34e2605681cd32ae59cda7bafd629f038a9150b97d1d390ae87f152951c0bb76244a0cbbdf",
    "signature": "0x8308bd98a2c89fa8c91678f59a3a31533b33f500c8412bf9aa74abb2719a193d2ebc28b32de78586b5a282014339216f31ca533784962a209f0aeac553787cda1c",
    "address": "0x281834aA6936854c71a71a4Cf9F3b0CcB48DfA3d"
}
```
`signature` is the signed message that will be shown to user on login, also `publicKey` is different from `address`, address is the address of account on binance chain whereas `publicKey` is the cryptographic key used to sign messages and some other stuff.

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

