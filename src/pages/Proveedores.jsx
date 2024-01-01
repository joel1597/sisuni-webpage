import { useEffect } from "react";
import { useState } from "react";
import { ApiWebURL } from "../utils";
import PageHeader from "../components/PageHeader";
function Proveedores() {
    const [listaProveedores, setListaProveedores] = useState([])
    const [listaProveedoresFiltrados, setListaProveedoresFiltrados] = useState([])
    const [textoBuscar, setTextoBuscar] = useState([])
    const [columnaAnterior, setColumnaAnterior] = useState("")
    const [estadoAscendente, setEstadoAscendente] = useState(1)
    const [verData, setVerdata] = useState({
        cargocontacto: "",
        nombreempresa: "",
        nombrecontacto: "",
        pais: "",
        ciudad: "",
        region: "",
        fax: "",
        direccion: "",
        codigopostal: "",
        telefono: ""
    })

    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "proveedores.php";
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setListaProveedores(data)
                setListaProveedoresFiltrados(data)
            })
    }
    /*
        function dibujarTabla(){
        }
    */
    const dibujarTabla = () => {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th onClick={() => seleccionarColumna("idproveedor")}>Código</th>
                        <th onClick={() => seleccionarColumna("nombreempresa")}>Empresa</th>
                        <th onClick={() => seleccionarColumna("nombrecontacto")}>Contacto</th>
                        <th onClick={() => seleccionarColumna("cargocontacto")}>Cargo</th>
                        <th onClick={() => seleccionarColumna("pais")}>País</th>
                        <th onClick={() => seleccionarColumna("ciudad")}>Ciudad</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listaProveedoresFiltrados.map(item =>
                        <tr key={item.idproveedor}
                            onMouseEnter={(event) => mostrarIconosEdicion(event)}
                            onMouseLeave={(event) => ocultarIconosEdicion(event)}
                        >
                            <td>{item.idproveedor}</td>
                            <td>{item.nombreempresa}</td>
                            <td>{item.nombrecontacto}</td>
                            <td>{item.cargocontacto}</td>
                            <td>{item.pais}</td>
                            <td>{item.ciudad}</td>
                            <td>                                
                                <i className="bi bi-eye-fill"
                                    onClick={() => proveedorSeleccionado(item)}
                                    data-bs-toggle="modal" data-bs-target="#verproveedor">
                                </i>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    const proveedorSeleccionado = (data) => {
        console.log(data)
        setVerdata({
            cargocontacto: data.cargocontacto,
            nombrecontacto: data.nombrecontacto,
            nombreempresa: data.nombreempresa,
            pais: data.pais,            
            ciudad: data.ciudad,
            region: data.region,
            fax: data.fax,
            direccion: data.direccion,
            codigopostal: data.codigopostal,
            telefono: data.telefono
        })
    }

    const mostrarIconosEdicion = (event) => {
        event.currentTarget.classList.add("mostrarIconos")
    }
    const ocultarIconosEdicion = (event) => {
        event.currentTarget.classList.remove("mostrarIconos")
    }

    const seleccionarColumna = (columna) => {
        let ascendente = estadoAscendente
        if(columna !== columnaAnterior){
            ascendente = 1
        }
        else{
            ascendente = -ascendente
        }
        setEstadoAscendente(ascendente)
        console.log(columna)
        const resultado = [...listaProveedoresFiltrados].sort((a,b) => 
            a[columna]>b[columna] ? ascendente : -ascendente)
        setListaProveedoresFiltrados(resultado)    
        setColumnaAnterior(columna)
    }

    const buscarTexto = (event) => {
        let texto = event.target.value
        setTextoBuscar(texto)
        console.log(texto)
        const resultado = listaProveedores.filter(item =>
            item["nombreempresa"].toUpperCase().includes(texto.toUpperCase()) ||
            item["nombrecontacto"].toUpperCase().includes(texto.toUpperCase()) ||
            item["cargocontacto"].toUpperCase().includes(texto.toUpperCase()) ||
            item["pais"].toUpperCase().includes(texto.toUpperCase()) ||
            item["ciudad"].toUpperCase().includes(texto.toUpperCase())
        )
        setListaProveedoresFiltrados(resultado)
    }

    const dibujarModal = () => {
        return (
            <div className="modal fade" id="verproveedor" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title fs-5" id="exampleModalLabel">Proveedor</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        
                        <div className="modal-body">
                            <table className="table">
                                <tbody>
                                    <tr><th>Empresa</th><td>{verData.nombreempresa}</td></tr>
                                    <tr><th>Cargo</th><td>{verData.cargocontacto}</td></tr>                                    
                                    <tr><th>Contacto</th><td>{verData.nombrecontacto}</td></tr>                                    
                                    <tr><th>Pais</th><td>{verData.pais}</td></tr>
                                    <tr><th>Ciudad</th><td>{verData.ciudad}</td></tr>
                                    <tr><th>Region</th><td>{verData.region}</td></tr>
                                    <tr><th>Fax</th><td>{verData.fax}</td></tr>
                                    <tr><th>Direccion</th><td>{verData.direccion}</td></tr>
                                    <tr><th>Codigo Postal</th><td>{verData.codigopostal}</td></tr>
                                    <tr><th>Telefono</th><td>{verData.telefono}</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>                                
                        </div>                        
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <PageHeader titulo="Proveedores" />
            <section id="proveedores" className='padded'>
                <div className="container">
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Indique expresión a buscar"
                            value={textoBuscar} onChange={(event) => buscarTexto(event)} />
                    </div>
                    {dibujarTabla()}
                    {dibujarModal()}
                </div>
            </section>
        </>
    )
}

export default Proveedores