import React, { useState, useEffect, useRef } from "react";
import { api } from "../../api";

export const PaypalPagament = () => {
    const [paid, setPaid] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const id = localStorage.getItem("usuario")
    let paypalRef = useRef();
    const products = {
        price: 10,
        description: "Ver as Estatisticas dos medicamentos",
    };
    const Pay = async(valor)=>{
        try {
            const res = await api.post("/pay", { valor,id })
            console.log(res.data.data);
            
        } catch (error) {
            console.log(error);
        }
       
    }
    

    
    useEffect(() => {
        const script = document.createElement("script");
        const id = "ASZnnNbLb5YjnkNU1lC9k6pEhNY7ecbW7jjwEf9jlWVbHD57MWX-q3nr8TTp3hBh-P6iC0iTJK9GIdvC";
        script.src = `https://www.paypal.com/sdk/js?client-id=${id}`;
        script.addEventListener("load", () => setLoaded(true));
        script.addEventListener("error", () => setLoaded(false)); // Tratamento de erro

        document.body.appendChild(script);

        return () => {
           
        };
    }, []);

    useEffect(() => {
        if (loaded) {
            function loadButton() {
                window.paypal
                    .Buttons({
                        createOrder: (data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        description: products.description,
                                        amount: {
                                            currency_code: "USD", // corrigido para "USD"
                                            value: products.price,
                                        },
                                    },
                                ],
                            });
                        },
                        onApprove: async (_, actions) => {
                            const order = await actions.order.capture();
                            setPaid(true);
                            Pay(true);
                            console.log(order);
                        },
                    })
                    .render(paypalRef.current);
            }
            loadButton();
        }
    }, [loaded]);

    return (
        <>
            {paid ? (
                <div>
                    <h1>Parabéns! Você comprou as estatísticas.</h1>
                </div>
            ) : (
                <>
                    <h1>
                        {products.description} por AOA 10,000 kz
                    </h1>
                    <div ref={paypalRef} />
                </>
            )}
        </>
    )
};
