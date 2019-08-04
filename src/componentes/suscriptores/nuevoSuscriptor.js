import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'

class NuevoSuscriptor extends Component {

    state={
        suscriptor: {
            nombre: '',
            apellido: '',
            carrera: '',
            codigo: ''
        }
    }

    // Extraer los valores del input y colocarlos en el state
    leerDato = e => {
        let {suscriptor} = this.state
        suscriptor[e.target.name] = e.target.value
        this.setState({
            suscriptor
        })
    } 

    // agregar suscriptor
    agregarSuscriptor = e => {
        e.preventDefault();

        // extraer los valores del state
        const {suscriptor} = this.state
        console.log(suscriptor);
        

        //extraer firestore de props
        console.log(this.props.firestore);
        const {firestore, history} = this.props

        //Guardar en la vase de datos
        firestore.add({collection: 'suscriptores'}, suscriptor)
        .then(() => {
            history.push('/suscriptores')
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <br />
                    <Link to={'/suscriptores'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i>{' '}
                        Volver a Suscriptores
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-user-plus">{' '}
                            Nuevo Suscriptor
                        </i>
                    </h2>
                </div> 
                <div className="row ">
                    <div className="col-md-12">
                        <form onSubmit={this.agregarSuscriptor}>
                            <div className="form-group">
                                <label>Nombre:</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="nombre"
                                    placeholder="Nombre del suscriptor"
                                    required  
                                    onChange={this.leerDato}
                                    value={this.state.suscriptor.nombre}
                                />
                            </div>  

                            <div className="form-group">
                                <label>Apellido:</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="apellido"
                                    placeholder="Apellido del suscriptor"
                                    required  
                                    onChange={this.leerDato}
                                    value={this.state.suscriptor.apellido}
                                />
                            </div>
                            <div className="form-group">
                                <label>Carrera:</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="carrera"
                                    placeholder="Carrera del suscriptor"
                                    required  
                                    onChange={this.leerDato}
                                    value={this.state.suscriptor.carrera}
                                />
                            </div>

                            <div className="form-group">
                                <label>Codígo:</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="codigo"
                                    placeholder="Codígo del suscriptor"
                                    required  
                                    onChange={this.leerDato}
                                    value={this.state.suscriptor.codigo}
                                />
                            </div>

                            <input type="submit" value="Agregar suscriptor" className="btn btn-success"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

NuevoSuscriptor.propTypes ={
    firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(NuevoSuscriptor);
