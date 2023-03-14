import React, {Fragment, useState} from 'react'
import Swal from 'sweetalert2';
import { clienteAxios } from '../../config/axios';
import { useNavigate } from 'react-router-dom';


function NuevoProducto() {
    const history = useNavigate();

    // producto = state, guardarProducto = setState
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: ''
    });

    // archivo = state, guardarArchivo = setState
    const [archivo, guardarArchivo] = useState('');

    // Almacena nuevo producto en la BD
    const agregarProducto = async e => {
        e.preventDefault();

        // Crear un formdata (para el envio de imagenes a la API)
        const formData = new FormData();

        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        // almacenarlo en BD
        try {
           const res = await clienteAxios.post('/productos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // lanzar una alerta
            if(res.status === 200) {
                Swal.fire(
                    'Agregado Correctamente',
                    res.data.mensaje,
                    'success'
                )
            }

            //redirecccionar
            history('/productos');

        } catch (error) {
            console.log(error);
            // lanzar alerta
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: 'Vuelva a intentarlo'
            })
        }
    }

    // leer los datos del formulario
    const leerInformacionProducto = e => {
        guardarProducto({
            //obtener una copia del state y agregar el nuevo
            ...producto,
            [e.target.name]: e.target.value
        })
    }

    //coloca la imagen en el state
    const leerArchivo = e => {
        guardarArchivo(e.target.files[0]);
    }

    return(
        <Fragment>
            <h2>Nuevo Producto</h2>

            <form onSubmit={agregarProducto}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Producto" name="nombre" onChange={leerInformacionProducto} />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" name="precio" min="0.00" step="0.01" placeholder="Precio" onChange={leerInformacionProducto} />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file"  name="imagen" onChange={leerArchivo}/>
                </div>

                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Agregar Producto" />
                </div>
            </form>
        </Fragment>
    )
}

export default NuevoProducto;