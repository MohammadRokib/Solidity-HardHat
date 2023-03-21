// async function is a function which can wait for the contract to deploy.
// functions which are not async doesn't wait for the contract to deploy.
async function main() {
    
}

// it just calls the main function. and gives error message if any error occurs.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });