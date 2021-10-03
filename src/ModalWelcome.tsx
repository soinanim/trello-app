import React, {useEffect, useState} from "react";
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export interface StandardComponentProps {
    userName: string
    updateUserName: any
}

function ModalWelcome( {userName, updateUserName}: StandardComponentProps ) {

    const [modalShow, setModalShow] = React.useState(true);
    const [nameError, setNameError] = useState(''); // error text : Please enter your name.

    function saveUserName(event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) {
        event.preventDefault();

        // console.log(validate());
        if (validate()) {
            updateUserName('');
            localStorage.setItem('userName', userName);
            setModalShow(false);
        }
    }

    const validate = () => {
        let isValid = true;

        console.log(userName);
        if (!userName) {
            isValid = false;
            setNameError('Please enter your name.');
        }

        return isValid;

    }

    useEffect(() => {
        updateUserName(() => localStorage.getItem('userName') as string);
    }, []);

    //--

    return (
        <Modal onHide={() => setModalShow(false)} show={modalShow}
            size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Welcome to Trello!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <FloatingLabel controlId="floatingInput" label="Your full name" className="mb-3">
                        <Form.Control className="form-control"  required type="text" name="name" placeholder="Your full name" defaultValue={userName}
                            onChange={(e: any) => updateUserName((e.target.value.match("^[a-zA-Zа-яА-Я ]*$") !== null) ? e.target.value : '')}
                        />
                        <div className="text-danger">{nameError}</div>
                    </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" onClick={saveUserName} >Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalWelcome;