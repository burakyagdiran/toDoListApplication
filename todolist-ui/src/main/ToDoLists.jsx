import React, { Component } from 'react';
import { Alert, Grid, Col } from "react-bootstrap";
import Table from '../components/TableCom'
import ListModal from './ListModal';
import Cookies from 'universal-cookie';
import ItemList from './ItemList'

const cookies = new Cookies();

export default class ToDoLists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isGetAll: true,
            dataList: [],
            fields: [
                { name: 'Id' },
                { name: 'Name'},
            ],
            listEntity: {
                id: 0,
                myUser: {
                    id: cookies.get("id"),
                    password: cookies.get("password"),
                    userName: cookies.get("userName")
                },
                name: ''
            },
            isModal: false,
            selectedRow: null,
            modalTitle: '',
            listName: '',
            buttonColor: "",
            isItemList: false,
            Alert: {
                visible: false,
                message: "",
                bsStyle: 'info'
            }
        };
        this.__getAllList = this.__getAllList.bind(this);
        this.__handleChange = this.__handleChange.bind(this);
    }

    componentDidMount() {
        // { this.__getAllList() }
    }

    render() {
        if (!this.state.isItemList) {
            { this.__getAllList() }
            return (
                <div >
                    {this.__renderList()}
                </div >
            );
        }
        else {
            return (
                <ItemList dataRow={this.state.selectedRow} callback={() =>  this.setState({ isItemList: false }) } ></ItemList>
            )
        }
    }
    __renderList() {
        return (
            <Col >
                <Grid>
                <h4> To-Do Lists </h4>
                    {this.__renderListTable()}
                    {this.__renderListModal()}
                    {this.__alert()}
                </Grid>

            </Col>
        )
    }
    __getAllList() { // get all list owned by the user
        if (this.state.isGetAll) {
            this.setState({ isGetAll: false, Alert: { visible: false } })
            if (this.state.listEntity.myUser.userName != '' && this.state.listEntity.myUser.password != '') {
                fetch('http://localhost:8080/lists/getAll/' + cookies.get('id'), {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                        "Accept": "*/*",
                    }
                }).then(response => response.json())
                    .then(data => this.setState({ dataList: data, isTable: true }))
                    .catch(error => this.setState({ Alert: { visible: true, message: error, bsStyle: 'danger' } }))
            }
            else {
                this.setState({ Alert: { visible: true, message: "Please chech your information!", bsStyle: 'danger' } })
            }
        }
    }
    __renderListTable() { // Show list table
        if (this.state.isTable) {
            return (
                <Table data={this.state.dataList} fields={this.state.fields} dataTip={"List"}
                    createCallBack={(row) => this.setState({ isModal: true, selectedRow: null, modalTitle: 'Create List', buttonColor: "success" })}
                    updateCallBack={(row) => this.setState({ isModal: true, selectedRow: row, modalTitle: 'Update List', buttonColor: "warning" })}
                    deleteCallBack={(row) => this.setState({ isModal: true, selectedRow: row, modalTitle: 'Delete List', buttonColor: "danger" })}
                    ıtemCallBack={(row) => this.setState({ selectedRow: row, isItemList: true })} />
            )
        }
    }
  
    __renderListModal() { // call ModalPopup
        let dataTip = this.state.modalTitle.split(" ");
        let param = Object.assign({}, this.state.listEntity)
        if (dataTip[0] == 'Update' || dataTip[0] == 'Delete') {
            param.id = this.state.selectedRow.id;
            param.name = this.state.selectedRow.name;
        }
        if (this.state.isModal) {
            return (
                <ListModal callback={() => this.setState({ isModal: false })} callbackRefresh={() => this.setState({ isModal: false, isGetAll: true, isTable: false })}
                    dataRow={this.state.selectedRow} title={this.state.modalTitle} dataTip={dataTip[0]} listEntity={param} buttonColor={this.state.buttonColor} />
            )
        }
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
        let state = {};
        state[e.target.name] = e.target.value;
        this.setState(state);
        return true;
    }
}

