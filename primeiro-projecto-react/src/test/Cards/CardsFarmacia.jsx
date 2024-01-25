import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Image, Card } from 'react-bootstrap';
import k from '../../assets/Geo Farma/Geo Farma.png'

function CardsFarmacia() {

    const state = {
        medicines: [
            {
                name: "Paracetamol",
                image: k,
                price: 10,
            },
            {
                name: "Ibuprofeno",
                image: k,
                price: 15,
            },
            {
                name: "Dipirona",
                image: k,
                price: 20,
            },
            {
                name: "Amoxicilina",
                image: k,
                price: 25,
            },
            {
                name: "Cloridrato de fenilefrina",
                image: k,
                price: 30,
            },
            {
                name: "Dipirona com cafeína",
                image: k,
                price: 35,
            },
            {
                name: "Loratadina",
                image: k,
                price: 40,
            },
            {
                name: "Loratadina",
                image: k,
                price: 40,
            },
            {
                name: "Loratadina",
                image: k,
                price: 40,
            },
            {
                name: "Loratadina",
                image: k,
                price: 40,
            },
            {
                name: "Loratadina",
                image: k,
                price: 40,
            },
            {
                name: "Loratadina",
                image: k,
                price: 40,
            },
            {
                name: "Loratadina",
                image: k,
                price: 40,
            },
            {
                name: "Loratadina",
                image: k,
                price: 40,
            },
            {
                name: "Loratadina",
                image: k,
                price: 40,
            },
            {
                name: "Loratadina",
                image: k,
                price: 40,
            },
            {
                name: "Loratadina",
                image: k,
                price: 40,
            },
        ],
    };

    return (
        <>
            <div className="container">

                <div className="row">
                    <div className="col-md-12">
                        <Card style={{ height: '100vh' }}>
                            <h1>Lista de Medicamentos</h1>
                            <div className="row" style={{ height: 200 + 'vh', overflow: "auto" }}>
                                {state.medicines.map((medicine, index) => (
                                    <div className="col-md-4" key={index}>
                                        <Card style={{ backgroundColor: "white", borderRadius: '1rem' }}>
                                            <Card.Body>
                                                <Image style={{ width: 100 + '%', height: 8 + 'rem' }} src={medicine.image} alt={medicine.name} />
                                                <h5 className="card-title">{medicine.name}</h5>
                                                <h6 className="card-subtitle mb-2 text-muted">{medicine.price}</h6>
                                                <Button variant="primary" className="mr-2">
                                                    Comparar preço
                                                </Button>
                                                <Button variant="primary" className="ml-2">
                                                    Adicionar aos favoritos
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}

                            </div>
                        </Card>
                    </div>
                </div>
            </div>


        </>
    )
}

export default CardsFarmacia
