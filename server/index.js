const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
const corsOptions ={
    origin: "http://localhost:3000",
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(express.json())
app.use(cors(corsOptions))
app.listen(8000, ()=>console.log('File server is running on port 8000'))

app.post('/submit', async (req, res) => {
    try{
       const data = req.body.data
       const url = req.body.baseUrl
        
            const response = await axios.post(
                    `${url}/offchain/store`,
                    data,
                    {headers:{"Content-Type" : "application/json"}}
            ).then (res => {
                console.log(res.data)
            }).catch(err => { console.error(err.response.data) })
            res.send(response)
    }
    catch(err){
        console.error(err.response.data)
    }
})