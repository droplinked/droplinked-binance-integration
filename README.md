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



