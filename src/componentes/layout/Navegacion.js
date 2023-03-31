import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { CRMContext } from "../../context/CRMcontext";

const Navegacion = () => {

  const [auth, guardarAuth] = useContext(CRMContext);
  // para validar si esta auth = true, sino no muestra la barra de navegacion, porque no esta logueado
  if(!auth.auth) return null;
  return (
    <aside className="sidebar col-3">
      <h2>Administración</h2>
      <nav className="navegacion">
        <Link to={"/"} className="clientes">
          Clientes
        </Link>
        <Link to={"/productos"} className="productos">
          Productos
        </Link>
        <Link to={"/pedidos"} className="pedidos">
          Pedidos
        </Link>
      </nav>
    </aside>
  );
};

export default Navegacion;
