import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Spiner from '../layout/Spiner'


class EditarSuscriptor extends Component {

    // Crear los refs
    nombreInput = React.createRef();
    apellidoInput = React.createRef();
    codigoInput = React.createRef();
    carreraInput = React.createRef();
    
    editarSuscriptor = e => {
        e.preventDefault()

        // Crear el objeto que vamos a actualizar
        const SuscriptorActualizado = {
            nombre: this.nombreInput.current.value,
            apellido: this.apellidoInput.current.value,
            codigo: this.codigoInput.current.value,
            carrera: this.carreraInput.current.value,
        }
        console.log(SuscriptorActualizado);
        
        // extraer firestore y history de props
        const {suscriptor, firestore, history} = this.props
        
        // almacenar en la base de datos
        firestore.update({
            collection: 'suscriptores',
            doc: suscriptor.id
        }, SuscriptorActualizado).then(history.push('/suscriptores'))
    }

    render() {
        const {suscriptor} = this.props
        
        if(!suscriptor) return <Spiner />
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
                        <i className="fas fa-user">{' '}
                            Editar Suscriptor
                        </i>
                    </h2>
                </div> 
                <div className="row ">
                    <div className="col-md-12">
                        <form onSubmit={this.editarSuscriptor}>
                            <div className="form-group">
                                <label>Nombre:</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="nombre"
                                    placeholder="Nombre del suscriptor"
                                    required  
                                    ref={this.nombreInput}
                                    defaultValue={suscriptor.nombre}
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
                                    ref={this.apellidoInput}
                                    defaultValue={suscriptor.apellido}
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
                                    ref={this.carreraInput}
                                    defaultValue={suscriptor.carrera}
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
                                    ref={this.codigoInput}
                                    defaultValue={suscriptor.codigo}
                                />
                            </div>

                            <input type="submit" value="Editar Suscriptor" className="btn btn-success"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

EditarSuscriptor.protoTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        {
            collection: 'suscriptores',
            storeAs: 'suscriptor',
            doc: props.match.params.id
        }
    ]),
    connect(({firestore:{ordered}}, props) =>({
        suscriptor: ordered.suscriptor && ordered.suscriptor[0]
    }))
    
)(EditarSuscriptor);