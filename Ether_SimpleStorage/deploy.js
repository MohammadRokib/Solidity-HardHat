// importing ethres here. it is const so that ethers can't be changed
const ethers = require("ethers");

// to read the ABI and Binary file. we need them to deploy our contract
const fs = require("fs-extra");

// async function is a function which can wait for the contract to deploy.
// functions which are not async doesn't wait for the contract to deploy.
async function main() {
    // http://127.0.0.1:7545
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
    // this script tells to connect to the local blockchain node which is
    // at http://127.0.0.1:7545

    // adding a wallet from ganache
    const wallet = new ethers.Wallet(
        "0xdb043e69ff8147ae7e3e34e40211cc7f6acdd6aedf91acd03e042d247bd3da1b",
        provider
    );

    // to get the ABI and the Binary file
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");

    // Deployment
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("Deploying, please wait...");
    const contract = await contractFactory.deploy()
    const deploymentReceipt = await contract.deployTransaction.wait(1); // wait for 1 confirmation
    // console.log(contract);

    // interacting with the contract
    // ##--retrieve--##
    const currentNumber = await contract.retrieve();
    console.log(currentNumber); // output=> BigNumber { _hex: '0x00', _isBigNumber: true }
    console.log(currentNumber.toString());                      // output=> 0
    console.log(`Current Number: ${currentNumber.toString()}`); // output=> Current Number: 0

    // ##--store--##
    const transactionResponse = await contract.store("23");
    const transactionReceipt = await transactionResponse.wait(1);
    const updatedCurrentNumber = await contract.retrieve();
    console.log(`Current Number: ${updatedCurrentNumber.toString()}`);
}

// it just calls the main function. and gives error message if any error occurs.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });