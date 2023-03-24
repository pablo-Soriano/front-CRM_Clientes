import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { clienteAxios } from "../../config/axios";
import FormBuscarProducto from "./FormBuscarProducto";
import FormCantidadProducto from "./FormCantidadProducto";
import Swal from "sweetalert2";

function NuevoPedido() {
    const history = useNavigate(); // aqui se inicializa para usar el history como redireccionador

    // Obtener el ID
    const { id } = useParams();

    // state
    const [cliente, guardarCliente] = useState({}); //objeto
    const [busqueda, guardarBusqueda] = useState('');
    const [productos, guardarProductos] = useState([]); //arreglo vacio
    const [total, guardarTotal] = useState(0);

    useEffect( () => {
        // obtener el cliente
        const consultarAPI = async () => {
            //consultar cliente actual
            const resultado = await clienteAxios.get(`/clientes/${id}`);
            guardarCliente(resultado.data);
        }

        // llamar a la api
        consultarAPI();

        // Actualizar el total a pagar
        actualizarTotal();
    }, [productos]);


  const buscarProducto = async e => {
    e.preventDefault();

    //Obtener los productos de la busqueda
    const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);

    // Si no hay resultados una alerta, de lo contrario  agregarlo al state
    if(resultadoBusqueda.data[0]) {
      let productoResultado = resultadoBusqueda.data[0];

      // agregar la llave "producto" (copia de id), tambien la llave cantidad
      productoResultado.producto = resultadoBusqueda.data[0]._id;
      productoResultado.cantidad = 0;

      // ponerlo en el state
      guardarProductos([...productos, productoResultado]);

    } else {
      // no hay resultados
      Swal.fire({
        type: 'error',
        title: 'No Resultados',
        text: 'No hay resultados'
      })
    }
  }

  // almacenar una busqueda en el state
  const leerDatosBusqueda = e => {
    guardarBusqueda(e.target.value);
  }

  
  // actualizar la cantidad de productos
  const restarProductos = index => {
    // copiar el arreglo original de productos
    const todosProductos = [...productos];


    // validar si esta en 0 no puede bajar mas..
    if(todosProductos[index].cantidad === 0) return;

    // decremento
    todosProductos[index].cantidad--;

    // almacenarlo en el state
    guardarProductos(todosProductos);

    // Actualizar el total a pagar
    actualizarTotal();

  }

  const aumentarProductos = index => {
    // copiar el arreglo original de productos
    const todosProductos = [...productos];

    // incremento
    todosProductos[index].cantidad++;

    // almacenarlo en el state
    guardarProductos(todosProductos);
  }

  // Elimina un producto del state
  const eliminarProductoPedido = id => {
    const todosProductos = productos.filter(producto => producto.producto !== id);

    guardarProductos(todosProductos);
  }

  // Actualizar el total a pagar
  const actualizarTotal = () => {
    // si el arreglo de productos =0, el total es 0
    if(productos.length === 0) {
      guardarTotal(0);
      return
    }

    // calcular el nuevo total
    let nuevoTotal = 0;

    // recorrer todos los productos, sus cantidades y precios
    productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));

    // almacenar el total
    guardarTotal(nuevoTotal);
  }


  // Almacena el pedido en BD
  const realizarPedido = async e => {
    e.preventDefault();

    // extraer el ID, de la linea 

     // construir el objeto
     const pedido = {
        "cliente": id,
        "pedido": productos,
        "total": total
     }
     // almacenarlo en la BD
     const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido);

     // leer resultado
     if(resultado.status === 200) {
        // alerta todo bien
        Swal.fire({
          type: 'success',
          title: 'Correcto',
          text: resultado.data.mensaje
        })
     } else {
      //alerta de error
      Swal.fire({
        type: 'error',
        title: 'Hubo un error',
        text: 'Vuelva a intentarlo'
      })
     }

     //redireccionar 
     history('/pedidos');
  }

  return (
    <Fragment>
      <h2>Nuevo Pedido</h2>

      <div className="ficha-cliente">
        <h3>Datos de Cliente</h3>
        <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
        <p>Teléfono: {cliente.telefono}</p>
      </div>

      <FormBuscarProducto buscarProducto={buscarProducto} leerDatosBusqueda={leerDatosBusqueda} /> 

        <ul className="resumen">
            {productos.map((producto, index) => (
                <FormCantidadProducto key={producto.producto} producto={producto} restarProductos={restarProductos} aumentarProductos={aumentarProductos} eliminarProductoPedido={eliminarProductoPedido} index={index} />
            ))}
        </ul>
        <p className="total">Total a Pagar: <span>${total}</span> </p>
        
        {
          total > 0 ? ( 
            <form onSubmit={realizarPedido}>
                <input type="submit" className="btn btn-verde btn-block" value="Realizar Pedido" />
            </form> 
          ) : null
        }

    </Fragment>
  );
}

export default NuevoPedido;
