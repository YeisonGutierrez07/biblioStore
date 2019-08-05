import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Spiner from '../layout/Spiner'
import FichaSuscriptor from '../suscriptores/fichaSuscriptor';


// REDUX actions
import { buscarUsuario } from '../../actions/buscarUsuarioActions';

class PrestamoLibro extends Component {

    state = {
        noResultados: false,
        alumno: ""
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

        // extraer firestore
        const {firestore, buscarUsuario} = this.props
        
        //hacer consulta
        const collection = firestore.collection("suscriptores");
        const consulta = collection.where("codigo", "==", alumno).get();
        consulta.then(InformacionDelUsuario => {

            if (InformacionDelUsuario.empty) {
                // no hay resultados

                //Almacenar en redux un objeto vacio
                buscarUsuario({})
                this.setState({
                    noResultados: true
                })
            } else {
                //si hay resultados
                const datos = InformacionDelUsuario.docs[0]

                // Colocar el resultado en el state de redux
                buscarUsuario(datos.data())
                this.setState({
                    noResultados: false
                })
            }
        })
    }

    soliciatarPrestamo = () => {
        const {estudiante, firestore, history, libro} = this.props

        //fecha de alta del libro
        estudiante.fecha_solucitud = new Date().toLocaleDateString();


        // No se puede mutar los props, tomar una copia y crear un arreglo nuevo.
        let prestados = []
        prestados = [...libro.prestados, estudiante]

        //Copear el objeto y agregar los prestados
        let libroActualizado = {...libro}
        libroActualizado.prestados = prestados
        
        firestore.update({
            collection: 'libros',
            doc: libroActualizado.id
        }, libroActualizado).then(() => {
            history.push("/")
        })
    } 

    render() {
        const {libro} = this.props
        if (!libro) return <Spiner />

        const { estudiante} = this.props
        const {noResultados} = this.state

        let fichaAlumno, btnSolicitar;
        if (estudiante.nombre) {
            fichaAlumno = <FichaSuscriptor alumno={estudiante}/>
            btnSolicitar = <button 
                                className="btn btn-primary btn-block"
                                type="button"
                                onClick={this.soliciatarPrestamo}
                            >
                                Solicitar Prestamo
                            </button>

        } else {
            fichaAlumno = null
            btnSolicitar = null 
        }

        //Mostrar mensaje de error
        let mensajeResultado = '';
        if (noResultados) {
            mensajeResultado = <div className="alert alert-danger">No hay resultados</div>
        } else {
            mensajeResultado = null
        }  

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
                                className="mb-4"
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
                            {/* Muestra la ficha del alumno */}
                            {fichaAlumno}
                            {btnSolicitar}

                            {/* muestra mensaje de error */}
                            {mensajeResultado}
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
    connect(({firestore:{ordered}, usuario}, props) =>({
        libro: ordered.libro && ordered.libro[0],
        estudiante: usuario
    }), {buscarUsuario})
)(PrestamoLibro);