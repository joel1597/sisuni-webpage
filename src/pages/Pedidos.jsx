import React, { useEffect, useState } from 'react'
import { ApiWebURL } from '../utils';
import PageHeader from '../components/PageHeader';
import { Link, NavLink } from 'react-router-dom';

const Pedidos = () => {

    const[listarPedidos, setListarPedidos] = useState([])
    const[listaPedidosFiltrados, setListaPedidosFiltrados] = useState([])    
    const[textoBuscar, setTextoBuscar] = useState([])
    const[columnaAnterior, setColumnaAnterior] = useState("")
    const[estadoAscendente, setEstadoAscendente] = useState(1)
    const[loading, setLoading] = useState(true)

    useEffect(() => {
        getPedidos()
    }, [])

    const getPedidos = () => {
        const rutaServicio = ApiWebURL + "pedidos.php";
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setListarPedidos(data)                
                setListaPedidosFiltrados(data)
                setLoading(false)
            })
    }

    const buscarTexto = (event) => {
        let texto = event.target.value
        setTextoBuscar(texto)
        console.log(texto)
        const resultado = listarPedidos.filter(item =>
            item["nombres"].toUpperCase().includes(texto.toUpperCase()) ||
            item["usuario"].toUpperCase().includes(texto.toUpperCase()) ||
            item["fechapedido"].toUpperCase().includes(texto.toUpperCase()) ||
            item["total"].includes(texto)
        )
        setListaPedidosFiltrados(resultado)
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
        const resultado = [...listaPedidosFiltrados].sort((a,b) => 
            a[columna]>b[columna] ? ascendente : -ascendente)
        setListaPedidosFiltrados(resultado)    
        setColumnaAnterior(columna)
    }

    const dibujarPrecarga = () => {
        return(
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        )
    }

    const tablaPedido = () => {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th onClick={() => seleccionarColumna("idpedido")}>Codigo</th>
                        <th onClick={() => seleccionarColumna("nombres")}>Nombres</th>
                        <th onClick={() => seleccionarColumna("usuario")}>Usuario</th>
                        <th onClick={() => seleccionarColumna("fechapedido")}>Fecha Pedido</th>
                        <th onClick={() => seleccionarColumna("total")}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {listaPedidosFiltrados.map((item, index) =>
                        <tr key={index}>
                            <td><Link to={"/pedidodetalle/" + item.idpedido}>{item.idpedido}</Link></td>
                            <td>{item.nombres}</td>
                            <td>{item.usuario}</td>
                            <td>{item.fechapedido}</td>
                            <td><strong>S/. {item.total}</strong></td>                            
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }


  return (
    <>        
        <PageHeader titulo="Pedidos" />
        <section id="pedidos" className='padded'>
            <div className="container">
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Indique expresión a buscar"
                      value={textoBuscar} onChange={(event) => buscarTexto(event)} />
                </div>
                {loading ? dibujarPrecarga() : tablaPedido()}                
            </div>
        </section>
    </>

  )
}

export default Pedidos