import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Spiner from '../layout/Spiner'


const Libros = ({libros, firestore}) => {

    if (!libros) return <Spiner />

    const elimiarLibro = id => {
        console.log(firestore);
        console.log(id);
        firestore.delete({
            collection: 'libros',
            doc: id
        })
        .then(() => console.log("ELIMINA LIBRO"))
    }

    return ( 
        <div className="row">
            <div className="col-12 mb-4">
                <br /> 
                <Link to="/libros/nuevo" className="btn btn-primary">
                    <i className="fas fa-plus"></i>{' '}
                    Nuevo Libro
                </Link>
            </div>
            <div className="col-md-8">
                <h2>
                    <i className="fas fa-book"></i>{' '}
                    Libros
                </h2>
            </div>
            <table className="table table-striped mt-4">
                <thead className="text-light bg-primary">
                    <tr>
                        <th>Titulo</th>
                        <th>ISBN</th>
                        <th>Editorial</th>
                        <th>Existencia</th>
                        <th>Disponibles</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {libros.map(libro => (
                        <tr key={libro.id}>
                            <td>{libro.titulo}</td>
                            <td>{libro.ISBN}</td>
                            <td>{libro.editorial}</td>
                            <td>{libro.existencia}</td>
                            <td>{libro.existencia - libro.prestados.length}</td>
                            <td>
                                <Link
                                    to={`/libros/mostrar/${libro.id}`}
                                    className="btn btn-success btn-block"
                                >
                                    <i className="fas fa-angle-double-right"></i>{' '}
                                    Más Información
                                </Link>
                                <button className="btn btn-danger btn-block" onClick={() => elimiarLibro(libro.id)}>
                                    <i className="fas fa-trash-alt"></i>{' '}
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

Libros.propTypes = {
    firestore: PropTypes.object.isRequired,
    libros: PropTypes.array
}

export default compose(
    firestoreConnect([{collection: 'libros'}]),
    connect((state, props) => ({
        libros: state.firestore.ordered.libros
    }))
)(Libros);