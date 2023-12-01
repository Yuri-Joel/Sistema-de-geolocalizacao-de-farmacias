import axios from 'axios';
import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'
import {toast} from 'react-toastify'


export const Form = styled.form`
display: flex;
gap: 10px;
flexwrap: wrap;
background-color: #fff;
padding: 20px;
box-shadow: 0px 0px 5px #ccc;
border-radius: 5px;    
`
export const InputArea = styled.div`
display:flex;
flex-direction: column;
`;
export const Input = styled.input`
width:120px;
padding:0 10px;
border:1px solid #bbb; 
border-radius: 5px;
height: 40px;`;

export const Label = styled.label``;
export const Button = styled.button`
padding:10px;
cursor:pointer;
border-radius:5px;
border: none;
background-color: #2c73d2;
color:white;
heoght: 35px;
`;
export const FormC =({getUsers,onEdit, SetOnEdit}) =>{
    const ref = useRef();
    useEffect(()=>{
        if(onEdit){
    const user = ref.current;

    user.nome.value = onEdit.nome;
    user.email.value = onEdit.email;
    user.pass.value = onEdit.pass;
        }
    },[onEdit])

    const handleSubmit = async(e)=> {
        e.preventDefault();

        const user = ref.current;

        if(!user.nome.value || !user.email.value || !user.pass.value){
            return toast.warn("preencha todos os campos")
        }
        if(onEdit){
            await axios.put("http://localhost:8080/"+ onEdit.id,{
                nome: user.nome.value,
                email:user.email.value,
                pass: user.pass.value,
            }).then(({data})=>  toast.success(data))
            .catch(({data})=> toast.error(data))
        } else {
            await axios.post("http://localhost:8080",{
                nome: user.nome.value,
                email:user.email.value,
                pass: user.pass.value

            })
            .then(({data})=> toast.success(data))
            .catch(({data})=> toast.error(data))
        }

        user.nome.value = "";
        user.email.value = "";
        user.pass.value = "";

        SetOnEdit(null)
        getUsers()

    }
    
    return(
       
        <Form ref={ref} onSubmit={handleSubmit}>
            <InputArea>
            <Label>Nome:</Label>
            <Input name="nome" placeholder=" seu nome" />
            </InputArea>
            <InputArea>
            <Label>E-Mail:</Label>
            <Input name="email" placeholder=" seu email" type="email"/>
            </InputArea>
            <InputArea>
            <Label>passowrd:</Label>
            <Input name="pass" placeholder=" sua password" type="passowrd"/>
            </InputArea>
            <Button type="submit">Salvar</Button>
        </Form>       
    )
}