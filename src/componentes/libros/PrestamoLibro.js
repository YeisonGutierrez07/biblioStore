import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Spiner from '../layout/Spiner'

class PrestamoLibro extends Component {

    state = {
        noResultados: false,
        alumno: "",
        estudiante: {}
    }

    leerDato = e => {
        const alumno = e.target.value 
        this.setState({
            alumno
        })
    }

    buscarAlumno = e => {
        e.preventDefault()

        // obtener valor del state
        const {alumno} = this.state
        console.log(alumno);

        // extraer firestore
        const {firestore} = this.props

        //hacer consulta
        const collection = firestore.collection("suscriptores");
        const consulta = collection.where("codigo", "==", alumno).get();
        consulta.then(InformacionDelUsuario => {

            console.log("LERR: ", InformacionDelUsuario);
            if (InformacionDelUsuario.empty) {
                // no hay resultados
                this.setState({
                    estudiante: {},
                    noResultados: true
                })
            } else {
                //si hay resultados
                const datos = InformacionDelUsuario.docs[0]
                console.log(datos.data());
                this.setState({
                    estudiante: datos.data(),
                    noResultados: false
                })
            }
        })
        
        
    }

    render() {
        const {libro} = this.props
        if (!libro) return <Spiner />

        return (
            <div className="row mt-5">
                <div className="col-12 mb-4">
                    <br />
                    <Link to={'/'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i>{' '}
                        Volver al listado de libros
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-book">{' '}
                            Solicitar prestamo: {libro.titulo}
                        </i>
                    </h2>
                    <div className="row">
                        <div className="col-md-8">
                            <form 
                                onSubmit={this.buscarAlumno}
                            > 
                               <legend className="color-primary text-center">
                                    Busca el suscritor por código   
                                </legend> 
                                <input 
                                    type="text" 
                                    name="busqueda"
                                    className="form-control"
                                    value={this.state.alumno}
                                    onChange={this.leerDato}
                                />
                                <br/>
                                <input value="Buscar Alumno" type="submit" className="btn btn-success btn-block"/>
                            </form>
                        </div>
                    </div>
                </div> 
            </div>
        );
    }
}
PrestamoLibro.protoTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        {
            collection: 'libros',
            storeAs: 'libro',
            doc: props.match.params.id
        }
    ]),
    connect(({firestore:{ordered}}, props) =>({
        libro: ordered.libro && ordered.libro[0]
    }))
    
)(PrestamoLibro);