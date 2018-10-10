import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter,Button } from 'reactstrap';

export default class ModalPopupBilgi extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalPopup: props.modalPopup,
            islemBasladi : false,
        };
        this.toggle = this.toggle.bind(this);

    }
    toggle() {
        this.props.callback();
    }
    render() {
        return (
            <div>

                <Modal isOpen={true}  >
                    <ModalHeader >{this.props.title}</ModalHeader>
                    <ModalBody style={{ height: '60%', 'overflow-x': 'auto', 'max-height': 'max-content' }}>
                    {this.props.text}
                    {this.props.children}
                    </ModalBody>
                    <ModalFooter >
                    <Button color="primary" onClick={this.props.buttonCallback} >{this.props.buttonName}</Button>
                    <Button color="danger" onClick={this.toggle} >Exit</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }


}