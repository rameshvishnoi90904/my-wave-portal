const hre = require("hardhat");

const main = async () => {
	const [owner, randomperson] = await hre.ethers.getSigners();

	const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
	const waveContract = await waveContractFactory.deploy({
		value: hre.ethers.utils.parseEther("0.1")
	});
	await waveContract.deployed();
	console.log("Contract addy:", waveContract.address);

	let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
	console.log("Contract balance :: ", hre.ethers.utils.formatEther(contractBalance))

	let waveCount;
	waveCount = await waveContract.getTotalWaves();

	const waveTxn = await waveContract.wave("This is wave #1");
	await waveTxn.wait();
  
	const waveTxn2 = await waveContract.wave("This is wave #2");
	await waveTxn2.wait();

	contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
	console.log(
		"Contract balance:",
		hre.ethers.utils.formatEther(contractBalance)
	);

	waveCount = await waveContract.getTotalWaves();

	let allWaves = await waveContract.getAllWaves();
	console.log(allWaves)
};
  
  const runMain = async () => {
	try {
	  await main();
	  process.exit(0); // exit Node process without error
	} catch (error) {
	  console.log(error);
	  process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
	}
	// Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
  };
  
  runMain();