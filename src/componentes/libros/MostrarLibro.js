import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Spiner from '../layout/Spiner'

const MostarLibro = ({libro, firestore, history}) => {
    if (!libro) return <Spiner />
    console.log(libro);
    
    let btnPrestamo;
    if(libro.existencia - libro.prestados.length > 0) {
        btnPrestamo = <Link to={`/libros/prestamo/${libro.id}`}
                            className="btn btn-success my-3"
                        >Solicitar Prestamo</Link>
    } else {
        btnPrestamo = null;
    }

    const devolverLibro = id => {
        console.log(id);

        //copia del libro
        const libroActualizado = {...libro}

        // eliminar la persona que esta realizando la devolucion
        const prestados = libro.prestados.filter(usuario => usuario.codigo !== id)

        libroActualizado.prestados = prestados

        firestore.update({
            collection:'libros',
            doc: libro.id
        }, libroActualizado).then(() => {
            history.push("/")
        })

    }

    return (
        <div className="row">
            <div className="col-md-6 mb-4">
                <br/>
                <Link to="/" className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i>{' '}
                    Volver al listado
                </Link>
            </div>
            <div className="col-md-6">
                <br/>
                <Link to={`/libros/editar/${libro.id}`} className="btn btn-primary float-right">
                    <i className="fas fa-pencil-right"></i>{' '}
                    Editar Libro
                </Link>
            </div>
            <hr className="mx-5 w-100"/>
            <div className="col-12">
                <h2>
                    {libro.titulo}
                </h2>
                <p>
                    <span className="font-weight-bold">
                        ISBN: {' '}
                    </span>
                    {libro.ISBN}
                </p>
                <p>
                    <span className="font-weight-bold">
                        Editorial: {' '}
                    </span>
                    {libro.editorial}
                </p>
                <p>
                    <span className="font-weight-bold">
                        Existencia: {' '}
                    </span>
                    {libro.existencia}
                </p>

                <p>
                    <span className="font-weight-bold">
                        Disponibles: {' '}
                    </span>
                    {libro.existencia - libro.prestados.length}
                </p>
                {/* Boton para solicitar un prestamo */}
                {btnPrestamo}
                {/* Muestra las personas que han solicitado los libros */}
                <h3 className="my-2">Personas que tienen el libro prestado</h3>
                {libro.prestados.map(prestado => (
                    <div key={prestado.codigo} className="card my-03">
                        <h4 className="card-header">
                            {prestado.nombre} {prestado.apellido}
                        </h4>
                        <div className="card-body">
                            <p>
                                <span className="font-weight-bold">
                                    Código: {' '}
                                </span>
                                {prestado.codigo}
                            </p>
                            <p>
                                <span className="font-weight-bold">
                                    Carrera: {' '}
                                </span>
                                {prestado.carrera}
                            </p>
                            <p>
                                <span className="font-weight-bold">
                                    Fecha de solicitud: {' '}
                                </span>
                                {prestado.fecha_solucitud}
                            </p>
                        </div>
                        <div className="card-footer">
                            <button 
                                type="button" 
                                className="btn btn-success font-weight-bold"
                                onClick={() => devolverLibro(prestado.codigo)}
                            >  Devolver Libro </button>
                        </div>
                    </div>
                ))}

            </div>
        </div>
      );
}


MostarLibro.protoTypes = {
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
)(MostarLibro);