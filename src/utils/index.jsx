export const ApiWebURL = "https://servicios.campus.pe/"

export const agregarCarrito = (item, cantidadProducto) => {
    item.cantidad = cantidadProducto == null ? 1 : Number(cantidadProducto)
    item.precio = item.preciorebajado === "0" ? item.precio : item.preciorebajado
    console.log(item)
    let carrito = []
    if(sessionStorage.getItem("carritocompras")){
        carrito = JSON.parse(sessionStorage.getItem("carritocompras"))
        let index = -1
        for(let i = 0; i < carrito.length; i++){
            if(item.idproducto === carrito[i].idproducto){
                index = i
                break
            }
        }
        if(index === -1){
            carrito.push(item)    
            sessionStorage.setItem("carritocompras", JSON.stringify(carrito))
        }
        else{
            carrito[index].cantidad += 1
            sessionStorage.setItem("carritocompras", JSON.stringify(carrito))
        }
    }
    else{
        carrito.push(item)
        sessionStorage.setItem("carritocompras", JSON.stringify(carrito))
    }
}

export const agreagrEmpleado = (item) => {    
    let empleados = []    

    if(sessionStorage.getItem('empleadosselec')){
        empleados = JSON.parse(sessionStorage.getItem("empleadosselec"))        
        const exists = empleados.find(data => parseInt(data.idempleado) === parseInt(item.idempleado))

        if(!exists){            
            empleados.push(item)
            sessionStorage.setItem('empleadosselec', JSON.stringify(empleados))
        }        
            
    }else{
        empleados.push(item)
        sessionStorage.setItem('empleadosselec', JSON.stringify(empleados))
    }
    
}