import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap';
import Label from '../components/Label'
import Cookies from 'universal-cookie';
import { Row, Alert } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Switch from "react-switch";
import Select from 'react-select';

const cookies = new Cookies();
export default class ItemModal extends Component {


    constructor(props) {
        super(props);
        const data = this.props.itemEntity;

        this.state = {
            islemTipi: this.props.islemTipi,
            dataTip: this.props.dataTip,
            date: moment(),
            itemData: data,
            isRefresh: false,
            checked: false,
            selectedOption: null,
            Alert: {
                visible: false,
                message: "",
                bsStyle: 'info'
            },
        };
        this.toggle = this.toggle.bind(this);
        this.__handleChangeDate = this.__handleChangeDate.bind(this);
        this.__onChange = this.__onChange.bind(this);
        this.__deleteList = this.__deleteList.bind(this);
        this.handleChangeSwitch = this.handleChangeSwitch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.__renderCompleteControl = this.__renderCompleteControl.bind(this);
        this.__updateorCreateList = this.__updateorCreateList.bind(this);

    }
    toggle() {
        if (this.state.isRefresh) { this.props.callbackRefresh(); }
        else { this.props.callback(); }
    }
    componentDidMount() {
        if (this.props.itemEntity.status == 'complete') { this.setState({ checked: true }) }
    }

    render() {
        this.__updateorCreateList()
        const { selectedOption } = this.state;
        return (
            <div>

                <Modal isOpen={true} className={'detay'}>
                    <ModalHeader >{this.props.title}</ModalHeader>
                    <ModalBody >
                        <Row>
                            <div className='col-2'>
                                <Label name={"Name "} />
                            </div>
                            <div className='col-4'>
                                <Input
                                    name="itemName"
                                    value={this.state.itemData.itemName}
                                    onChange={this.__onChange}
                                    validationDisplay="overlay"
                                    placeholder='Item Name'
                                    validations={{
                                        required: true
                                    }}
                                    readOnly={this.state.dataTip == "Delete" ? true : false}
                                    maxLength={15}
                                />
                            </div>
                            <div className='col-2'>
                                <Label name={"Status "} />
                            </div>
                            <div className='col-4'>
                                <Switch
                                    onChange={this.handleChangeSwitch}
                                    checked={this.state.checked}
                                    id="normal-switch"
                                />
                            </div>
                        </Row>
                        <br />
                        <Row>
                            <div className='col-2'>
                                <Label name={"Description"} />
                            </div>

                            <div className='col-10'>
                                <Input
                                    name="description"
                                    value={this.state.itemData.description}
                                    onChange={this.__onChange}
                                    validationDisplay="overlay"
                                    placeholder='Description'
                                    type="textarea"
                                    validations={{
                                        required: true
                                    }}
                                    readOnly={this.state.dataTip == "Delete" ? true : false}
                                />
                            </div>
                        </Row>
                        <br />
                        <Row>
                            <div className='col-2'>
                                <Label name={"Deadline "} />
                            </div>
                            <div className='col-3'>
                                <DatePicker
                                    selected={this.state.date}
                                    onChange={this.__handleChangeDate}
                                    dateFormat="DD/MM/YYYY"
                                    readOnly={this.state.dataTip == "Delete" ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <Label name={"Dependent id"} />
                            </div>
                            <div className='col-4'>
                                <Select
                                    value={selectedOption}
                                    onChange={this.handleChange}
                                    options={this.props.selectItem}
                                    isClearable={true}
                                />
                            </div>
                        </Row>
                        <br />
                        <div className="col-12">
                            {this.__alert()}
                        </div>
                    </ModalBody>
                    <ModalFooter >
                        <Button color={this.props.buttonColor} onClick={this.state.dataTip == "Delete" ? this.__deleteList : this.__renderCompleteControl} >{this.props.dataTip}</Button>
                        <Button color="secondary" onClick={this.toggle} >Exit</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
    __RenderUrl() {
        if (this.state.dataTip == 'Update') { return ("updateItem") }
        else if (this.state.dataTip == 'Create') { return ("createItem") }
    }
    __RenderMethod() {
        if (this.state.dataTip == 'Update') { return ("PUT") }
        else if (this.state.dataTip == 'Create') { return ("POST") }
    }

    __renderCompleteControl() { //check dependent object status
        if (this.state.checked) {
            fetch('http://localhost:8080/items/checkDependency/' + this.state.itemData.id, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "Accept": "*/*",
                }
            }).then(response => response.json())
                .then(data => {
                    if (data == 1) { this.setState({ isUpdate: true, Alert: { visible: false } }) }
                    else { this.setState({ isUpdate: false, Alert: { visible: true, message: "dependent item's status not complete!", bsStyle: 'danger' } }) }
                })
                .catch(error => this.setState({ isUpdate: false, Alert: { visible: true, message: error, bsStyle: 'danger' } }))
        }
        else {
            this.setState({ isUpdate: true, Alert: { visible: false } })
        }

    }

    __updateorCreateList() { // update or create list
        if (this.state.isUpdate) {
            this.setState({ isUpdate: false, })
            let param = Object.assign({}, this.state.itemData);
            param.deadline = new Date(this.state.date.format('YYYY'), this.state.date.format('MM') - 1, this.state.date.format('DD'));
            param.deadline = moment(param.deadline).format("YYYY-MM-DDTHH:mm")
            param.status = this.state.checked ? 'complete' : 'not';
            param.dependencyId = this.state.selectedOption == null ? null : this.state.selectedOption.value;

            fetch('http://localhost:8080/items/' + this.__RenderUrl(), {
                method: this.__RenderMethod(),
                body: JSON.stringify(param),
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "Accept": "*/*",
                }
            }).then(response => response.json())
                .then(data => this.setState({ isRefresh: true, Alert: { visible: true, message: "Succesfull", bsStyle: 'info' } }))
                .catch(error => this.setState({ isRefresh: false, Alert: { visible: true, message: error, bsStyle: 'danger' } }))
        }
    }
    __deleteList() { // delete list
        fetch('http://localhost:8080/items/deleteItem/' + this.state.itemData.id, {
            method: 'DELETE',
            body: '',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Accept": "*/*",
            }
        }).then(() => this.setState({ isRefresh: true, Alert: { visible: true, message: "Item deleted", bsStyle: 'info' } }))
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
    handleChangeSwitch(checked) {
        if (this.state.dataTip != "Delete") {
            this.setState({ checked });
        }
    }
    __onChange(e) {
        let state = this.state.itemData;
        state[e.target.name] = e.target.value;
        this.setState(state);
        return true;
    }
    __handleChangeDate(e) {
        this.setState({
            date: e
        });
    }

    handleChange = (e) => {
        this.setState({ selectedOption: e });
    }
}