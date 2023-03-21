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
        "0x0f3b99b0d933fdc248de70a222e74f00db84f2afc7c78df85b46e55067769e12",
        provider
    );

    // to get the ABI and the Binary file
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");

    // Deployment
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("Deploying, please wait...");
    const contract = await contractFactory.deploy()
    console.log(contract);
}

// it just calls the main function. and gives error message if any error occurs.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });