
async function main() {
  const verifier = await ethers.deployContract("PlonkVerifier");

  console.log(`Verifier deployed to ${verifier.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
