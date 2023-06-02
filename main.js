import {getCurrentBinanceAccount, loginBinance, publicKeyToAddress, signBinance} from './src/binanceWallet'

console.log(await getCurrentBinanceAccount());
console.log(await loginBinance());

const publicKey = "0x048d086181d965823c07ad7e6cc2416b3b981ee23c133a1835ca556f34e2605681cd32ae59cda7bafd629f038a9150b97d1d390ae87f152951c0bb76244a0cbbdf";
const address = publicKeyToAddress(publicKey);
console.log(address);