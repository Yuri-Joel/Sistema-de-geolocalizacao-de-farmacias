
import { FotoModel, MostrarF} from './upload/fotoModel.js';




// Configuração do Multer para lidar com uploads


// Rota para lidar com uploads
export const UploadFoto = async (req, res) => {
  const userId = req.body.id; // Supondo que você tenha informações do usuário na requisição
const {tipo} = req.body;
  
  const imagePath = 'upload/' + req.file.filename;

  console.log(userId, imagePath)

  // Atualize a coluna 'photo' na tabela de usuários com o caminho da imagem

  if(tipo == "admin"){
    const data = await FotoModel("Administradores",imagePath, userId);
  res.status(200).json({data})
  }
  if(tipo == "gestor"){
    const data = await FotoModel("gestores",imagePath, userId);
  res.status(200).json({data})

  } if(tipo == "subgestores"){
    const data = await FotoModel("subgestores",imagePath, userId);
    res.status(200).json({data})
  }
  
  else{
    const data = await FotoModel("usuarios", imagePath, userId);
    res.status(200).json({ data })

  }
  
  
  
}

// Rota para recuperar o caminho da imagem ao visualizar o perfil do usuário

export const MostrarFoto =  async(req, res) => {
  const {id} = req.params;
  console.log(id)
  const data = await MostrarF(12)
  console.log(data)
  res.status(200).json({data})
  
    
}