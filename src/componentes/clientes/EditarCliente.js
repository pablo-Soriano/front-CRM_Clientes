import React, {Fragment, useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import { clienteAxios } from '../../config/axios';
import { useNavigate, useParams } from 'react-router-dom' // useNavigate es para redireccionar, antes se usaba el withRouter, el useParams es para capturar el id de params


function EditarCliente() {
    const history = useNavigate(); // aqui se inicializa para usar el history como redireccionador

    // Obtener el ID
    const { id } = useParams();
    

    // cliente = state, guadarCliente = funcion para guardar el state
    const [cliente, datosCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    // Query a la API
    const consultarAPI = async () => {
        const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);
        //console.log(clienteConsulta.data);

        // colocar en el state
        datosCliente(clienteConsulta.data);
    }

    // useEffect, cuando el componente carga
    useEffect( () => {
        consultarAPI();
    }, []);

    // leer los datos del formulario
    const actualizarState = e =>{
        // Almacenar lo que el usuario escribe en el state
        datosCliente({
            //obtener una copia del state actual
            ...cliente,
            [e.target.name]: e.target.value, // [e.target.name]: es porque hace referencia a los name de cada input

        })
    }

    // Envia una peticion por axios para actualizar el cliente.
    const actualizarCliente = e => {
        e.preventDefault();

        // enviar peticion por axions
        clienteAxios.put(`/clientes/${cliente._id}`, cliente)
            .then(res => {
                 //validar si hay errores de mongoDB
                 if(res.data.code === 11000) {
                    Swal.fire(
                        'Hubo un error',
                        'Ese cliente ya está registrado!',
                        'error'                         
                    )
                } else {
                    Swal.fire(
                        'Correcto',
                        'Se actualizó Correctamente!',
                        'success'
                      )
                }
            // Redireccionar
             history('/');
            })
    }

    // Validar el formulario
    const validarCliente = () => {
        // Destructuring
        const {nombre, apellido, email, empresa, telefono} = cliente;

        //revisar que las propiedades del state tengan contenido
        let valido = !nombre.length ||!apellido.length || !empresa.length || !email.length ||!telefono.length;

        // return true o false
        return valido;

    }

    return (
        <Fragment>
            <h2>Editar Cliente</h2>

            <form onSubmit={actualizarCliente}>
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" name="nombre" onChange={actualizarState}  value={cliente.nombre}/>
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido" onChange={actualizarState} value={cliente.apellido}/>
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa Cliente" name="empresa" onChange={actualizarState} value={cliente.empresa} />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email" onChange={actualizarState} value={cliente.email} />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" placeholder="Teléfono Cliente" name="telefono" onChange={actualizarState} value={cliente.telefono}/>
                </div>

                <div className="enviar">
                        <input type="submit" class="btn btn-azul" value="Guardar Cambios" disabled={validarCliente()} />
                </div>
            </form>

        </Fragment>
    )
}


export default EditarCliente;