import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'

class NuevoLibro extends Component {
    state = {
        libro: {
            titulo: "",
            editorial: "",
            ISBN: "",
            existencia: "",
        }
    }

    leerDato = e => {
        let {libro} = this.state
        libro[e.target.name] = e.target.value
        this.setState({libro})
    }

    agregarLibro = e => {
        e.preventDefault()

        // extraer los valores del state
        const {libro} = this.state

        libro.prestados = []
        //extraer firestore de props
        const {firestore, history} = this.props
        
        //Guardar en la vase de datos
        firestore.add({collection: 'libros'}, libro)
        .then(() => {
            history.push('/')
        })
    }
    
    render() {
        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <br />
                    <Link to={'/'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i>{' '}
                        Volver al Listado
                    </Link>
                </div>
                <div className="row">
                    <div className="col-md-8 mt-5">
                        <form onSubmit={this.agregarLibro}>
                            <div className="form-group">
                                <label>Titulo: </label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="titulo"
                                    placeholder="Titulo o nombre del libro"
                                    required
                                    value={this.state.libro.titulo}
                                    onChange={this.leerDato}
                                    />
                            </div>
                            <div className="form-group">
                                <label>Editorial: </label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="editorial"
                                    placeholder="Editorial del libro"
                                    required
                                    value={this.state.libro.editorial}
                                    onChange={this.leerDato}
                                    />
                            </div>
                            <div className="form-group">
                                <label>ISBN: </label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="ISBN"
                                    placeholder="ISBN del libro"
                                    required
                                    value={this.state.libro.ISBN}
                                    onChange={this.leerDato}
                                    />
                            </div>
                            <div className="form-group">
                                <label>existencia: </label>
                                <input 
                                    type="number" 
                                    min="0"
                                    className="form-control"
                                    name="existencia"
                                    placeholder="existencia del libro"
                                    required
                                    value={this.state.libro.existencia}
                                    onChange={this.leerDato}
                                    />
                            </div>
                            <input type="submit" className="btn btn-success" value="Agregar Libro"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

NuevoLibro.propTypes ={
    firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(NuevoLibro);
