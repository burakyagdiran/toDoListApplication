import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap';
import Label from '../components/Label'
import Cookies from 'universal-cookie';
import { Row, Alert } from "react-bootstrap";

const cookies = new Cookies();
export default class ListModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            islemTipi: this.props.islemTipi,
            dataTip: this.props.dataTip,
            listEntity: this.props.listEntity,
            isRefresh: false,
            Alert: {
                visible: false,
                message: "",
                bsStyle: 'info'
            },
        };
        this.toggle = this.toggle.bind(this);
        this.__handleChange = this.__handleChange.bind(this);
        this.__deleteList = this.__deleteList.bind(this);
        this.__updateorCreateList = this.__updateorCreateList.bind(this);

    }
    toggle() {
        if (this.state.isRefresh) { this.props.callbackRefresh(); }
        else { this.props.callback(); }
    }
    
    render() {
        return (
            <div>

                <Modal isOpen={true} >
                    <ModalHeader >{this.props.title}</ModalHeader>
                    <ModalBody style={{ height: '90%', 'overflow-x': 'auto', 'max-height': 'max-content' }}>
                        <Row>
                            <div className='col-4'>
                                <Label name={"Name :"} />
                            </div>
                            <div className='col-8'>
                                <Input
                                    name="name"
                                    value={this.state.listEntity.name}
                                    onChange={this.__handleChange}
                                    validationDisplay="overlay"
                                    placeholder='List Name'
                                    validations={{
                                        required: true
                                    }}
                                    readOnly={this.state.dataTip == "Delete" ? true : false}
                                    maxLength={15}
                                />
                            </div>
                        </Row>
                        <br />
                        <div className="col-12">
                            {this.__alert()}
                        </div>
                    </ModalBody>
                    <ModalFooter >
                        <Button color={this.props.buttonColor} onClick={this.state.dataTip == "Delete" ?this.__deleteList :this.__updateorCreateList} >{this.props.dataTip}</Button>
                        <Button color="secondary" onClick={this.toggle} >Exit</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
    __RenderUrl() {
        if (this.state.dataTip == 'Update') { return ("updateList") }
        else if (this.state.dataTip == 'Create') { return ("createList") }
    }
    __RenderMethod() {
        if (this.state.dataTip == 'Update') { return ("PUT") }
        else if (this.state.dataTip == 'Create') { return ("POST") }
    }

    __updateorCreateList() { // update or create list
        fetch('http://localhost:8080/lists/' + this.__RenderUrl(), {
            method: this.__RenderMethod(),
            body: JSON.stringify(this.state.listEntity),
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Accept": "*/*",
            }
        }).then(response => response.json())
            .then(data => this.setState({ isRefresh: true, Alert: { visible: true, message: "Succesfull", bsStyle: 'info' } }))
            .catch(error => this.setState({ isRefresh: false, Alert: { visible: true, message: error, bsStyle: 'danger' } }))
    }
    __deleteList() { // delete list
        fetch('http://localhost:8080/lists/deleteList/' + this.state.listEntity.id , {
            method: 'DELETE',
            body: '',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Accept": "*/*",
            }
        }).then(() => this.setState({ isRefresh: true, Alert: { visible: true, message: "List deleted.", bsStyle: 'info' } }))
            .catch(error => this.setState({ isRefresh: false, Alert: { visible: true, message: error, bsStyle: 'danger' } }))
    }
    __alert() { // show alert component in screen
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
        let state = this.state.listEntity;
        state[e.target.name] = e.target.value;
        this.setState(state);
        return true;
    }
}