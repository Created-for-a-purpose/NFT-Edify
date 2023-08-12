const { ethers } = require("hardhat");

async function main() {
  const skillnft = await ethers.deployContract("SkillNFT");

  console.log(`SkillNFT deployed to ${skillnft.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
