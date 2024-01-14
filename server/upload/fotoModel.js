import {conn} from '../utils/conexao.js'

export const FotoModel =  (tabela, imagePath, userId)=>{
        
const query = 'UPDATE ?? SET foto = ? WHERE id = ?';

return new Promise((resolve, reject)=>{
  
conn.query(query, [tabela,imagePath, userId], (err) => {
  if (err) {
    reject('Erro ao atualizar a foto do usuário:', err);
  } else {
    
    resolve(imagePath);
  }
});
})
}

export const MostrarF = (id)=>{

  const query ="SELECT foto from usuarios where id = ?"
 
  return new Promise((resolve, reject)=>{
  
conn.query(query, [id], (err, data) => {
  if (err) {
    reject('Erro ao atualizar a foto do usuário:', err);
  } else {
    
    resolve(data);
  }
});
})

}