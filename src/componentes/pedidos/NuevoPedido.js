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

    useEffect( () => {
        // obtener el cliente
        const consultarAPI = async () => {
            //consultar cliente actual
            const resultado = await clienteAxios.get(`/clientes/${id}`);
            guardarCliente(resultado.data);
        }

        // llamar a la api
        consultarAPI();

    }, []);


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
                <FormCantidadProducto key={producto.producto} producto={producto} />
            ))}
        </ul>
        <div className="campo">
          <label>Total:</label>
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            readonly="readonly"
          />
        </div>
        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Pedido"
          />
        </div>

    </Fragment>
  );
}

export default NuevoPedido;
