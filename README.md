# NFT-Edify
## This project was submitted to Superhack by EthGlobal

The project's main idea is to empower decentralized & verifiable credentials (skills). The project leverages EAS to provide on-chain attestations to those accessing our educational content, the attestations contain all the details regarding the course and the skill acquired by the user. These attestations power skill NFTs, which can be minted by the user on successfully receiving a valid attestation. The skill NFTs act as proof of skill which are shareable and act as immutable and verifiable records. Some educational content is limited time free only, so EAS makes it possible to issue attestations with an expiration time representing user access to content. The users would have access to the content till the corresponding attestation is not expired and they would lose access once it does.

Skill NFTs might contain sensitive information or the information a user does not want to share with the world. To ensure privacy, these skill NFTs are powered by zk-SNARKS, implemented using snarkjs and circom. Users can prove that they have a valid attestation issued by our platform without sharing details about the attestation. The circom circuits implemented in this project verify if the attestations were made by the creator of the EAS schema and not by anyone else, and also verifies if the schema UID indeed corresponds to the schema that is issuing proof of skill attestations. Users can generate zk proofs from their skill NFTs and share them with the verifier (employer, institution, etc.). The proofs also contain the attestation recipient address, so the verifier can know if the prover is genuine. The verifier can verify the proof, which is implemented by a smart contract verifier.sol and if the prover does not provide a valid proof, then the verifier would know about the false claim.

Interoperability in our project is made possible by hyperlane and its warp routes. Skill NFTs should not be limited to a single chain ! Interchain implementation future proofs the skill NFTs. Hyperlane was not available on base-goerli testnet, so I successfully deployed hyperlane to base-goerli. The project uses hyperlane's warp routes so that users can bridge their skills NFTs from base to another chains (optimism).
