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