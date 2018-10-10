import React, { Component } from 'react';
import { Alert } from "react-bootstrap";
import { Button, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/fontawesome-free-solid"

export default class TableCom extends Component {

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

    render() {
        return (
            <div className='col-12'>
                <br /><br />
                <Table size="sm" >
                    <thead>
                        <tr>
                            {
                                this.props.fields.map((row, i) => <th>{row.name}</th>)
                            }
                            <th width="50"></th>
                            <th width="50"></th>
                            <th width="50"><Button
                                ref="submitBtn"
                                onClick={() => this.props.createCallBack()}
                                color="success"
                                block >
                                <FontAwesomeIcon icon={Icons.faPlus} />{" "} Create List </Button></th>
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
                                                <td >{row.name}</td>
                                                <td width="50">{
                                                    <Button
                                                        ref="submitBtn"
                                                        onClick={() => this.props.updateCallBack(row)}
                                                        color="warning"
                                                        block >
                                                        <FontAwesomeIcon icon={Icons.faSync} />{" "} Update List</Button>
                                                }</td>
                                                <td width="50">{
                                                    <Button
                                                        ref="submitBtn"
                                                        onClick={() => this.props.deleteCallBack(row)}
                                                        color="danger"
                                                        block >
                                                        <FontAwesomeIcon icon={Icons.faTrashAlt} />{" "} Delete List</Button>
                                                }</td>
                                                <td width="50">{
                                                    <Button
                                                        ref="submitBtn"
                                                        onClick={() => this.props.ıtemCallBack(row)}
                                                        color="info"
                                                        block >
                                                        <FontAwesomeIcon icon={Icons.faEye} />{" "} Item List</Button>
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

