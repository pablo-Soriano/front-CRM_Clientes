import React, { useEffect, useState, Fragment } from 'react';

//importar cliente axios
import {clienteAxios} from '../../config/axios';
import Cliente from './Cliente';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';


function Clientes() {
    //trabajar con el state
    const [clientes, guardarClientes] = useState([]);

    // query a la API
    const consultarApi = async () =>{
        const clientesConsulta = await clienteAxios.get('/clientes');
        
         // colocar el resultado en el state
         guardarClientes(clientesConsulta.data);
    }

    // use effect es similar a componentdidmount y willmount
    useEffect( () => {
        consultarApi();
    }, [clientes]); // colocamos a clientes aqui, para que al eliminar, se detecte el cambio y vuelve a ejecutar consultarApi y refresca la vista

        // Spinner de carga
        if(!clientes.length) return <Spinner />


    return(
        <Fragment>
            <h2>Clientes</h2>

            <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

            <ul className='listado-clientes'>
                {clientes.map(cliente => (
                    <Cliente
                        key={cliente._id} 
                        cliente={cliente}
                    />
                ))}
            </ul>
        </Fragment>
    )
}

export default Clientes;