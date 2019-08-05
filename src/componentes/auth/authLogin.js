import React, { Component } from 'react';
import {firebaseConnect} from 'react-redux-firebase'
import { Row, Col, Input, Button,  Form, Icon, Alert } from 'antd';
import PropTypes from 'prop-types';
import './styles.scss'


class AuthLogin extends Component {
    
    state = {
        alertNoLogin: false
    }

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
                this.setState({
                    alertNoLogin: true
                })
            })
          }
        });
      };
    
      resetModal = () => {
        this.setState({
            alertNoLogin: false
        })
      }

    render() {
        const { getFieldDecorator } = this.props.form;

        const alertaNoLogin = () => {
            const {alertNoLogin} = this.state
            if (alertNoLogin) {
                return  <Alert message="Correo o contraseña incorrecto" type="warning" />
            }
            return null
        }
        return ( 
            <Row justify="center">
                <Col xl={8} lg={8} md={6}/>
                <Col xl={8} lg={8} md={12} sm={24} xs={24}>
                    <div className="cardForm" align="center">
                        <div>
                            <img className="imgLogin" src="https://image.flaticon.com/icons/png/512/224/224620.png" alt=""/>
                        </div>
                        <h3 className="title">
                            BiblioStore
                        </h3>
                        <Form onSubmit={this.iniciarSesion} className="login-form">
                            <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Por favor ingrese su Correo!' }],
                            })(
                                <Input
                                type="email"
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Correo"
                                onChange={this.resetModal}
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
                                onChange={this.resetModal}
                                />,
                            )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Iniciar Sesión
                                </Button>
                            </Form.Item>
                        </Form>
                        {alertaNoLogin()}
                    </div>
                </Col>
                <Col xl={8} lg={8} md={6}/>
            </Row>
        );
    }
}

AuthLogin.propTypes = {
    firebase: PropTypes.object.isRequired
}

const LoginForm = Form.create({ name: 'normal_login' })(AuthLogin);


export default firebaseConnect()(LoginForm);
