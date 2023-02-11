import { ethers, run } from "hardhat";

async function main() {
	// Address of the whitelist contract that you deployed in the previous module
	const whitelistContract = '0xd013AC3FbfD249e7100D1C0cC55650B99bfd037c';
	// URL from where we can extract the metadata for a Crypto Dev NFT
	const metadataURL = 'https://nft-collection-sneh1999.vercel.app/api/';
	/*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so cryptoDevsContract here is a factory for instances of our CryptoDevs contract.
  */
	const cryptoDevsContract = await ethers.getContractFactory('CryptoDevs');

	// deploy the contract
	const deployedCryptoDevsContract = await cryptoDevsContract.deploy(
		metadataURL,
		whitelistContract
	);

	// Wait for it to finish deploying
	await deployedCryptoDevsContract.deployed();

	// print the address of the deployed contract
	console.log(
		'Crypto Devs Contract Address:',
		deployedCryptoDevsContract.address
  );
  
  console.log('Sleeping.....');
	// Wait for etherscan to notice that the contract has been deployed
	await sleep(40000);

	// Verify the contract after deploying
	await run('verify:verify', {
		address: deployedCryptoDevsContract.address,
		constructorArguments: [metadataURL, whitelistContract],
	});
}

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
