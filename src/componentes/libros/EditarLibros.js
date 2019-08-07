import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom'
import { Row, Col, Form, Input, Button } from 'antd';
import PropTypes from 'prop-types'

import Spiner from '../layout/Spiner'

class EditarLibros extends React.Component {
    
    editarLibro = e => {
        e.preventDefault()
        const {libro, firestore, history}  = this.props

        this.props.form.validateFields((err, values) => {
            console.log("values: ", values);
            if (!err) {
                const editarLibro = {
                    titulo: values.titulo,
                    editorial: values.editorial,
                    ISBN: values.ISBN,
                    existencia: values.existencia,
                    prestados: libro.prestados
                }
                console.log("editarLibro: ", editarLibro);
                
                 // almacenar en la base de datos
                firestore.update({
                    collection: 'libros',
                    doc: libro.id
                }, editarLibro).then(history.push('/'))
            }
        });
    }

    render() {
        const {libro}  = this.props
        const { getFieldDecorator } = this.props.form;

        if (!libro) return (
            <div align="center">
                <Spiner />    
            </div>
        )
        console.log(libro);
        
        return ( 
            <div>
                <div className="row">
                    <div className="col-12 mb-4">
                        <br />
                        <Link to={'/'} className="btn btn-secondary">
                            <i className="fas fa-arrow-circle-left"></i>{' '}
                            Volver al listado de libros
                        </Link>
                    </div>
                </div>
                <h2 className="movetitle">
                    <i className="fas fa-book">{' '}
                        Editar Libro: {libro.titulo}
                    </i>
                </h2>
                <div className="cacardEditarLibrordEditarLibro">
                    <Row>   
                        <Form onSubmit={this.editarLibro} >
                            <Col lg={12} md={12} sm={12} xs={24} >
                                <Form.Item  label="Titulo">
                                    {getFieldDecorator('titulo', {
                                        initialValue:libro.titulo,
                                        rules: [{ required: true, message: 'Por favor ingrese el Titulo o nombre del libro!' }],
                                    })(
                                        <Input
                                            type="text"
                                            placeholder="Titulo o nombre del libro"
                                        />,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col lg={12} md={12} sm={12} xs={24} >
                                <Form.Item  label="Editorial">
                                    {getFieldDecorator('editorial', {
                                        initialValue:libro.editorial,
                                        rules: [{ required: true, message: 'Por favor ingrese la editorial del libro!' }],
                                    })(
                                        <Input
                                            type="text"
                                            placeholder="Editorial del libro"
                                        />,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col lg={12} md={12} sm={12} xs={24} >
                                <Form.Item  label="ISBN">
                                    {getFieldDecorator('ISBN', {
                                        initialValue:libro.ISBN,
                                        rules: [{ required: true, message: 'Por favor ingrese el ISBN del libro!' }],
                                    })(
                                        <Input
                                            type="text"
                                            placeholder="ISBN del libro"
                                        />,
                                    )}
                                </Form.Item>
                            </Col>

                            <Col lg={12} md={12} sm={12} xs={24} >
                                <Form.Item  label="Existencia">
                                    {getFieldDecorator('existencia', {
                                        initialValue:libro.existencia,
                                        rules: [{ required: true, message: 'Por favor ingrese la Cantidad de libros que hay!' }],
                                    })(
                                        <Input
                                            type="text"
                                            placeholder="Existencia del libro"
                                        />,
                                    )}
                                </Form.Item>
                            </Col>
                            <Col lg={12} md={12} sm={12} xs={24} >
                                <Form.Item >
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Editar Libro
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Form>
                    </Row>
                </div>
            </div>
        );
    }
}


EditarLibros.protoTypes = {
    firestore: PropTypes.object.isRequired
}

const EditarLibrosForm = Form.create({ name: 'normal_login' })(EditarLibros);

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
    
)(EditarLibrosForm);