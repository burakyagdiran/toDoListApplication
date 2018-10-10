import React, { Component } from 'react';
import { Alert, Grid } from "react-bootstrap";
import SideBar from '../components/SideBar'
import Table from '../components/TableCom'
import ListModal from './ListModal';
import Header from '../components/header/Header'
import Cookies from 'universal-cookie';
import ItemList from './ItemList'
import ToDoLists from './ToDoLists'

const cookies = new Cookies();

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Alert: {
                visible: false,
                message: "",
                bsStyle: 'info'
            }
        };
        this.__handleChange = this.__handleChange.bind(this);
    }
   
    render() {
        return (
            <div >
                <Header />
                <SideBar />
                <br />
                <ToDoLists />
            </div >
        );
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

