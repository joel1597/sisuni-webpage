import { useEffect } from "react";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { ApiWebURL } from "../utils";

const Seleccionados = () => {

  const [listaItems, setListaItems] = useState([])
  const [totalEmpleados, setTotalEmpleados] = useState(0)  

  useEffect(() => {
    leerDatosCarrito()
  }, [])

  const leerDatosCarrito = () => {
      let datosSeleccionados = JSON.parse(sessionStorage.getItem("empleadosselec"))
      let totalemp = datosSeleccionados !== null ? datosSeleccionados.length : 0            
      setTotalEmpleados(totalemp)            
      setListaItems(datosSeleccionados)
  }

  const vaciarEmpleadosSession = () => {
    setListaItems([])
    setTotalEmpleados(0)
    sessionStorage.removeItem("empleadosselec")    
  }

  const eliminarItemSession = (item) => {
    let empleadosMenos = listaItems.filter(itemEmp => itemEmp.idempleado !== item.idempleado)
    let totalemp = empleadosMenos.length 
    setTotalEmpleados(totalemp)
    setListaItems(empleadosMenos)
    sessionStorage.setItem("empleadosselec", JSON.stringify(empleadosMenos))    
  }

  const dibujarTabla = () => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Usuario</th>
                    <th>Cargo</th>
                    <th>Nombres</th>
                    <th>Pais</th>
                    <th>Ciudad</th>
                    <th>Telefono</th>
                    
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {listaItems !== null
                    ? listaItems.map((item, index) =>
                        <tr key={index}>
                            <td>
                              <img src={ApiWebURL + "fotos/" + item.foto} className="empleadosfoto" alt="..."/>
                              <p>{item.usuario}</p>
                            </td>
                            <td>{item.cargo}</td>
                            <td>{item.nombres} {item.apellidos}</td>
                            <td>{item.pais}</td>
                            <td>{item.ciudad}</td>
                            <th>{item.telefono}</th>
                                                        
                            <td><i className="bi bi-x-lg eliminar-item" title="Eliminar item"
                                onClick={() => eliminarItemSession(item)}></i></td>
                        </tr>
                    )
                    : <></>
                }
            </tbody>
        </table>
    )
  }

  return (
    <>
        <PageHeader titulo="Seleccion" />
        <section id="seleccionados" className='padded'>
            <div className="container">
                <div className="row">
                    <div className="col-10">
                        {dibujarTabla()}
                        
                         {totalEmpleados >= 1 && <button className="btn btn-danger"onClick={() => vaciarEmpleadosSession()} >Vaciar Empleados</button>} 
                                                
                    </div>
                    <div className="col-2">
                      <div className="card border-success mb-3">
                      <div className="card-header">Empleados</div>
                          <div className="card-body text-primary">
                              <table className="table">
                                  <tbody>
                                      <tr>
                                          <th>Total:</th><td>{totalEmpleados}</td>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                      </div>
                    </div>
                </div>
              </div>
          </section>
        </>
  )
}

export default Seleccionados