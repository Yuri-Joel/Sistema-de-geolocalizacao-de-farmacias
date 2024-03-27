import { ActualizarFarmaciaAdmin, ActualizarFarmacias, Buscarhora, ContarFarmacias, CriarNewFarmacia, DeleteFarmacia, FarmaciaAberta, ObterFarmaciaId, Todasfarmacias, TodasfarmaciasHome, UpdateHorario } from "../Models/farmaciaModels.js"
import { Validateall } from "./usuarioControllers.js";
import axios from 'axios'


export const ContaFarma = async (_,res)=>{
    
    const data = await ContarFarmacias()
    const total = data[0].total; 
    res.status(200).json({total})
}

export const TodasFarma = async (_,res)=>{
    
    const data = await Todasfarmacias();
    res.json({data})
}

export const TodasFarmaHome = async(_,res)=>{
    const data = await TodasfarmaciasHome()
    res.json({ data })
}

export const ObterFarmaID = async (req,res)=>{

    const {id} = req.params
    const data = await ObterFarmaciaId(id)
    res.json({data})
}

export const CRiarFarma = async (req,res)=>{
  
 const  {nome, nif, telefone, email, endereco, latitude, longitude} = req.body
    const result = await validateNif(nif)
    .then(data => {
        if (data) {
            console.log('Mensagem:', data.message);
            if (data.success == true) {
                return true;
            }

        } else {
            console.log('Não foi possível obter os dados.')
            return false;
        }
    })
    .catch(err => {console.error('Ocorreu um erro:', err) ;return false } )
  
console.log("resultado do Nif", result);
    if(result == true){
    const validar = await Validateall(nome, email, "senha12345", telefone)
    if(validar){

    const values = [
       nome,
       nif,
       telefone,
       email,
       endereco,
       latitude,
       longitude
    ]
    const data = await CriarNewFarmacia(values)
    res.json({data})
} else{
    res.json({data: "Erro nos campos para cadastrar Farmacias"})
}} else{
            res.json({ data: "Este Nif não existe" })
}
}

async function validateNif(nif) {
    try {
        const response = await axios.get(`https://angolaapi.onrender.com/api/v1/validate/bi/${nif}`);
        return response.data;
    } catch (error) {
        console.error('Ocorreu um erro ao fazer a requisição:', error);
        return null;
    }
}

export const ActualizarFarma = async (req,res)=>{
    
    const {id}= req.params
const {Niffarma} = req.body
    const result = await validateNif(Niffarma)
        .then(data => {
            if (data) {
                console.log('Mensagem:', data.message);
                if (data.success == true) {
                    return true;
                }

            } else {
                console.log('Não foi possível obter os dados.')
                return true;
            }
        })
        .catch(err => { console.error('Ocorreu um erro:', err); return false })

    console.log("resultado do Nif", result);
    if(result){
    const values = [
        req.body.Nomefarma,
       Niffarma,
        req.body.Email,
        req.body.Telefonefarma,
       
    ]
    const data = await ActualizarFarmacias(values,id)
    res.json({data})
} else{
        res.json({ data : "erro" })
}
}

export const ActualizarFarmaAdmin = async(req, res) =>{
    const { id } = req.params
    const values = [
        req.body.endereco,
        req.body.latitude,
        req.body.longitude
    ]
    const data = await ActualizarFarmaciaAdmin(values, id)
    res.json({ data })

}



export const FarmaciaOpen = async(req, res)=> {
    const {farma} = req.params;
    const {value} = req.body
    
    const data =  await  FarmaciaAberta(value, farma);

    if(value == true){
        return res.status(200).json({data: data + " Aberta"})
    } else {
        res.status(200).json({ data: data +" fechada" })
    }
   
}
export const DeleteFarma = async (req,res)=>{
    const {id} = req.params
    const data = await DeleteFarmacia(id)
    res.json({data})
}



export const HorarioFarma = async(req, res)=> {

    const {horaOpen, horaClose} = req.body;
    const {farma}= req.params;

    if(ValidarHora(horaOpen) && ValidarHora(horaClose)){
        if(ValidarIntervaloHoratrio(horaOpen, horaClose)){
            const data = await UpdateHorario(horaOpen, horaClose, farma)
            
            res.status(200).json({data})
        } else{
            return res.status(200).json({ data:"O horario de fechamento deve ser posterior ao horario de abertura"})
        }
    } else{
        return res.status(200).json({ data:"Formato de hora invalido!"})
    }
}

const ValidarHora = (hora)=>{

    const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/

    return regex.test(hora)
}

const ValidarIntervaloHoratrio = (abertura, fechamento)=>{

    let horaabertura = new Date("01/01/2000"+ abertura)
    let horafechamento = new Date("01/01/2000"+ fechamento)

    return  horafechamento > horaabertura ? true : true;
}


export const  verificarHorarioFarmacia= async()=> {

    const result = await Buscarhora();
   
    
    const horaAtual = new Date().getHours();
    const minutoAtual = new Date().getMinutes();

   const horarioAtual = new Date();
   horarioAtual.setHours(horaAtual,minutoAtual)

// Criando um novo objeto de data e definindo a hora e o minuto
const dataAbertura = new Date();
const dataFechamento = new Date()
    for (let i = 0; i < result.length; i++) {
        const [horas, minutos] = result[i].horaAbertura.split(':').map(Number);
        const [horasF, minF] = result[i].horaFechamento.split(':').map(Number);
        dataAbertura.setHours(horas); // Definindo a hora (convertendo para número)
        dataAbertura.setMinutes(minutos); 

        dataFechamento.setHours(horasF); // Definindo a hora (convertendo para número)
        dataFechamento.setMinutes(minF);
 
        if (horarioAtual >= dataAbertura && horarioAtual < dataFechamento) {
               
           await  FarmaciaAberta(1, result[i].id);   
         
            // Implemente aqui a lógica para abrir a farmácia, como alterar um estado ou enviar uma notificação, etc.
        }  if (horarioAtual >= dataFechamento) {
          
            // Implemente aqui a lógica para fechar a farmácia, como alterar um estado ou enviar uma notificação, etc.
            
          
        await  FarmaciaAberta(0, result[i].id);
    
        
        } 
        
    }
   
}
