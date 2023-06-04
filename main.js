import { getAccountBalance } from './src/binanceGating';
import {loginBinance} from './src/binanceWallet'
let account_information = await loginBinance();
console.log(account_information);
console.log(await getAccountBalance("0x795eb8fcea5bd6f9dfea34f3e639b8cf23912870", "0x21b31be8f8cc9d465a17d8832a876cf50341be6f"));