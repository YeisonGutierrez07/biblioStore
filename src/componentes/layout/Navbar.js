import React from 'react';
import {Link} from 'react-router-dom';
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firebaseConnect} from 'react-redux-firebase'
import PropTypes from 'prop-types';

class Navbar extends React.Component {
    state = { 
        usuarioAutenticado: false
    }

    //Recibe los props automaticamente
    static getDerivedStateFromProps(nextProps, prevState) {
        const {auth} = nextProps

        if (auth.uid) {
            return {usuarioAutenticado: true}
        } else {
            return {usuarioAutenticado: false}
        }
    }
    
    cerrarSesion = () => {
        const { firebase } = this.props
        firebase.logout();
    }

    returnMenu = () => {
        const { usuarioAutenticado } =this.state
        const { auth } =this.props
        if (usuarioAutenticado) {
            return(
             <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <nav className="navbar navbar-light">
                    <span className="navbar-brand mb-0 h1">
                        Administrador de biblioteca
                    </span>
                </nav>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={'./suscriptores'} className="nav-link">
                                Suscriptores
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'./'} className="nav-link">
                                Libros
                            </Link>
                        </li>
                    </ul>
                </div>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a href="#!" className="nav-link">
                            {auth.email}
                        </a>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-danger" type="button" onClick={this.cerrarSesion}>
                            Cerrar Sesión
                        </button>
                    </li>
                </ul>
            </nav>
            )
        }
        return null
    }

    render() { 
        return this.returnMenu();
    }
}

Navbar.propTypes = {
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth
    }))
)(Navbar)