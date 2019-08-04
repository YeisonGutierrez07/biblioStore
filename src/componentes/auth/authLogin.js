import React, { Component } from 'react';
import {firebaseConnect} from 'react-redux-firebase'
import PropTypes from 'prop-types';


class AuthLogin extends Component {
    
    state = {
        email: "",
        password: ""
    }

    // Almacenarlos datos del login en state
    leerDatos= e => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    //iniciarSesion 
    iniciarSesion = e => { 
        e.preventDefault()
        const {email, password}= this.state
        const {firebase} = this.props

        firebase.login({
            email,
            password
        })
        .then(resultado => {
            console.log("OK ", resultado);
        })
        .catch(err => {
            console.log(err);
            
        })
    }

    render() {
        return ( 
            <div className="row">
                <div className="col-md-5">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2 className="text-center py-4">
                                <i className="fas fa-lock"></i>{' '}
                                Iniciar sesión
                            </h2>
                            <form onSubmit={this.iniciarSesion}>
                                <div className="form-group">
                                    <label>Email: </label>
                                    <input 
                                        type="email" 
                                        className="form-control"
                                        name="email"
                                        required
                                        value={this.state.email}
                                        onChange={this.leerDatos}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Contraseña: </label>
                                    <input 
                                        type="password" 
                                        className="form-control"
                                        name="password"
                                        required
                                        value={this.state.password}
                                        onChange={this.leerDatos}
                                    />
                                </div>
                                <input type="submit" value="Iniciar Sesión" className="btn btn-success btn-block"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AuthLogin.propTypes = {
    firebase: PropTypes.object.isRequired
}

export default firebaseConnect()(AuthLogin);
