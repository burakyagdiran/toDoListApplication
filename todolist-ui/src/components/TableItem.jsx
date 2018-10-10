import React, { Component } from 'react';
import { Alert, Row } from "react-bootstrap";
import { Button, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/fontawesome-free-solid"
import moment from 'moment';

export default class TableItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            Alert: {
                visible: false,
                message: "",
                bsStyle: 'info'
            }
        };

    }
    __renderItemName(row) {
        if (row.name == 'Name') {
            return (
                <th>
                    {row.name + " "}
                    <Button onClick={() => this.props.sortCallBack(this.props.sortType == 'Name' ? '' : 'Name')} color="link"><FontAwesomeIcon icon={this.props.sortType == 'Name' ?  Icons.faBan : Icons.faSortDown } /></Button>
                </th>

            )
        }
        else if (row.name == 'Status') {
            return (
                <th>
                    {row.name + " "}
                    <Button onClick={() => this.props.sortCallBack(this.props.sortType == 'Status' || this.props.sortType == 'findByStatus' ? '' : 'Status')} color="link"><FontAwesomeIcon icon={this.props.sortType == 'Status' || this.props.sortType == 'findByComplete' ? Icons.faBan : Icons.faSortDown} /></Button>
                    <Button onClick={() => this.props.sortCallBack(this.props.sortType == 'findByComplete' ? 'findByNot' : 'findByComplete')} color="link"><FontAwesomeIcon icon={this.props.sortType == 'findByComplete' ? Icons.faTimes : Icons.faCheck} /></Button>
                </th>

            )
        }
        else if (row.name == 'Deadline') {
            return (
                <th>
                    {row.name + " "}
                    <Button onClick={() => this.props.sortCallBack(this.props.sortType == 'Deadline' || this.props.sortType == 'getDeadline' ? '' : 'Deadline')} color="link"><FontAwesomeIcon icon={this.props.sortType == 'Deadline' || this.props.sortType == 'getDeadline' ? Icons.faBan : Icons.faSortDown} /></Button>
                    <Button onClick={() => this.props.sortCallBack(this.props.sortType == 'getDeadline' ? 'getExpired' : 'getDeadline')} color="link"><FontAwesomeIcon icon={this.props.sortType == 'getDeadline' ? Icons.faCalendarTimes : Icons.faCalendarCheck} /></Button>
                </th>

            )
        }
        else if (row.name == 'Create Date') {
            return (
                <th>
                    {row.name + " "}
                    <Button onClick={() => this.props.sortCallBack(this.props.sortType == 'Create Date' ? '' : 'Create Date')} color="link"><FontAwesomeIcon icon={this.props.sortType == 'Create Date' ?  Icons.faBan : Icons.faSortDown } /></Button>
                </th>

            )
        }
        else { return (<th >{row.name}</th>) }
    }
    render() {
        return (
            <div className='col-12'>
                <Table size='sm' >
                    <thead>
                        <tr>
                            {
                                this.props.fields.map((row, i) => this.__renderItemName(row))
                            }
                            <th width="50"></th>
                            <th width="50"><Button
                                ref="submitBtn"
                                onClick={() => this.props.createCallBack()}
                                color="success"
                                block >
                                <FontAwesomeIcon icon={Icons.faPlus} />{" "} Create Item </Button></th>
                        </tr>
                    </thead>
                    {(() => {
                        if (this.props.data.length > 0) {
                            return (
                                <tbody>
                                    {
                                        this.props.data.map((row, i) =>
                                            <tr>
                                                <th scope="row">{row.id}</th>
                                                <td >{row.itemName}</td>
                                                <td >{row.status}</td>
                                                <td >{row.description}</td>
                                                <td >{moment(row.deadline).format("DD") + "/" + moment(row.deadline).format("MM") + "/" + moment(row.deadline).format("YYYY")}</td>
                                                <td >{moment(row.createDate).format("DD") + "/" + moment(row.createDate).format("MM") + "/" + moment(row.createDate).format("YYYY")}</td>
                                                <td width="50">{
                                                    <Button
                                                        ref="submitBtn"
                                                        onClick={() => this.props.updateCallBack(row)}
                                                        color="warning"
                                                        block >
                                                        <FontAwesomeIcon icon={Icons.faSync} />{" "} Update Item</Button>
                                                }</td>
                                                <td width="50">{
                                                    <Button
                                                        ref="submitBtn"
                                                        onClick={() => this.props.deleteCallBack(row)}
                                                        color="danger"
                                                        block >
                                                        <FontAwesomeIcon icon={Icons.faTrashAlt} />{" "} Delete Item</Button>
                                                }</td>
                                            </tr>
                                        )
                                    }

                                </tbody>
                            )
                        }
                    })()}
                </Table>
            </div>
        );
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
}

