import React from 'react';
import RoutesDashboard from './User/routes';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter } from 'react-router-dom';
import { RoutesAdmin } from './Dashboard/pages/Admin/routesAdmin';
import { Load } from './User/LoadScript'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/scrollspy';
import { RoutesGestor } from './gestor/routesGestor';






function App() {
        

        return (
                <>
                         <BrowserRouter>
                                <Load>
                                <RoutesDashboard />
                                <RoutesAdmin />
                                <RoutesGestor />
                              
                                </Load>
                        </BrowserRouter>
                        <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
                        
                
                       
                       
                       
                </>

        )
}

export default App;