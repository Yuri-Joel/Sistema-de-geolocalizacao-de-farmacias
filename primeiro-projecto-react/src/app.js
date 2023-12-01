import {FormC} from './componts/form'
import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {Grid} from './componts/Grid'
import {toast , ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import {Global} from './Global'
import styled from 'styled-components';

const Container = styled.div`

width:100%;
max-width:800px;
margin-top: 20px;
display:flex;
flex-direction: column;
align-items: center;
gap:10px;`
const Title = styled.h2``

export default function App() {
     const [users, Setusers] =useState([])
     const [onEdit, SetOnEdit] = useState(null)

      const getUsers = async ()=> {
        try {
            const res = await  axios.get("http://localhost:8080");
            Setusers(res.data.sort((a,b) => (a.nome > b.nome ? 1 : -1 )))
        } catch(error){
           toast.error(error);
        }
     };
     useEffect(()=> {
        getUsers();
     }, [Setusers])
   return( 
   <>
   <Container>
    <Title>Usuarios</Title>
    <FormC onEdit={onEdit} SetOnEdit={SetOnEdit} getUsers={getUsers}/>
    <Grid users={users} Setusers={Setusers} SetOnEdit={SetOnEdit}/>
    </Container>
    <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
    <Global />
    </>
    )
}