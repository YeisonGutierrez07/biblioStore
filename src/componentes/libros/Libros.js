import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom'
import { Card } from 'antd';
import PropTypes from 'prop-types'
import Spiner from '../layout/Spiner'
import './styles.scss'
const { Meta } = Card;


const Libros = ({libros, firestore}) => {

    if (!libros) return <Spiner />

    const elimiarLibro = id => {
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
            <div className="col-md-12">
                <h2>
                    <i className="fas fa-book"></i>{' '}
                    Libros
                </h2>
            </div>
            {libros.map(libro => (
                <div className="moveCard">
                    <Link to={`/libros/mostrar/${libro.id}`} >
                        <Card
                        key={libro.id}
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" className="imgLibro" src={libro.imagen} />}
                        >
                        <Meta title={libro.titulo} description="www.instagram.com" />
                        </Card>
                    </Link>
                    
                </div>
            ))}
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