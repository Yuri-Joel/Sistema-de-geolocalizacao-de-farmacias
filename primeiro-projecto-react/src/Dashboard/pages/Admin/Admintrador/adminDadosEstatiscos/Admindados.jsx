import { GraficosLinear } from "../../Components/GraficosLinear/GraficosLinearCircular"
import { Graficos } from "../../Components/Graficos/Graficos"
import { GraficosBarTriangle } from "../../Components/Graficos/GraficosBarTriangle"
import { LogActividades } from "../../../../../Log_Actividades/Log_actividades"
import { Link } from "react-router-dom"
import { GraficosAreChart } from "../../Components/Graficos/GraficosBar"
import HeaderAdmin from "../../../../components/heder/admin/headerAdmin"
import AdminSide from "../../../../components/aside/admin/adminSide"
import FooterDashboard from "../../../../components/footer/footer"


export const AdminDados = () => {

    const IsAutenticado = !!localStorage.getItem("usuario");


    return (
        <>
        { IsAutenticado ?
        <>
            <HeaderAdmin />
            <AdminSide />
            <LogActividades tipo={"administrador"} />
            <main id="main" className="main">
            <section className="section">   
            <div className='container'>
                <div className="row">
                    <div className="col-9">
                        <div className="card">

                            <div className="filter">
                                <Link className="icon" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <li className="dropdown-header text-start">
                                        <h6>Filtrar</h6>
                                    </li>

                                    <li><Link className="dropdown-item" >Hoje</Link></li>
                                    <li><Link className="dropdown-item" >Este Mês</Link></li>
                                    <li><Link className="dropdown-item" >Este Ano</Link></li>
                                </ul>
                            </div>

                            <div className="card-body">
                       

                                <div id="reportsChart">
                                    <Graficos />
                                </div>
                            </div>
                            
                            <div className="card-body">
                       

                                <div id="reportsChart">
                                    <GraficosLinear />
                                </div>

                            </div>
                            <div className="card-body">
                       

                                <div id="reportsChart">
                                    <GraficosAreChart />
                                </div>

                            </div>
                            <div className="card-body">
                       

                                <div id="reportsChart">
                                    <GraficosBarTriangle />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </section>
            </main>
            <FooterDashboard />

        </>
        :
        <div> Você não está Autenticado, por favor faça login</div>
}
        </>
    )
}