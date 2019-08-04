import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Spiner from '../layout/Spiner'

const Suscriptores = ({suscriptores, firestore}) => {

    if (!suscriptores) return <Spiner />
    
    // Eliminar un item de firestore
    const eliminarSuscriptor = id => {
        firestore.delete({
            collection: 'suscriptores',
            doc: id
        })
        .then(() => {
            console.log("DELETE");
        })
    }

    return ( 
        <div className="row">
            <div className="col-md-12 mb-4">
                <br />
                <Link to={`/suscriptores/NuevoSuscriptor`} className="btn btn-primary">
                    <i className="fas fa-plus"></i>{' '} Nuevo Suscriptor
                </Link>
            </div>
            <div className="col-md-8">
                <h2>
                    <i className="fas fa-users"></i> Suscriptores
                </h2>
            </div>
            <table className="table table-striped mt-4">
                <thead className="text-light bg-primary">
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Carrera</th>
                        <th>Codigo</th>
                        <th>Acciones</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {suscriptores.map(suscriptor => (
                        <tr key={suscriptor.id}>
                            <td>{suscriptor.nombre}</td>
                            <td>{suscriptor.apellido}</td>
                            <td>{suscriptor.carrera}</td>
                            <td>{suscriptor.codigo}</td>
                            <td>
                                <Link to={`/suscriptores/mostrar/${suscriptor.id}`} className="btn btn-success btn-block">
                                    <i className="fas fa-angle-double-right"></i>{' '} Mas Información
                                </Link>
                            </td>
                            <td>
                                <button type="button" className="btn btn-danger" onClick={() => eliminarSuscriptor(suscriptor.id)}>
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

Suscriptores.propTypes ={
    firestore: PropTypes.object.isRequired,
    suscriptores: PropTypes.array
}
 
export default compose(
    firestoreConnect([{collection: 'suscriptores'}]),
    connect((state, props) => ({
        suscriptores: state.firestore.ordered.suscriptores
    }))
)(Suscriptores);