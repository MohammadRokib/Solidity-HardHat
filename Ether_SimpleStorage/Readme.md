At first copy the SimpleStorage code from here: [SimpleStorage.sol](https://github.com/MohammadRokib/Solidity-Basics/blob/main/contracts/SimpleStorage.sol).

Then create SimpleStorage.sol here and paste the code in it. Then create another file named ```deploy.js``` and type the code which is given in it.

To deploy the contract I'll use ```solc-js``` which can be installed by ```npm``` or ```yarn``` I am going to use ```yarn```

To install yarn enable type ```sudo corepack enable``` in the directory of the source codes.

Then, ```yarn add solc``` It will install solc into our project. After running this command two files will be added to the folder. ```package.json``` and ```yarn.lock```

Since I have used solidity version 0.8.7 therefore I have to add solc version 0.8.7. To that type the command ```yarn add solc@0.8.7-fixed```

After installing solc in this directory to compile the ```SimpleStorage.sol``` We have to type:
```
yarn solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleSotrage.sol
```

Here,<br>
```--bin``` we want the binary file so added this.<br>
```--abi``` we want the ABI of the contract so added this.<br>
```--include-path node_modules/``` we want to add any contracts or files in our node modules.<br>
```--base-path .``` means base path is going to be this folder.<br>
```-o .``` means we're going to output the compiled binary and ABI to this folder.<br>
```SimpleStorage.sol``` the contract we want to compile.

After running the command two files will be created ```SimpleStorage_sol_SimpleStorage.abi``` and ```SimpleStorage_sol_SimpleStorage.bin```

The command for compiling the code is very big. We can add this as a script in the ```package.json``` file. To do that we can add the below code:
```
"scripts": {
    "compile": "yarn solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol"
}
```
Now we can just type ```yarn compile``` to compile the code.

<br>
After successfully compiling the smart contract. Now I will deploy the smart contract. We need a blockchain to deploy smart contract. We can create a private blockchain using ```Ganache```.

Installing ganache:
- Download Ganache from this link: [Ganache](https://trufflesuite.com/ganache/)
- Make ganache executable with this command: ```sudo chmod a+x ganache-2.7.0-linux-x86_64.AppImage```
  run this command from the directory where the downloaded file is.
- Open ganache from the folder where it is in. Type this command: ```./ganache-2.7.0-linux-x86_64.AppImage```
<br>

Ganache will provide us the blockchain node. But to deploy our smart contract on the node we need ```ethers.js``` The ethers.js library aims to be a complete and compact library for interacting with the Ethereum Blockchain and its ecosystem. It was originally designed for use with ethers.io and has since expanded into a more general-purpose library.

##

Installing ethers
- Type this command to install ethers: ```yarn add ethers@5.7.2``` version of the ethers can seen in the package.json file.
- Import ethers into deploy.js. To do that type ```const ethers = require("ethers");``` at top of deploy.js.
- To connect the smart contract with the blockchain node provider type <br>
```const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");``` into ```async fucntion main()``` of deploy.js
- Then adding a new wallet so that we can sign new transactions. Type this into ```async function main()``` of deploy.js:
```
    const wallet = new ehters.Wallet(
        "paste_a_private_key_from_ganache",
        provider
    );
```
- Reading the contract object (ABI and Binary file) to deploy the contract. To do that type this at the top of deploy.js: <br>
```const fs = require("fs-extra");```
- Then import ABI and the Binary file. Type this after wallet at ```async function main()``` in deploy.js: <br>
```
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");
```
##

Then I will create contract factory which is an object. It will deploy our smart contract on the Ganache blockchain node.
- Type the below code after ```const abi``` and ```const binary``` at ```async function main()``` in deploy.js: <br>
```const contractFactory = new ethers.ContractFactory(abi, binary, wallet);```
- ***Optional*** Show a message to wait after ```contractFactory``` Type this: ```console.log("Deploying, please wait..."):```
- To deploy the contract type this after the waiting message: <br>
```const contract = await contractFactory.deploy();```
  here await make sure that the code waits until the contract is doployed successfully.
- To see the contract details type this: ```console.log(contract);```
- Then, to compile the code from the terminal. Make sure that ganache is running. Type this to compile: ```node deploy.js``` <br><br>


At this point we have deployed the contract successfully but still can't interact with it. We have a few functions defined in our smart contract ***SimpleStorage.sol***. They are:
store (stores a function)
retrieve (shows the stored function)
addPerson (stores a name and a favorite number of a person)

We can access these functions in the following way
- ***retrieve*** <br>
  ```const currentNumber = await contract.retrieve();``` storing the number in currentNumber
  
  ```console.log (currentNumber);``` output=> BigNumber { _hex: '0x00', _isBigNumber: true }<br>
  The output is like this because JavaScript can't handle big numbers.
  
  ```console.log (currentNumber.toString());``` output=> 0<br>
  Since the number is in string format JavaScript can process it.
  
  ```console.log (`Current Number: ${currentNumber.toString()}`);``` output=> Current Number: 0
  
- ***store*** <br>
  ```const transactionResponse = await contract.store("23");``` passing the number 23<br>
  The number is given in string format. As JavaScript can't process big numbers.
  
  ```const transactionReceipt = await transactionResponse.wait(1);``` waiting for one block confirmation
  
  ```const updatedCurrentNumber = await contract.retrieve();``` then retrieving the number we just saved
  
  ```console.log(`Current Number: ${updatedCurrentNumber.toString()}`);``` printing the saved number in the console

## ----------New----------
At this point we have deployed and successfully interacted with our SimpleStorage.sol smart contract. But if we look into our code we can see our Private_Key and the RPC_URL.

Now this is a test environment. The Private_Key and the RPC_URL used here are test data which we got from ganache. So if someone get access to these it wouldn't be a problem.

But if the values were real value then with the Private_Key anyone can access the wallet and transfer all the currency and with the private key anyone can access our API. Which we don't want. But we still have to provide our Private_Key and the RPC_URL in our code.
So how do we do this.

This is where Environment Variables come to the play. This is a ```.env``` file which we will add into our project and we will store all our sensitive data in it. Then we will import the ***.env*** file where ever we need it and can use those sensitive data through the ***.env*** file.

- ```yarn add dotenv``` type this in the terminal of your source code directory. <br>
  This will install ***.env*** configurations on that directory.
 
- Then create ***.env*** file in your source code directory.
  Put all the sensitive data in it. I'm putting the Private_Key and the RPC_URL in it.
  ```
    PRIVATE_KEY=0x1071404bb4d5da2898a7c37dac393656ce03c674f05fdf06a8194a19d4e1a859
    RPC_URL = http://127.0.0.1:7545
  ```
- ```require("dotenv").config();``` type this to import everything inside the ***.env*** file in your code.

- ```process.env.PRIVATE_KEY```	 replace your private key with this in your code.
  Also delete the ```""``` around the private key.

- ```process.env.RPC_URL```	 replace your rpc url with this in your code.
  Also delete the ```""``` around the rpc url.

After doing that our code will fetch the Private_Key and the RPC_URL from the ***.env*** file. And we can share our code without compromising sensitive data.

Now when we push our project to github our .env file will also be pushed with all the other code. So to ingnore that I will create a file named ***.gitignore*** and type all the file names in it which we don't want to push in github. And then if we push our project to github the files mentioned in the ***.gitignore*** file won't be pushed.


Up untill now we were deploying our Smart Contracts on Ganache. Which is a local blockchain node. Now we will deploy our smart contract on a real testnet. For that we will use a third-party RPC URL. There are so many options like: [Alchemy](https://www.alchemy.com/), [QuickNode](https://www.quicknode.com/), [Moralis](https://moralis.io/), [Infura](https://www.infura.io/)

I am going to use. Feel free to use any one of them. If you are continuing with Alchemy then go to this link [Alchemy](https://www.alchemy.com/). Then create a free account. When you are in the dashboard page clck on ```+CREATE APP```. Then select any testnet availabe. I am using ***Sepolia*** give a name and description.

After creating the App click on it. You can see all the descriptions of the App. On the top right corner there are 3 buttons. ```VIEW KEY``` ```ADD TO WALLET``` ```EDIT APP```. Click on the ***VIEW KEY*** button and copy the HTTPS link. This will be the RPC_URL. Paste it in the ***.env*** file in your project.

Then open metamask and click on the 3 dots on the top right corner then
```
Account Details -> Export Private key -> Give your password -> click Confirm
```
Then copy the private key and paste it in the ***.env*** file in your project.

***NOTE:*** if you don't have a metamask wallet first create one.

After doing all that if you run the code it will run on Sepolia blockchain through Alchemy.