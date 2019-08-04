import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Spiner from '../layout/Spiner'


const MostarSuscriptor = ({suscriptor}) => {

    if (!suscriptor) return <Spiner />
    console.log(suscriptor);
    
    return (
        <div className="row">
            <br /><br /><br /><br />
            <div className="col-md-6 mb-4">
                <br />
                <Link to="/suscriptores" className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i>{' '}
                    Volver al Listado
                </Link>
            </div>
            <div className="col-md-6">
            <br />
                <Link to={`/suscriptores/EditarSuscriptor/${suscriptor.id}`} 
                className="btn btn-primary float-right">
                    <i className="fas fa-pencil-alt"></i>{' '}
                    Editar Suscriptor
                </Link>
            </div>
            <hr className="mx-5 w-100"/>
            <div className="col-12">
                <h2 className="mb-4">
                    {suscriptor.nombre} {suscriptor.apellido}
                </h2>

                <p>
                    <span className="font-weight-bold">
                        Carrera:
                    </span>
                    {suscriptor.carrera}
                </p>

                <p>
                    <span className="font-weight-bold">
                        Código:
                    </span>
                    {suscriptor.codigo}
                </p>

            </div>
        </div>
        );
}

MostarSuscriptor.protoTypes = {
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
    
)(MostarSuscriptor);