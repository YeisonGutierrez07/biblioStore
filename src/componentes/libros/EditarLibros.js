import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Spiner from '../layout/Spiner'

class EditarLibros extends React.Component {
    
    refTitulo = React.createRef();
    refEditorial = React.createRef();
    refISBN = React.createRef();
    refExistencia = React.createRef();

    editarLibro = e => {
        e.preventDefault()
        const {libro}  = this.props

        const editarLibro = {
            titulo: this.refTitulo.current.value,
            editorial: this.refEditorial.current.value,
            ISBN: this.refISBN.current.value,
            existencia: this.refExistencia.current.value,
            prestados: libro.prestados
        }
        console.log(editarLibro);

         // extraer firestore y history de props
         const {suscriptor, firestore, history} = this.props
        
         // almacenar en la base de datos
        firestore.update({
            collection: 'libros',
            doc: libro.id
        }, editarLibro).then(history.push('/'))
        
    }
    render() {
        const {libro}  = this.props
        if (!libro) return <Spiner />
        return ( 
            <div className="row">
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
                            Editar Libro: {libro.titulo}
                        </i>
                    </h2>
                </div> 
                <div className="row">
                    <div className="col-md-8 mt-5">
                    <form onSubmit={this.editarLibro}>
                            <div className="form-group">
                                <label>Titulo: </label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="titulo"
                                    placeholder="Titulo o nombre del libro"
                                    required
                                    ref={this.refTitulo}
                                    defaultValue={libro.titulo}
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
                                    ref={this.refEditorial}
                                    defaultValue={libro.editorial}
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
                                    ref={this.refISBN}
                                    defaultValue={libro.ISBN}
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
                                    ref={this.refExistencia}
                                    defaultValue={libro.existencia}
                                    onChange={this.leerDato}
                                    />
                            </div>
                            <input type="submit" className="btn btn-success" value="Editar Libro"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


EditarLibros.protoTypes = {
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
    
)(EditarLibros);