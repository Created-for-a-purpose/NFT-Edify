const express = require("express")
const cors = require("cors")
const snarkjs = require("snarkjs")

const app = express()
const corsOptions ={
    origin: "http://localhost:3000",
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(express.static('./ZKP'))
app.listen(8000, ()=>console.log('File server is running on port 8000'))

app.post("/generateProof", async (req, res) => {
    try{
        const signals = req.body
        const wasmFile = "./ZKP/pos_js/pos.wasm"
        const zkeyFile = "./ZKP/circuit_final.zkey"

        const { proof, publicSignals } = await snarkjs.plonk.fullProve(signals, wasmFile, zkeyFile)
        const callData = await snarkjs.plonk.exportSolidityCallData(proof, publicSignals)
        
        res.send({ proof, publicSignals, callData })
    }
    catch(err){
        console.log(err)
    }
})

app.post("/verifyProof", async (req, res) => {
    try{
        const vkey = req.body.vkey
        const publicSignals = req.body.publicSignals
        const proof = req.body._proof

        const isValid = await snarkjs.plonk.verify(vkey, publicSignals, proof)
        res.send(isValid)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})