import { conn } from "../../utils/conexao.js";


export const AddEstatistica = async(termo, dados)=>{
    const sqlSelect = `SELECT  id, produto FROM estatisticas_produtos WHERE produto = ?`;
   
    return new Promise((resolve, reject)=>{
        conn.query(sqlSelect,[termo], async(err, result)=>{
            if(err) reject(err)
            else {
                if(result.length === 0){
                    //  Produto não encontrado , insere  uma nova entrada
                  const data = await  Insert(dados)
                  resolve(data)
                } else{
                    const data = await Update(termo)
                    resolve(data)
                } }
        })})
}


const Insert =(dados)=>{
    const um = 1
    const sqlInsert = "INSERT INTO estatisticas_produtos (mes, municipio, provincia, produto, quantidade_pesquisas) Values(?)";
    console.log(dados)
    dados.push(um)
    return new Promise((resolve, reject)=>{
        conn.query(sqlInsert,[dados], (err)=>{
            if(err) reject(err)
            else {
               resolve("adicionada")
            }
        })
    })
   }

   const Update = (termo)=>{
    const sqlUpdate ="Update estatisticas_produtos set  quantidade_pesquisas = quantidade_pesquisas + 1 where produto = ?"
    return new Promise((resolve, reject)=>{
        conn.query(sqlUpdate,[termo], (err)=>{
            if(err) reject(err)
            else {
               resolve("Actualizada")
            }
        })
    })

   }
  
export const ObterEstatisticasProvince = ()=>{

    const query = "select produto, quantidade_pesquisas, municipio, provincia from estatisticas_produtos group by produto, municipio order by quantidade_pesquisas DESC limit 10;";

    return new Promise((resolve, reject)=>{
        conn.query(query, (err, data)=>{
            if(err) reject(err)
            else {
               resolve(data)
            }
        })
    })
}

export const ObterEstatisticasMunicipio = ()=>{

    const query = "SELECT * FROM estatisticas_produtos where municipio = 'Luanda'"

    return new Promise((resolve, reject)=>{
        conn.query(query, (err, data)=>{
            if(err) reject(err)
            else {
               resolve(data)
            }
        })
    })
}

export const PagamentPay =(valor, id)=>{
    const query = "Update gestores set pago=? where id = ?"

    return new Promise((resolve, reject) => {
        conn.query(query,[valor, id], (err) => {
            if (err) reject(err)
            else {
                resolve("pago")
            }
        })
    })
}