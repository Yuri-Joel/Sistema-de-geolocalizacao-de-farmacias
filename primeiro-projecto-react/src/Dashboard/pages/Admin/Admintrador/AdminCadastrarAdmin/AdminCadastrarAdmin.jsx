import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"
import { LogActividades } from "../../../../../Log_Actividades/Log_actividades"
import AdminSide from "../../../../components/aside/admin/adminSide"
import HeaderAdmin from "../../../../components/heder/admin/headerAdmin"





export const AdminCadastrarAdmin = ()=>{

        const IsAutenticado = !!localStorage.getItem("usuario");
         const [admin, setadmin] = useState({
            nome: '',
            email: "",
            senha: "",
         })

    const HandleAdmin = async (e)=>{
                e.preventDefault()
            try {
                
                const res = await axios.post(`http://localhost:8800/ad/newadmin`, admin)
                console.log(res.data)
                if(res.data.data === "Sucess"){
                    toast.success("Administrador Cadastrado")
                } else{
                    toast.warn("Erro ao Cadastrar")
                }
                
            } catch (error) {
                console.log(error)
            }
         }


    return(

      <>{ 
        IsAutenticado ?
        <>
          <HeaderAdmin />
        <AdminSide />
        <LogActividades tipo={"administrador"} />

        <main className="main" id="main">
    <div className="container">

      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="card mb-3">

                <div className="card-body">

                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">Cadastrar Admin</h5>
                  </div>

                  <form className="row g-3 needs-validation" novalidate onSubmit={HandleAdmin}>
                    <div className="col-12">
                      <label for="yourName" className="form-label">Nome</label>
                      <input type="text" name="name" className="form-control" id="yourName" required  onChange={(e)=> setadmin({...admin, nome: e.target.value})}/>
                      <div className="invalid-feedback">Please, enter your name!</div>
                    </div>

                    <div className="col-12">
                      <label for="yourEmail" className="form-label">Email</label>
                      <input type="email" name="email" className="form-control" id="yourEmail" required onChange={(e)=> setadmin({...admin, email: e.target.value})} />
                      <div className="invalid-feedback">Please enter a valid Email adddress!</div>
                    </div>

                       <div className="col-12">
                      <label for="yourPassword" className="form-label">Password</label>
                      <input type="password" name="password" className="form-control" id="yourPassword" required onChange={(e)=> setadmin({...admin, senha: e.target.value})} />
                      <div className="invalid-feedback">Please enter your password!</div>
                    </div>

                    <div className="col-12">
                      <button className="btn btn-primary w-100" type="submit" style={{backgroundColor:'#00968c'}}>Cadastrar</button>
                    </div>
                    
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

    </div>
  </main>

        </>
      :
      <div>Você não está Autenticado, faça login por favor</div>  
      }
        </>
    )
}