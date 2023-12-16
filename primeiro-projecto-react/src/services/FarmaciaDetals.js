import axios from "axios"


export const FarmaciaDetals = async(id)=>{

  await  axios.get("http://localhost:8800/m/med/", id)
    .then(res => {
        if(res.data.data){
            return res.data.data
        }
    })
    .catch(erro => alert(erro))
}

export const CountFarmacias =async()=>{

  await  axios.get("http://localhost:8800/f/cfarma")
    .then(res => {
        if(res.data.data){
            return res.data.data
        }
    })
    .catch(erro => alert(erro))
}
export  const FarmaciasData = async ()=>{
    await  axios.get(`http://localhost:8800/f/todasfarma`)
      .then(res => {
        console.log(res.data.data)
        return res.data.data
    })
      .catch(error=> console.error( error+"erro! ao servidor"))
  }