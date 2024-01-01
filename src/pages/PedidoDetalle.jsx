import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ApiWebURL } from '../utils'
import PageHeader from '../components/PageHeader'

const PedidoDetalle = () => {

  const[listadoDetalle, setListadoDetalle] = useState([])
  const { idpedido } = useParams()
  
  useEffect(() => {
    leerServicio()
  }, [])

  const leerServicio = () => {
    const rutaServicio = ApiWebURL + "pedidosdetalle.php?idpedido=" + idpedido;
    fetch(rutaServicio)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setListadoDetalle(data)            
        })
  }

  const dibujarCuadricula = () => {
    return (
        <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 g-4">
        {listadoDetalle.map((item, index) =>
            <div className="col" key={index}>
                <div className="card h-100">
                    <img src={ApiWebURL +  item.imagenchica} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{item.nombre}</h5>
                            <p className='card-title'>{item.detalle}</p>
                            <p className="card-text">S/ <strong>{parseFloat(item.precio).toFixed(2)}</strong></p>
                        </div>
                </div>
            </div>
        )}
        </div>
    )
  }

  return (
    <>
        <PageHeader titulo="Mis Pedidos" />
        <section id="detallepedidos" className='padded'>
            <div className="container">
                {dibujarCuadricula()}
            </div>
        </section>
    </>
  )
}

export default PedidoDetalle