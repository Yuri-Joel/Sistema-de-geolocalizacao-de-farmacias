import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/scrollspy';

import { Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export const MyModal = ({show, handleClose})=>{


    return(
        <>
   
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>
              Voce não tem uma conta, Faça login ou crie uma Conta?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{display:'flex',gap:'1rem'}}>
            <Link to={`/cadastrar`}>
              <button className='btn btn-primary' style={{backgroundColor: '#125e9d' }}>Criar Conta</button>
            </Link>
            <Link to={`/login`}>
              <button className='btn btn-primary' style={{backgroundColor: '#00968c'}} >Login</button>
            </Link>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='danger' onClick={handleClose}>
                     Fechar
            </Button>
          </Modal.Footer>
        </Modal>
        </>
    )
}