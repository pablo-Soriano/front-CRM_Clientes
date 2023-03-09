import React, { Fragment } from "react";

// Routing
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Layout
import { Header } from "./componentes/layout/Header";
import Navegacion from "./componentes/layout/Navegacion";


// Componentes
import Clientes from "./componentes/clientes/Clientes";
import NuevoCliente from "./componentes/clientes/NuevoCliente";
import EditarCliente from "./componentes/clientes/EditarCliente";

import Productos from "./componentes/productos/Productos";
import Pedidos from "./componentes/pedidos/Pedidos";




function App() {
  return (
    <Router>
      <Fragment>
        <Header />

        <div className="grid contenedor contenido-principal">
          <Navegacion />

          <main className="caja-contenido col-9">
              <Routes>
                <Route exact path="/" element={<Clientes />} />
                <Route exact path="/clientes/nuevo" element={<NuevoCliente />} />
                <Route exact path="/clientes/editar/:id" element={<EditarCliente />} />

                <Route path="/productos" element={<Productos />} />

                <Route path="/pedidos" element={<Pedidos />} />
              </Routes>

          </main>
        </div>


      </Fragment>
    </Router>
  );
}

export default App;
