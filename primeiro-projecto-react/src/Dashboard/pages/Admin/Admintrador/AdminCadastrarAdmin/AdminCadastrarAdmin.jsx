import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"
import { LogActividades } from "../../../../../Log_Actividades/Log_actividades"
import AdminSide from "../../../../components/aside/admin/adminSide"
import HeaderAdmin from "../../../../components/heder/admin/headerAdmin"





export const AdminCadastrarAdmin = ()=>{

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
        <>
          <HeaderAdmin />
        <AdminSide />
        <LogActividades />

        <main>
    <div class="container">

      <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div class="card mb-3">

                <div class="card-body">

                  <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">Cadastrar Admin</h5>
                  </div>

                  <form class="row g-3 needs-validation" novalidate onSubmit={HandleAdmin}>
                    <div class="col-12">
                      <label for="yourName" class="form-label">Nome</label>
                      <input type="text" name="name" class="form-control" id="yourName" required  onChange={(e)=> setadmin({...admin, nome: e.target.value})}/>
                      <div class="invalid-feedback">Please, enter your name!</div>
                    </div>

                    <div class="col-12">
                      <label for="yourEmail" class="form-label">Email</label>
                      <input type="email" name="email" class="form-control" id="yourEmail" required onChange={(e)=> setadmin({...admin, email: e.target.value})} />
                      <div class="invalid-feedback">Please enter a valid Email adddress!</div>
                    </div>

                       <div class="col-12">
                      <label for="yourPassword" class="form-label">Password</label>
                      <input type="password" name="password" class="form-control" id="yourPassword" required onChange={(e)=> setadmin({...admin, senha: e.target.value})} />
                      <div class="invalid-feedback">Please enter your password!</div>
                    </div>

                    <div class="col-12">
                      <button class="btn btn-primary w-100" type="submit" style={{backgroundColor:'#00968c'}}>Cadastrar</button>
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
    )
}