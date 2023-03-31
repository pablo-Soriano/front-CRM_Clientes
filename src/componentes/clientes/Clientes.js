import React, { useEffect, useState, Fragment, useContext } from 'react';

//importar cliente axios
import {clienteAxios} from '../../config/axios';
import Cliente from './Cliente';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../layout/Spinner';

// importar el Context
import { CRMContext } from '../../context/CRMcontext';


function Clientes(props) {
    const history = useNavigate();
    //trabajar con el state
    const [clientes, guardarClientes] = useState([]);

    // utilizar valores del context
    const [auth, guardarAuth] = useContext(CRMContext);

    // use effect es similar a componentdidmount y willmount
    useEffect( () => {

        if(auth.token != '') {
            // query a la API
             const consultarApi = async () =>{
                try {
                    const clientesConsulta = await clienteAxios.get('/clientes', {
                        headers: {
                        Authorization: `Bearer ${auth.token}`
                        }
                    });
                        // colocar el resultado en el state
                        guardarClientes(clientesConsulta.data);
                } catch (error) {
                    // Error con autorizacion
                    if(error.response.status = 500) {
                        history('/iniciar-sesion');
                    }
                }
            }
            consultarApi(); 
        } else {
            // Redireccionar
            history('/iniciar-sesion');
        }
    }, [clientes]); // colocamos a clientes aqui, para que al eliminar, se detecte el cambio y vuelve a ejecutar consultarApi y refresca la vista


    // si el state esta como false
    if(!auth.auth) {
        history('/iniciar-sesion');
    }

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