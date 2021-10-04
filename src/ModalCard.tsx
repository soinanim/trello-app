import React, {Dispatch, SetStateAction, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { v4 as uuid } from 'uuid';


export interface StandardComponentProps {
    userName: string;
    modalShow: boolean;
    setModalShow: Dispatch<SetStateAction<boolean>>;
    card: {
        id: string; author: string; title: string; description?: string; comments?: {
        id: string; author: string; content: string
    }[];
    };
    board: { id: string; title: string; cards: {
            id: string; title: string; description?: string; comments?: {
                id: string; author: string; content: string
            }[];
        }[];
    };
    // setBoard: Dispatch<SetStateAction<{ id: number; title: string; cards: { id: number; title: string; description?: string}[] }>>
    updateCard: any;
    updateBoard: any;
}

function ModalCard({userName, modalShow, updateCard, updateBoard, setModalShow,
                       card, board }: StandardComponentProps) {
    const [isShowButtons, setShowButtons] = useState(false);
    const [isShowButton, setShowButton] = useState(false);
    const [cardDescription, setCardDescription] = useState<string>("");
    const [comment, setComment] = useState<{
        id: string;
        author: string;
        content: string;
    } | undefined>({} as { id: string; author: string; content: string } | undefined);
    const [isChanging, setChanging] = useState<{ [key: string]: boolean }>(
        {} as { [key: number]: boolean }
    );

    const addComment = (comments: { id: string; author: string; content: string; }[] | undefined, comment: { id: string; author: string; content: string; } | undefined ) => {
        if(!comment) {
            return;
        }
        const data = comments ? [...comments, comment] : [comment];
        updateCard(board, card, "comments", data);
        setShowButton(false);
        setComment(undefined);
    };

    function changeComment(comments: { id: string; author: string; content: string }[] | undefined ) {
        if (!comments || !comment)  {
            return;
        }

        const data = comments.map((c) => {
            if (c.id === comment.id) {
                return { ...comment };
            } else {
                return { ...c };
            }
        });

        updateCard(board, card, "comments", data);
        setChanging({ [comment.id]: false });
    }

    const deleteComment = (comments: { id: string; author: string; content: string }[] | undefined, id: string) => {
        const data = comments ? comments.filter((c) => c.id !== id) : undefined;
        updateCard(board, card, "comments", data);
    };

    return (
        <Modal card={card} board={board} onHide={() => setModalShow(false)} show={modalShow}
               size="lg" aria-labelledby="contained-modal-title-vcenter" centered
        >
            <div className="window">
            <Modal.Header closeButton>
                {/*<Modal.Title id="contained-modal-title-vcenter">*/}
                {/*</Modal.Title>*/}
                <div className="card-title">
                    <img className="icon middle" src="./images/credit-card.svg" alt="card" />
                    <Form.Control as="textarea" rows={1} defaultValue={card.title}
                                  onChange={(e) => updateCard(board, card, "title", e.target.value)}
                    />
                    {/*<input key={card.id} type="text" name="board-title" defaultValue={card.title}*/}
                    {/*    onChange={(e) => updateCard(board, card, "title", e.target.value)}*/}
                    {/*/>*/}
                </div>
                {/*<div className="buttons">*/}
                {/*    <Button onClick={() => {*/}
                {/*        const cards = board.cards.filter((c) => c.id !== card.id);*/}
                {/*        updateBoard(board, "cards", cards);*/}
                {/*    }}>Удалить</Button>*/}
                {/*</div>*/}
            </Modal.Header>
            <Modal.Body>
                <div className="card-about">
                    в колонке {board.title} <br />
                    автор карточки {card.author}
                </div>
                <div className="card-actions"
                    onFocus={() => setShowButtons(true)}
                    onBlur={() => setShowButtons(false)}
                >
                    <div className="subtitle">
                        <img className="icon middle" src="./images/align-left.svg" alt="actions" />
                        Описание
                    </div>
                    <Form.Control as="textarea" rows={2} defaultValue={card.description}
                        onChange={(e) => setCardDescription(e.target.value)}
                    />
                    {isShowButtons && (
                        <div className="buttons">
                            <Button onClick={() => {
                                        updateCard(board, card, "description", cardDescription);
                                        setShowButtons(false);
                            }}>Сохранить</Button>
                            <div className="close-new-card">
                                <img src="/images/x.svg" alt="close" />
                            </div>
                        </div>
                    )}
                </div>
                <div className="card-actions" onFocus={() => setShowButton(true)}>
                    <div className="subtitle">
                        <img className="icon middle" src="./images/list.svg" alt="actions" />
                        Действия
                    </div>
                    <Form.Control  as="textarea" rows={1} placeholder="Напишите комментарий"
                        onChange={(e) => setComment({
                            id: uuid(),
                            author: userName,
                            content: e.target.value
                        })
                        }
                    />
                    {isShowButton && (
                        <div className="buttons">
                            <Button onClick={() => addComment(card.comments, comment)}>Сохранить</Button>
                        </div>
                    )}
                </div>
                <div className="card-actions">
                    {card.comments && card.comments?.length > 0 && <div className="subtitle">Комментарии</div>}
                    {card.comments && card.comments.map((comment) => (
                        <div key={comment.id} className="card-comment">
                            <img className="icon big" src="./images/user.svg" alt="user" />
                            <div className="comment-container">
                                <span>{comment.author}</span>
                                <div className="comment-content">
                                    {isChanging[comment.id] ? (
                                        <div>
                                            <Form.Control as="textarea" rows={1} defaultValue={comment.content}
                                                  onChange={(e) => setComment({
                                                        id: comment.id,
                                                        author: comment.author,
                                                        content: e.target.value
                                                  })}
                                            />
                                            <div className="buttons">
                                                <Button onClick={() => changeComment(card.comments)}>Сохранить</Button>
                                                <div onClick={() => setChanging({ [comment.id]: false })} className="close-new-card">
                                                    <img  src="/images/x.svg" alt="close" />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        comment.content
                                    )}
                                </div>
                                <div className="comment-reaction">
                                    <span onClick={() => setChanging({ [comment.id]: true })}>
                                      Изменить
                                    </span>
                                    <span onClick={() => deleteComment(card.comments, comment.id)}>
                                        - Удалить
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal.Body>
            </div>
        </Modal>
    );
}

export default ModalCard;