import React, {useCallback, useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ModalCard from "../Modals/ModalCard";

export interface StandardComponentProps {
    username: string
    board: { id: string; title: string;
        cards: { id: string; author: string; title: string; description?: string;
            comments?: { id: string; author: string; content: string }[];
        }[]
    }
    updateBoard: any
}


const Board = ( {username, board, updateBoard}: StandardComponentProps ) => {

    const [isNewCard, setNewCard] = useState<{[key: string]: boolean}>();
    const [cardTitle, setCardTitle] = useState("");
    const [modalShow, setModalShow] = React.useState<boolean>(false);
    const [card, setCard] = React.useState<{
        id: string; author: string; title: string; description?: string;
        comments?: { id: string; author: string; content: string }[];
        }>(
            {} as { id: string; author: string; title: string; description?: string;
            comments?: { id: string; author: string; content: string }[]; }
    );

    function toggleNewCard(id: string, state: boolean) {
        setNewCard((isNewCard) => ({
            ...isNewCard,
            [id]: state,
        }));
    }

    function addCard(
        board: { id: string; title: string;
            cards: { id: string; author: string; title: string; description?: string;
                comments?: { id: string; author: string; content: string }[];
            }[];
        },
        cardTitle: string
    ) {
        updateBoard(board, 'add card', cardTitle);
        toggleNewCard(board.id, false);
    }


    function openCard(
        board: { id: string; title: string; cards: { id: string; author: string; title: string; description?: string;
                comments?: { id: string; author: string; content: string }[];
            }[]
        },
        card: { id: string; author: string; title: string; description?: string;
            comments?: { id: string; author: string; content: string }[];
        }
    ) {
        setCard(card);
        updateBoard(board);
        setModalShow(true);
    }

    const updateCard = useCallback((board, card, key, value) => {
        setCard((c) => ({
            ...c,
            [key]: value,
        }));

        const cards =  board.cards.map((c: {
            id: string; author: string; title: string; description?: string; comments?: { id: string; author: string; content: string }[];
        }) => {
            if (c.id !== card.id) {
                return {...c};
            }
            return ({
                ...card,
                [key]: value,
            })
        });

        updateBoard(board, 'cards', cards);
    },[updateBoard]);

    // --

    return (
        <>
            <ModalCard username={username} card={card} board={board} updateCard={updateCard}
                       updateBoard={updateBoard} modalShow={modalShow} setModalShow={setModalShow}
            />
            <div className="board">
                <div className="board-title">
                    <input key={board.id} type="text" name="board-title" defaultValue={board.title}
                           onChange={(e) => updateBoard(board, 'title', e.target.value)}/>
                </div>
                {board.cards.length > 0 && board.cards.map((card) => (
                    <div className="card" onClick={() => openCard(board, card)}>
                        <div className="card-title">{card.title}</div>
                        {card.comments && card.comments.length > 0 && (
                            <div className="card-comments">
                                    <img className="icon" src="/images/message-square.svg" alt="comments" />
                                {card.comments.length}
                            </div>
                        )}
                    </div>
                ))}
                {!isNewCard?.[board.id] && (
                    <div className="add-card" onClick={() => toggleNewCard(board.id, true)}>
                        <img src="/images/plus.svg" alt="add card" />
                        Добавить карточку
                    </div>
                )}
                {isNewCard?.[board.id] && (
                    <div className="new-card">
                        <Form.Control as="textarea" rows={2} onChange={(e) => setCardTitle(e.target.value)}/>
                        <div className="buttons">
                            <Button onClick={() => addCard(board, cardTitle)}>Добавить карточку</Button>
                            <div className="close-new-card" onClick={() => toggleNewCard(board.id, false)}>
                                <img src="/images/x.svg" alt="close" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Board;