import React from 'react';
import Modal, { ModalProps } from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {Omit, BsPrefixProps} from 'react-bootstrap/esm/helpers';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function MyVerticallyCenteredModal(props: JSX.IntrinsicAttributes & Omit<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & { ref?: ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement> | null | undefined; }, BsPrefixProps<"div"> & ModalProps> & BsPrefixProps<"div"> & ModalProps & { children?: React.ReactNode; }) {

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Welcome to Trello!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FloatingLabel controlId="floatingInput" label="Your full name" className="mb-3">
                    <Form.Control name="name" placeholder="Your full name" defaultValue={props.userName} onChange={props.onChange}/>
                </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onSave}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyVerticallyCenteredModal;