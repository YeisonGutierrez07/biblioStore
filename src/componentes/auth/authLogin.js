import React, { Component } from 'react';
import {firebaseConnect} from 'react-redux-firebase'
import { Row, Col, Input, Button,  Form, Icon, notification } from 'antd';
import PropTypes from 'prop-types';
import './styles.scss'


class AuthLogin extends Component {
    
    iniciarSesion = e => {
        e.preventDefault();
        const {firebase} = this.props

        this.props.form.validateFields((err, values) => {
          if (!err) {
            firebase.login({
                email: values.email,
                password: values.password
            })
            .then(resultado => {
                console.log("OK ", resultado);
            })
            .catch(err => {
                notification.error({
                    message: 'Error',
                    description:'Correo o contraseña incorrecto',
                });
            })
          }
        });
      };
    

    render() {
        const { getFieldDecorator } = this.props.form;

        return ( 
            <Row justify="center">
                <Col xl={3} lg={3} md={6}/>
                <Col xl={18} lg={18} md={12} sm={24} xs={24}>
                    <div className="cardForm" align="center">
                        <Row>
                            <Col xl={12} lg={12} md={24}>
                                <h3 className="title">
                                    INICIAR SESION
                                </h3>
                                <Form onSubmit={this.iniciarSesion} className="login-form title">
                                    <Form.Item>
                                    {getFieldDecorator('email', {
                                        rules: [{ required: true, message: 'Por favor ingrese su Correo!' }],
                                    })(
                                        <Input
                                            type="email"
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Correo"
                                        />,
                                    )}
                                    </Form.Item>
                                    <Form.Item>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Por favor ingrese su contraseña!' }],
                                    })(
                                        <Input
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password"
                                            placeholder="Password"
                                        />,
                                    )}
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            Iniciar Sesión
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                            <Col xl={12} lg={12} md={0} xs={0}>
                                <h3 className="title">
                                    BiblioStore
                                </h3>
                                <div>
                                    <img className="imgBiblio" src="https://image.flaticon.com/icons/png/512/224/224620.png" alt=""/>
                                </div>    
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col xl={3} lg={3} md={6}/>
            </Row>
        );
    }
}

AuthLogin.propTypes = {
    firebase: PropTypes.object.isRequired
}

const LoginForm = Form.create({ name: 'normal_login' })(AuthLogin);


export default firebaseConnect()(LoginForm);
