import React, { useContext } from "react";
import {useNavigate} from 'react-router-dom';

import { CRMContext } from "../../context/CRMcontext";

export const Header = () => {
    const history = useNavigate();

    const [auth, guardarAuth] = useContext(CRMContext);

    const cerrarSesion = () => {
        // auth.auth = false y el token se remueve
        guardarAuth({
            token: '',
            auth: false
        });

        // se elimina el token del localstorage
        localStorage.setItem('token', '');

        //redireccionar
        history('/iniciar-sesion');
    }

    console.log(auth);

    return (
        <header className="barra">
        <div className="contenedor">
            <div className="contenido-barra">
                <h1>CRM - Administrador de Clientes</h1>
    
            {auth.auth ? (
                <button type="button" className="btn btn-rojo"  onClick={cerrarSesion}>
                    <i className="far fa-times-circle"></i>
                    Cerrar Sesión
                </button>
            ): null}
            </div>
    
        </div>
    </header>

)}


//export default Header;