import { ActualizarMedi, AddMedicamento, ComparaMedicamentos, DeletarMed, DisponivelMed, GraficoMedfavoritosFarma, Medicamento, ObterMedid, farmamedicamentos, totalFavoritosMedi, totalMedicamento } from "../Models/MedicamentoModel.js"



export const SelMedicamento = async( req,res) =>{

    const {id} = req.params
    const {usuario} = req.params;
    const data = await Medicamento(usuario,id);
    res.status(200).json({data})

}


export const farmaciaMed = async (req, res)=>{
    const {id} = req.params

  
    const data = await farmamedicamentos(id);
    res.status(200).json({ data })
}

export const ObtermedicamentoId = async(req, res)=>{

    const {id} = req.params;
    const data = await ObterMedid(id);
    res.status(200).json({ data })

}


export const ComparaMed = async (req, res )=>{

    const {med} = req.params

    const data = await ComparaMedicamentos(med)


    res.status(200).json({data})
}

//gestor

export const AddMed = async (req, res)=>{
   
 //add medicamento 

    const {farma} = req.body;
    const imagePath = 'image_Product/' + req.file.filename;
const {nome, preco, data_validade, informacoes, tipo, disponibilidade} = req.body;

  const values = [
       nome,
       informacoes,
       tipo,
       disponibilidade
    ]
let validar ;

    for (let i = 0; i < values.length; i++) {
       validar = await ValidateProduto(values[i])
    
           if(validar == false){
               return res.status(200).json({ data: "Erro ao cadastrar Produto! Pelo menos 3 caracteres"})
           }
    }
    const validarPreco = await ValidateNumber(preco)
   
    if(validarPreco) {
       const  dados = [
            nome,
            preco,
            data_validade,
            informacoes,
            tipo,
            imagePath,
            disponibilidade
        ]
        const data = await AddMedicamento(dados, farma)

        res.status(200).json({ data })
    }
    else {
        res.status(200).json({ data: "preco deve ser somente numeros" })
    }
  
}
const ValidateProduto = async (nome) => {
    if (nome.length < 3) {
        return false;
    }
    const regexNome = /^[a-zA-Z0-9\s]+$/;

    return regexNome.test(nome);
}


 const ValidateNumber = async (telefone) => {

    
    const regexTelefone = /^[0-9\.]+$/;
    return regexTelefone.test(telefone);

}






export const ActuaMedi = async (req,res)=>{
    const {id}= req.params
    const imagePath = 'image_Product/' + req.file.filename;
    const { nome, preco, data_validade, informacoes, tipo, disponibilidade } = req.body;
    const values = [
        nome,
        informacoes,
        tipo,
        disponibilidade
    ]
    let validar;

    for (let i = 0; i < values.length; i++) {
        validar = await ValidateProduto(values[i])

        if (validar == false) {
            return res.status(200).json({ data: "Erro ao cadastrar Produto! Pelo menos 3 caracteres" })
        }
    }
    const validarPreco = await ValidateNumber(preco)

    if (validarPreco) {
        const dados = [
            nome,
            preco,
            data_validade,
            informacoes,
            tipo,
            imagePath,
            disponibilidade
        ]
        const data = await ActualizarMedi(dados, id)

        res.status(200).json({ data })
    }
    else {
        res.status(200).json({ data: "preco deve ser somente numeros" })
    }

}


export const DispoMed= async (req,res) =>{

    const {id}= req.params
    const {dispo} =  req.body

    const data = await DisponivelMed(dispo,id)
    
    res.status(200).json({data})
}


export const DeleMedi = async (req,res)=>{
    const {id} = req.params

    const data = await DeletarMed(id)

    res.status(200).json({data})
}

export const TotalMedi = async(req,res)=>{

    const {id} = req.params

    const data = await totalMedicamento(id)
    const total = data[0].total
    res.status(200).json({total})

}

export const TotalFavMedi = async(req,res)=>{

    const {id} = req.params

    const data = await totalFavoritosMedi(id)
    const total = data[0].total
    res.status(200).json({total})

}

export const GraficomedFarma = async (req, res) => {
    const {id} = req.params

    const data = await GraficoMedfavoritosFarma(id);
    res.json({data})

}
