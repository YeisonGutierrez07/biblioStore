import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// importar store 
import store from './store'
import { Provider } from 'react-redux';

// Login
import AuthLogin from './componentes/auth/authLogin'

/* Rutas de libros */
import Libros from './componentes/libros/Libros'
import EditarLibros from './componentes/libros/EditarLibros'
import MostarLibro from './componentes/libros/MostrarLibro'
import NuevoLibro from './componentes/libros/NuevoLibro'
import PrestamoLibro from './componentes/libros/PrestamoLibro'

/* Rutas suscriptores */
import Suscriptores from './componentes/suscriptores/suscriptores'
import NuevoSuscriptor from './componentes/suscriptores/nuevoSuscriptor'
import MostarSuscriptor from './componentes/suscriptores/mostrarSuscriptor'
import EditarSuscriptor from './componentes/suscriptores/editarSuscriptor'

import Navbar from './componentes/layout/Navbar'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar/>
        <div className="container">
          <Switch>
            {/* login */}
            <Route exact path='/login' component={AuthLogin} />

            {/* Rutas de libros */}
            <Route exact path='/' component={Libros} />
            <Route exact path='/libros/mostrar/:id' component={MostarLibro} />
            <Route exact path='/libros/nuevo' component={NuevoLibro} />
            <Route exact path='/libros/editar/:id' component={EditarLibros} />
            <Route exact path='/libros/prestamo/:id' component={PrestamoLibro} />


            {/* Rutas suscriptores */}
            <Route exact path='/suscriptores' component={Suscriptores} />
            <Route exact path='/suscriptores/mostrar/:id' component={MostarSuscriptor} />
            <Route exact path='/suscriptores/NuevoSuscriptor' component={NuevoSuscriptor} />
            <Route exact path='/suscriptores/EditarSuscriptor/:id' component={EditarSuscriptor} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
