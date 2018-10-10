import React, { Component } from 'react';
import { Alert, Col } from "react-bootstrap";
import { InputGroup, InputGroupAddon, Input, Card, Form, CardImg, Button } from 'reactstrap';
import HLogo from "../huawei-logo.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/fontawesome-free-solid"
import { browserHistory } from 'react-router'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userEntity: {
                userName: '',
                password: '',
            },
            isLogin: false,
            Alert: {
                visible: false,
                message: "",
                bsStyle: 'info'
            }
        };
        this.__renderSignIn = this.__renderSignIn.bind(this);
        this.__renderSignUp = this.__renderSignUp.bind(this);
        this.__onKeyPress = this.__onKeyPress.bind(this);
        this.__handleChange = this.__handleChange.bind(this);

    }

    render() {
        return (
            <div className='center-block'
                style={{ maxWidth: 350, margin: "30px auto" }}>
                <Card>
                    <CardImg top width="100%" src={HLogo} alt="Card image cap" />
                    <Form>
                        <Col>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend" style={{ marginTop: "10px", marginRight: "10px" }}>
                                    <FontAwesomeIcon icon={Icons.faUser} />
                                </InputGroupAddon>
                                <Input
                                    placeholder="userName"
                                    name="userName"
                                    value={this.state.userEntity.userName}
                                    validationDisplay="overlay"
                                    validations={{
                                        required: true
                                    }}
                                    onKeyPress={this.__onKeyPress}
                                    onChange={this.__handleChange}
                                />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend" style={{ marginTop: "10px", marginRight: "10px" }}>
                                    <FontAwesomeIcon icon={Icons.faLock} />
                                </InputGroupAddon>
                                <Input
                                    placeholder="password"
                                    name="password"
                                    type="password"
                                    value={this.state.userEntity.password}
                                    validationDisplay="overlay"
                                    validations={{
                                        required: true
                                    }}
                                    onKeyPress={this.__onKeyPress}
                                    onChange={this.__handleChange}
                                />
                            </InputGroup>
                        </Col>
                        <div className="col-12" style={{ paddingBottom: "1rem", paddingTop: "0.5rem" }}>
                            <Button
                                ref="submitBtn"
                                onClick={this.__renderSignUp}
                                color="info"
                                block >
                                Sign Up
                            </Button>{' '}
                        </div>
                        <div className="col-12" style={{ paddingBottom: "1rem" }}>
                            <Button
                                ref="submitBtn"
                                onClick={this.__renderSignIn}
                                color="danger"
                                block >
                                Sign In
                            </Button>
                        </div>
                        <br />
                        <div className="col-12" >
                            {this.__alert()}
                        </div>
                    </Form>
                </Card>

            </div >
        );
    }
    __renderLogin(value) {
        if (value != 0) {
            cookies.set('userName', this.state.userEntity.userName, { path: '/' });
            cookies.set('password', this.state.userEntity.password, { path: '/' });
            cookies.set('id', value, { path: '/' });
            browserHistory.push("/main")
        }
        else {
            this.setState({ Alert: { visible: true, message: "Wrong password or username!", bsStyle: 'danger' } })
        }
    }

    __renderSignIn() {
        this.setState({ Alert: { visible: false } })
        if (this.state.username != '' && this.state.password != '') {
            fetch('http://localhost:8080/users/login/', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "Accept": "*/*",
                    userName: this.state.userEntity.userName,
                    password: this.state.userEntity.password
                }
            })
                .then(response => response.json())
                .then(response => this.__renderLogin(response))
                .catch(error => console.error('Error:', error));
        }
        else {
            this.setState({ Alert: { visible: true, message: "Please chech your information!", bsStyle: 'danger' } })
        }
    }
    __renderSignUp() {
        this.setState({ Alert: { visible: false } })
        if (this.state.username != '' && this.state.password != '') {
            fetch('http://localhost:8080/users/createUser/', {
                method: 'POST',
                body: JSON.stringify(this.state.userEntity),
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "Accept": "*/*"
                }
            })
                .then(response => response.json())
                .then(response => this.setState({ isLogin: JSON.stringify(response), Alert: { visible: true, message: "Account created succesfull.", bsStyle: 'info' } }))
                .catch(error => console.error('Error:', error));
        }
        else {
            this.setState({ Alert: { visible: true, message: "Please chech your information!", bsStyle: 'danger' } })
        }
    }
    __onKeyPress(e) {
        if (e.key == "Enter") {
                this.__renderSignIn();
        }
    }
    __alert() {

        if (this.state.Alert.visible)
            return (
                <div >
                    <Alert bsStyle={this.state.Alert.bsStyle} style={{ height: '60px' }}>
                        <div style={{ float: 'left' }}>
                            {this.state.Alert.message}
                        </div>
                    </Alert>
                </div>);
    }
    __handleChange(e) {
        let state = this.state.userEntity;
        state[e.target.name] = e.target.value;
        this.setState(state);
        return true;
    }
}

