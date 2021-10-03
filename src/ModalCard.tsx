import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export interface StandardComponentProps {
    userName: string
    modalShow: boolean
    setModalShow: Dispatch<SetStateAction<boolean>>
    card: { id: number; title: string; description?: string, comments?: {id: number, author: string, content: string}[] }
    board: { id: number; title: string; cards: { id: number; title: string; description?: string, comments?: {id: number, author: string, content: string}[]}[] }
    // setBoard: Dispatch<SetStateAction<{ id: number; title: string; cards: { id: number; title: string; description?: string}[] }>>
    updateCard: any
    updateBoard: any
}

function ModalCard({ userName, modalShow, updateCard, updateBoard, setModalShow, card, board }: StandardComponentProps) {

    const [isShowButtons, setShowButtons] = useState(false);
    const [isShowButton, setShowButton] = useState(false);
    const [cardDescription, setCardDescription] = useState<string>('');
    const [comment, setComment] = useState<{id: number, author: string, content: string}>({} as {id: number, author: string, content: string});
    const [comments, setComments] = useState<{id: number, author: string, content: string}[]>([] as {id: number, author: string, content: string}[]);

    // function addCardDescription(card: { id: number; title: string; description?: string }) {
    //
    //     card.description = cardDescription[card.id];
    //     // localStorage.setItem('boards', )
    // }
    //
    // function deleteCard(id: number) {
    //     setBoard((board) => ({
    //         ...board,
    //         cards: board.cards.filter((c) => c.id !== card.id),
    //     }))
    // }

    function addComment() {
        console.log(board, card, comments);
        setComments((comments) => [...comments, comment]);

        updateCard(board, card, 'comments', comments);
        setShowButtons(false);
    }


    return (
        <Modal card={card} board={board}
               onHide={() => setModalShow(false)} show={modalShow}
               size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <input key={card.id} type="text" name="board-title" defaultValue={card.title}
                           onChange={(e) => updateCard(board, card, 'title', e.target.value)}/>
                    <br/>в колонке {board.title} <br/>
                    автор {userName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Описание
                <Form.Control as="textarea" rows={3} defaultValue={card.description} onFocus={() => setShowButtons(true)}
                              onChange={(e) => setCardDescription(e.target.value)}
                />
                {isShowButtons && (
                    <div className="buttons">
                        <Button onClick={() => {
                            updateCard(board, card, 'description', cardDescription);
                            setShowButtons(false);
                        }}>Save</Button>
                        <div className="close-new-card">
                            <img src="/images/x.svg" alt="close"/>
                        </div>
                    </div>
                )}
                Комментарии
                <Form.Control as="textarea" rows={3} onFocus={() => setShowButton(true)} onChange={(e) => setComments({
                    id: card.comments ? card.comments.length + 1 : 1,
                    author: userName,
                    content: e.target.value,
                })} />
                {isShowButton && (
                    <Button onClick={() => addComment()} >Save</Button>
                )}
                {/*<Button onClick={() => updateBoard(card.id)}>Delete</Button>*/}
            </Modal.Body>
        </Modal>
    );
}

export default ModalCard;