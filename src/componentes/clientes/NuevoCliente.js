import React, {Fragment, useState} from 'react';
import Swal from 'sweetalert2';
import { clienteAxios } from '../../config/axios';
import { useNavigate } from 'react-router-dom'; // es para redireccionar, antes se usaba el withRouter


function NuevoCliente() {
    const history = useNavigate(); // aqui se inicializa para usar el history como redireccionador

    // cliente = state, guadarCliente = funcion para guardar el state
    const [cliente, guardarCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    // leer los datos del formulario
    const atualizarState = e =>{
        // Almacenar lo que el usuario escribe en el state
        guardarCliente({
            //obtener una copia del state actual
            ...cliente,
            [e.target.name]: e.target.value, // [e.target.name]: es porque hace referencia a los name de cada input

        })
    }

    // Añade en la REST API un cliente nuevo
    const agregarCliente = e => {
        e.preventDefault();

        // enviar peticion a axios - API
        clienteAxios.post('/clientes', cliente)
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
                        'Se agregó el cliente!',
                        res.data.mensaje,
                        'success'
                      )
                }

                // Redireccionar
                history('/');
            });
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
            <h2>Nuevo Cliente</h2>

            <form onSubmit={agregarCliente}>
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" name="nombre" onChange={atualizarState} />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido" onChange={atualizarState} />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa Cliente" name="empresa" onChange={atualizarState} />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email" onChange={atualizarState} />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" placeholder="Teléfono Cliente" name="telefono" onChange={atualizarState} />
                </div>

                <div className="enviar">
                        <input type="submit" class="btn btn-azul" value="Agregar Cliente" disabled={validarCliente()} />
                </div>
            </form>

        </Fragment>
    )
}


export default NuevoCliente;