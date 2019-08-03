import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// importar store 
import store from './store'
import { Provider } from 'react-redux';

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
