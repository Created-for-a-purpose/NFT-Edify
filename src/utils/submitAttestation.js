import axios from 'axios'
const baseUrl = "https://sepolia.easscan.org"

const submitAttestation = async (pkg) => {
 const data = {
     fileName: 'eas.txt',
     textJson: JSON.stringify(pkg,  (key, value) =>
     typeof value === 'bigint'
         ? value.toString()
         : value)
 }
 let reqConfig = {
    url: "http://localhost:8000/submit",
    method: 'POST',
    data: {data, baseUrl}
  }
 return await axios.request(reqConfig)
}

export default submitAttestation;