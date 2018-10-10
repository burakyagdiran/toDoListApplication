import React, { Component } from 'react';
import { Alert, Grid } from "react-bootstrap";
import Table from '../components/TableItem'
import ItemModal from './ItemModal';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/fontawesome-free-solid"
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

const cookies = new Cookies();

export default class ItemList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isGetAll: true,
            dataList: [],
            fields: [
                { name: 'Id' },
                { name: 'Name' },
                { name: 'Status' },
                { name: 'Description' },
                { name: 'Deadline' },
                { name: 'Create Date' },
            ],
            itemEntity: {
                id: 0,
                deadline: '',
                description: '',
                itemName: '',
                status: '',
                dependencyId: '',
                createDate: new Date(),
                myList: this.props.dataRow
            },
            searchName: '',
            isSearch: false,
            isModal: false,
            selectedRow: null,
            modalTitle: '',
            listName: '',
            buttonColor: "",
            sortType: "",
            isItemList: false,
            Alert: {
                visible: false,
                message: "",
                bsStyle: 'info'
            }
        };
        this.__getAllItem = this.__getAllItem.bind(this);
        this.__renderSearchName = this.__renderSearchName.bind(this);
        this.__handleChange = this.__handleChange.bind(this);
        this.__onKeyPress = this.__onKeyPress.bind(this);
    }

    render() {
        { this.__getAllItem() }
        return (
            <div >
                <Grid>

                    <h4> To-Do Item Lists </h4>
                    <Button
                        onClick={() => this.props.callback()}>
                        <FontAwesomeIcon icon={Icons.faArrowLeft} />
                    </Button>
                    <br /><br />
                    <div className='col-3'>
                        <InputGroup>
                            <Input
                                name="searchName"
                                value={this.state.searchName}
                                onChange={this.__handleChange}
                                validationDisplay="overlay"
                                placeholder='Item Name'
                                validations={{
                                    required: true
                                }}
                                onKeyPress={this.__onKeyPress}
                                readOnly={this.state.dataTip == "Delete" ? true : false}
                                maxLength={15}
                            />

                            <InputGroupAddon addonType="append"><Button onClick={this.__renderSearchName} >
                                <FontAwesomeIcon icon={Icons.faSearch} /></Button></InputGroupAddon>
                        </InputGroup>
                    </div>
                    {this.__renderListTable()}
                    {this.__renderListModal()}
                    {this.__alert()}
                </Grid>
            </div>
        );
    }
    __renderUrl() {
        if (this.state.sortType == '') {
            return ("getAll/")
        }
        else if (this.state.sortType == 'Deadline') {
            return ("orderByDeadline/")
        }
        else if (this.state.sortType == 'Status') {
            return ("orderByStatus/")
        }
        else if (this.state.sortType == 'findByComplete') {
            return ("findByStatus/complete/")
        }
        else if (this.state.sortType == 'findByNot') {
            return ("findByStatus/not/")
        }
        else if (this.state.sortType == 'Name') {
            return ("orderByName/")
        }
        else if (this.state.sortType == 'getDeadline') {
            return ("getDeadline/")
        }
        else if (this.state.sortType == 'getExpired') {
            return ("getExpired/")
        }
        else if (this.state.sortType == 'Create Date') {
            return ("orderByCreateDate/")
        }
        else if (this.state.sortType == 'SearchByName') {
            return ("findByName/" + this.state.searchName + "/")
        }
    }
    __getAllItem() { // get all Item
        if (this.state.isGetAll) {
            this.setState({ isGetAll: false, Alert: { visible: false } })
            fetch('http://localhost:8080/items/' + this.__renderUrl() + this.props.dataRow.id, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "Accept": "*/*",
                }
            }).then(response => response.json())
                .then(data => this.setState({ dataList: data, isTable: true }))
                .catch(error => this.setState({ Alert: { visible: true, message: error, bsStyle: 'danger' } }))
        }
    }
    __renderListTable() { // Show Item table
        if (this.state.isTable) {
            return (
                <div >
                    <Table data={this.state.dataList} fields={this.state.fields} dataTip={"List"} sortType={this.state.sortType}
                        sortCallBack={(row) => this.setState({ isModal: false, isGetAll: true, isTable: false, sortType: row })}
                        createCallBack={(row) => this.setState({ isModal: true, selectedRow: null, modalTitle: 'Create Item', buttonColor: "success" })}
                        updateCallBack={(row) => this.setState({ isModal: true, selectedRow: row, modalTitle: 'Update Item', buttonColor: "warning" })}
                        deleteCallBack={(row) => this.setState({ isModal: true, selectedRow: row, modalTitle: 'Delete Item', buttonColor: "danger" })}
                        ıtemCallBack={(row) => this.setState({ selectedRow: row, isItemList: true })} />
                </div>
            )
        }
    }
    __renderListModal() { // call ModalPopup
        if (this.state.isModal) {
            let dataTip = this.state.modalTitle.split(" ");
            let param = Object.assign({}, this.state.itemEntity)
            let selectItem = this.state.dataList.map((obj) => {  return ({ label: obj.itemName, value: obj.id.toString() }) });
            
            if (dataTip[0] == 'Update' || dataTip[0] == 'Delete') {
                selectItem.map((obj,i) => { if(this.state.selectedRow.id == obj.value){ selectItem.splice(i,1)} })
                param.id = this.state.selectedRow.id;
                param.itemName = this.state.selectedRow.itemName;
                param.description = this.state.selectedRow.description;
                param.status = this.state.selectedRow.status;
                param.deadline = this.state.selectedRow.deadline;
                param.dependencyId = this.state.selectedRow.dependencyId == null? '' :  this.state.selectedRow.dependencyId;
            }
            return (
                <ItemModal callback={() => this.setState({ isModal: false })} callbackRefresh={() => this.setState({ isModal: false, isGetAll: true, isTable: false })}
                    dataRow={this.state.selectedRow} title={this.state.modalTitle} selectItem={selectItem} dataTip={dataTip[0]} itemEntity={param} buttonColor={this.state.buttonColor} />
            )
        }
    }
    __renderSearchName() {
        this.setState({ isModal: false, isGetAll: true, isTable: false, isSearch: true, sortType: this.state.searchName.trim() == '' ? "" : "SearchByName" })
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
    __onKeyPress(e) {
        if (e.key == "Enter") {
            this.__renderSearchName();
        }
    }
    __handleChange(e) {
        if (this.state.isSearch && e.target.value.trim().length == 0) {
            this.setState({ isModal: false, isGetAll: true, isSearch: false, isTable: false, sortType: "" })
        }
        let state = {};
        state[e.target.name] = e.target.value;
        this.setState(state);
        return true;
    }
}

