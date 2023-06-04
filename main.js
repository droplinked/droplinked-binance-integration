import {loginBinance} from './src/binanceWallet'
let account_information = await loginBinance();
console.log(account_information);