import React, {useCallback, useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ModalCard from "./ModalCard";

export interface StandardComponentProps {
    userName: string // TODO delete it
    board: { id: number; title: string; cards: { id: number; title: string; description?: string}[] }
    updateBoard: any
}


const Board = ( {userName, board, updateBoard}: StandardComponentProps ) => {

    const [isNewCard, setNewCard] = useState<{[key: number]: boolean}>();
    const [cardTitle, setCardTitle] = useState("");
    const [modalShow, setModalShow] = React.useState<boolean>(false);
    const [card, setCard] = React.useState<{ id: number; title: string }>(
        {} as { id: number; title: string }
    );

    function toggleNewCard(id: number) {
        setNewCard((state) => ({
            ...state,
            [id]: true,
        }));
    }

    function addCard(
        board: { id: number; title: string; cards: { id: number; title: string; description?: string | undefined; }[]; },
        cardTitle: string
    ) {
        console.log('test');
        updateBoard(board, 'add card', cardTitle);

        setNewCard((state) => ({
            ...state,
            [board.id]: false,
        }));
    }

    function hideAddingCard(id: number) {
        setNewCard((state) => ({
            ...state,
            [id]: false
        }));
    }

    function openCard(
        board: { id: number; title: string; cards: { id: number; title: string; description?: string}[] },
        card: { id: number; title: string; description?: string }
    ) {
        setCard(card);
        updateBoard(board);
        // setBoard(board);
        setModalShow(true);
    }

    const updateCard = useCallback((board, card, key, value) => {
        console.log(card, key, value);
        // ???
        setCard((c) => ({
            ...c,
            [key]: value,
        }));

        const cards =  board.cards.map((c: { id: number; title: string; description?: string}) => {
            if (c.id !== card.id) {
                return {...c};
            }
            return ({
                ...card,
                [key]: value,
            })
        })
        updateBoard(board, 'cards', cards);
    },[updateBoard]);


    return (
        <>
            <ModalCard userName={userName} card={card} board={board} updateCard={updateCard}
                       updateBoard={updateBoard} modalShow={modalShow} setModalShow={setModalShow}
            />
            <div className="board">
                <div className="board-title">
                    <input key={board.id} type="text" name="board-title" defaultValue={board.title}
                           onChange={(e) => updateBoard(board, 'title', e.target.value)}/>
                </div>
                {board.cards.length > 0 && board.cards.map((card) => (
                    <div className="card" onClick={() => openCard(board, card)}>{card.title}</div>
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
                            <Button onClick={() => addCard(board, cardTitle)}>Add card</Button>
                            <div className="close-new-card" onClick={() => hideAddingCard(board.id)}>
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