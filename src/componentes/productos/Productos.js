import React, {Fragment, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import  {clienteAxios}  from '../../config/axios';
import Spinner from '../layout/Spinner';
import Producto from './Producto';


function Productos() {

    //productos = state, guardarProductos = funcion para guardar state
    const [productos, guardarProductos] = useState([]);

    // useEffect para consultar API cuando cargue
    useEffect( () => {
        // query a la API
        const consultarAPI = async () => {
            const productosConsulta = await clienteAxios.get('/productos');
            guardarProductos(productosConsulta.data);
        }
        // llamada a la API
        consultarAPI();
    }, [productos]);

    // Spinner de carga
    if(!productos.length) return <Spinner />

    return(
        <Fragment>
            <h2>Productos</h2>

            <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
               {productos.map( producto => (
                    <Producto 
                        key={producto._id}
                        producto={producto} // este nombre de variable lo ponemos en Producto.js, en function Producto({producto}), es la variable entre llaves{}
                    />
               ))}
            </ul>

        </Fragment>
    )
}

export default Productos;