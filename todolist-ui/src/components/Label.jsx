import React from 'react';

export default class Label extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            compulsory: false,
            ...props
        }
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }
    render() {
        return (
            <div>
                {this.render()}
            </div>
        )
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps })
    }

    render() {
        if (!this.state.compulsory) {
            return (
                <label style={{ fontSize: "12pt", fontWeight: "bold", marginTop: "3px" }}> {this.state.name}</label>);
        }
        else {
            return (
                <div>
                    <label style={{ fontSize: "12pt", fontWeight: "bold", marginTop: "3px", color: "red" }}> * </label>
                    <label style={{ fontSize: "12pt", fontWeight: "bold", marginTop: "3px", marginLeft: "3px" }}> {this.state.name}</label>
                </div>);
        }
    }
}