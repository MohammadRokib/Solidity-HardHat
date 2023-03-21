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

Here,
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