import axios from "axios"


export const CountUsers = async()=>{


  await  axios.get("http://localhost:8800/api/oneuser")
    .then(res => { return res.data.total})
    .catch(err => console.error("erro", err))
}