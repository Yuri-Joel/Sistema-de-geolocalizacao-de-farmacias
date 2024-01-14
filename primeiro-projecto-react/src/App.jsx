import React from 'react';
import RoutesDashboard from './User/routes';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter } from 'react-router-dom';
import { RoutesAdmin } from './Dashboard/pages/Admin/routesAdmin';
import { Load } from './User/LoadScript'


function App() {

        return (
                <>
                        <BrowserRouter>

   <Load>

                                        <RoutesDashboard />
                                        <RoutesAdmin />

                                     
                                </Load>
                        </BrowserRouter>
                        <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
                </>

        )
}

export default App;