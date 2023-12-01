import React from 'react';
import styled from 'styled-components';
import{ FaTrash, FaEdit} from 'react-icons/fa'
import axios from 'axios';
import{toast} from 'react-toastify';


export const Table = styled.table`
width:100%;
background: #fff;
padding: 20px; 
box-shadow: 0px 0px 5px #ccc;
border-radius: 5px; 
max-width: 800px;
margin: 20px auto;
word-break: break-all;
`
export const Tbody = styled.tbody``
export const Tr = styled.tr``
export const Thead = styled.thead``
export const Th = styled.th`
text-align:start;
border-bottom: inset;
padding-bottom: 5px;

@media (max-widht: 500px){
    ${(props) => props.onlyWeb && "display: none"}
}`
 
export const Td = styled.td`
padding-top: 15px;
text-align: ${(props)=> (props.alignCenter ? "center": "start")};
width: ${(props)=> (props.width ? props.width : "auto")};
@media (max-width: 500px ){
    ${(props) => props.onlyWeb && "display: none"}
}`

export const Grid =({users, Setusers, SetOnEdit})=>{

const onEdit = (item) => {
    SetOnEdit(item)
}


    const OnDelete = async (id)=> {
        await axios.delete("http://localhost:8080/"+id)
        .then(({data})=>{
            const newarray = users.filter((user)=> user.id !== id); 
            Setusers(newarray)
            toast.success(data)
           
            
        }).catch(({data})=> toast.warn(data))

        SetOnEdit(null)

    }
   
    return(
        <Table>
            <Thead>
            <Tr>
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th onlyWeb>Password</Th>
            </Tr>
            </Thead>
            <Tbody>
                {users.map((item)=>(
                    <Tr key={item.id}>
                        <Td width="30%">{item.nome}</Td>
                        <Td width="30%">{item.email}</Td>
                        <Td width="20%">{item.pass}</Td>
                        <Td alignCenter width="5%">
                            <FaEdit style={{cursor: 'pointer'}} onClick={()=> onEdit(item)} />
                        </Td>
                        <Td alignCenter width="5%">
                            <FaTrash style={{cursor: 'pointer'}} onClick={()=> OnDelete(item.id)} />
                        </Td>

                    </Tr>
                ))}
            </Tbody>

        </Table>

    )
}