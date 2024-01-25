import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Zod from "zod";
import'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap-icons/icons/bootstrap-icons.css'

const schema = Zod.object({
  nome: Zod.string().required(),
  email: Zod.string().email().required(),
  idade: Zod.number().required().min(18).max(65),
});

function FormTeste(){
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const { register, handleSubmit } = useForm({
    defaultValues: values,
    schema,
  });

  const onSubmit = async (data) => {
    // Enviar os dados para o back-end
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="nome"
        type="text"
        placeholder="Nome"
        {...register("nome", { required: true })}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        {...register("email", { required: true, email: true })}
      />
      <input
        name="idade"
        type="number"
        placeholder="Idade"
        {...register("idade", { required: true, min: 18, max: 65 })}
      />

      {errors.nome && <span style={{color:'red'}}>{errors.nome}</span>}
      {errors.email && <span style={{color:'red'}}>{errors.email}</span>}
      {errors.idade && <span style={{color:'red'}}>{errors.idade}</span>}
      <button  class="btn btn-primary" type="submit" disabled>
        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
               Loading...
        </button>
    </form>
  );
};

export default FormTeste;

















































/* import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod */
  /*  const validar=z.object({
    name:z.string().min(3,'informe um nome valido') 
   }) */

/* function FormTeste() {
    const {vali,setvalii,formState:{errors}}=useForm({
      mode:'all',
      criteriaMode:'all',
      resolver: zodResolver(validar),
      defaultValues:{
       name:'' 
      }
    })
    const carlos=(data)=>{
        console.log(data)
    }
  return (
    <>
         <div className="contaiber">
             <div className="row">
                   <div className="card" style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                        <h3>Bem Vindo</h3>
                        <form onSubmit={vali(carlos)}>
                        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
                            <input {...setvalii('name')} type="email" className='form-control' placeholder='Nome'/>
                             {errors.name &&<p>{errors.name.message}</p>}
                        </div>
                        <div>
                            <button type='submit' className='btn btn-primary'>Logar</button>
                        </div>
                   </form>

                   </div>
             </div>
         </div>
    </>
  )
} */

// export default FormTeste
