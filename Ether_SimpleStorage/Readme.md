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

## ----------New----------
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
- Then, to compile the code from the terminal. Make sure that ganache is running. Type this to compile: ```node deploy.js```
