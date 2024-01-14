


export const AdminMostrarFarmacias = ()=>{
    const [Farmacias, setFarmacias] = useState([])
    

    const ListarFarmacias = async()=>{
        try {
            
            const res = await axios.get(`http://localhost:8800/f/todasfarma`)
                    setFarmacias(res.data.data)

        } catch (error) {
            console.error(error)
        }
    }
    const Deletar = async(id)=>{
        try {
            
            const res = await axios.delete(`http://localhost:8800/f/delfarma/${id}`)
                    toast.success(res.data.data)

        } catch (error) {
            console.error(error)
        }
    }

useEffect(()=>{
    ListarFarmacias()
},[])


    return(
        <>
         {
           Farmacias.map((user)=>(
                <div key={user.id}>
                    <h5>{user.nome}</h5>
                    <h5>{user.email}</h5>
                    <h5>{user.endereco}</h5>
                    <h5>{user.nif}</h5>
                    <h5>{user.horario_funcionamento}</h5>
                   <div>
                        <button onClick={()=> Deletar(user.id)}></button>
                    </div>
                </div>
            ))
            
        }
        </>
    )
}