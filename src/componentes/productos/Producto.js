import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { clienteAxios } from '../../config/axios';

function Producto({producto}) { // la variable {producto} en el parentesis, viene de la variable de Productos.js, producto={producto} en linea 35, dento de productos.map

    // eliminar producto
    const eliminarProducto = id => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Un Producto eliminado, se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'No, Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              // eliminar en la rest api
              clienteAxios.delete(`/productos/${id}`)
                .then( res => {
                    if(res.status === 200) {
                        Swal.fire(
                            'eliminado!',
                            res.data.mensaje,
                            'success'
                          )
                    }
                })
            }
          })
    }

    const { _id, nombre, precio, imagen} = producto;

    return(
        <Fragment>
           <li className="producto">
                    <div className="info-producto">
                        <p className="nombre">{nombre}</p>
                        <p className="precio">${precio}</p>
                        {imagen ? (<img src={`http://localhost:5000/${imagen}`} alt="imagen"/>) : null } 
                    </div>
                    <div className="acciones">
                        <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Producto
                        </Link>

                        <button type="button" className="btn btn-rojo btn-eliminar" onClick={ () => eliminarProducto(_id)}>
                            <i className="fas fa-times"></i>
                            Eliminar Cliente
                        </button>
                    </div>
                </li>

           

        </Fragment>
    )
}

export default Producto;