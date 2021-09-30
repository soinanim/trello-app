import React, {useState, useMemo, useEffect} from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
// import MyVerticallyCenteredModal from './Modal';
import Modal, { ModalProps } from 'react-bootstrap/Modal';
import {Omit, BsPrefixProps} from 'react-bootstrap/esm/helpers';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
const App = () => {

    const [boards, setBoards] = useState<{
        id: number;
        title: string;
        cards: {id: number, title: string}[];
    }[]>(JSON.parse(localStorage.getItem('boards') as string) || [
        {id: 1, title: "TODO", cards: []},
        { id: 2, title: "In Progress", cards: [] },
        { id: 3, title: "Testing", cards: [] },
        { id: 4, title: "Done", cards: [] },
    ]);
    const [isNewCard, setNewCard] = useState<{[key: number]: boolean}>();
    const [cardTitle, setCardTitle] = useState("");
    const [modalShow, setModalShow] = React.useState(true);
    const [cardShow, setCardShow] = React.useState(false);

    const userName: string = useMemo(() => {
        return localStorage.getItem('userName') as string;
    }, []);

    function onSave() {
        setModalShow(false);
    }

    function saveUserName(e: { target: any; }) {
        localStorage.setItem('userName', e.target.value);
    }

    function changeTitle(
        board: { id: number; title: string; cards: { id: number; title: string }[] },
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        setBoards((boards) => {
            localStorage.setItem('boards', JSON.stringify(
                boards.map((b) => (b.id === board.id)
                    ? ({
                        ...b,
                        title: e.target.value,
                    })
                    : {...b}
                ))
            );
            return boards.map((b) => (b.id === board.id)
                ? ({
                    ...b,
                    title: e.target.value,
                })
                : {...b}
            );
        });
    }

    function toggleNewCard(id: number) {
        setNewCard((state) => ({
            ...state,
            [id]: true,
        }));
    }

    function addCard(id: number, cardTitle: string) {
        setBoards((boards) => {
            return boards.map((board) => {
                if (board.id !== id) {
                    return board;
                }
                return {
                    ...board,
                    cards: [...board.cards, { id: board.cards.length + 1, title: cardTitle }]
                };
            });
        });
        setNewCard((state) => ({
            ...state,
            [id]: false,
        }));
    }

    useEffect(() => {
        // localStorage.clear();
        localStorage.setItem('boards', JSON.stringify(boards));
    }, [boards]);

    console.log(boards);

    //---

    function openCard(id:number) {
        setCardShow(true);
    }

    function hideAddingCard(id: number) {
        setNewCard((state) => ({
            ...state,
            [id]: false,
        }))
    }

    return (
        <div className="app">
            {/*<MyVerticallyCenteredModal onHide={() => setModalShow(false)} show={modalShow} onSave={() => onSave()} onChange={(e: any) => saveUserName(e)} userName={userName}/>*/}
            <Modal onHide={() => setModalShow(false)} show={modalShow} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Welcome to Trello!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel controlId="floatingInput" label="Your full name" className="mb-3">
                        <Form.Control name="name" placeholder="Your full name" defaultValue={userName} onChange={(e: any) => saveUserName(e)}/>
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onSave}>Save</Button>
                </Modal.Footer>
            </Modal>
            <Modal onHide={() => setCardShow(false)} show={cardShow} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >

            </Modal>
            <div className="boards">
                {boards.map((board) => (
                    <div className="board">
                        <div className="board-title">
                            {/*<h2>{board.title}</h2>*/}
                            <input key={board.id} type="text" name="board-title" defaultValue={board.title}
                                   onChange={(e) => changeTitle(board, e)}/>
                        </div>
                        {board.cards && board.cards.length > 0 && board.cards.map((card) => (
                            <div className="card" onClick={() => openCard(card.id)}>{card.title}</div>
                        ))}
                        {!isNewCard?.[board.id] && (
                            <div className="add-card" onClick={() => toggleNewCard(board.id)}>
                                <img src="/images/plus.svg" alt="add card" />
                                Добавить карточку
                            </div>
                        )}
                        {isNewCard?.[board.id] && (
                            <div className="new-card">
                                <Form.Control as="textarea" rows={3} onChange={(e) => setCardTitle(e.target.value)}/>
                                <div className="buttons">
                                    <Button onClick={() => addCard(board.id, cardTitle)}>Add card</Button>
                                    <div className="close-new-card" onClick={() => hideAddingCard(board.id)}>
                                        <img src="/images/x.svg" alt="close" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );


};

export default App;