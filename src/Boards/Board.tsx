import React, { useCallback, useState } from "react";
import ModalCard from "../Modals/ModalCard";
import Card from "../Cards/Card";
import AddingNewCardForm from "../Cards/AddingNewCardForm";

export interface StandardComponentProps {
  username: string;
  board: {
    id: string;
    title: string;
    cards: {
      id: string;
      author: string;
      title: string;
      description?: string;
      comments?: { id: string; author: string; content: string }[];
    }[];
  };
  updateBoard: any;
}

const Board = ({ username, board, updateBoard }: StandardComponentProps) => {
  const [isNewCard, setNewCard] = useState<{ [key: string]: boolean }>();
  const [modalShow, setModalShow] = React.useState<boolean>(false);
  const [card, setCard] = React.useState<{
    id: string;
    author: string;
    title: string;
    description?: string;
    comments?: { id: string; author: string; content: string }[];
  }>(
    {} as {
      id: string;
      author: string;
      title: string;
      description?: string;
      comments?: { id: string; author: string; content: string }[];
    }
  );

  const toggleNewCard = (id: string, state: boolean) => {
    setNewCard((isNewCard) => ({
      ...isNewCard,
      [id]: state,
    }));
  }

  const addCard = (
    board: {
      id: string;
      title: string;
      cards: {
        id: string;
        author: string;
        title: string;
        description?: string;
        comments?: { id: string; author: string; content: string }[];
      }[];
    },
    cardTitle: string
  ) => {
    updateBoard(board, "add card", cardTitle);
    toggleNewCard(board.id, false);
  }

  const updateCard = useCallback(
    (board, card, key, value) => {
      setCard((c) => ({
        ...c,
        [key]: value,
      }));

      const cards = board.cards.map(
        (c: {
          id: string;
          author: string;
          title: string;
          description?: string;
          comments?: { id: string; author: string; content: string }[];
        }) => {
          if (c.id !== card.id) {
            return { ...c };
          }
          return {
            ...card,
            [key]: value,
          };
        }
      );

      updateBoard(board, "cards", cards);
    },
    [updateBoard]
  );

  const update = (card: {
    id: string;
    author: string;
    title: string;
    description?: string;
    comments?: { id: string; author: string; content: string }[];
  }, board: {
    id: string;
    title: string;
    cards: {
      id: string;
      author: string;
      title: string;
      description?: string;
      comments?: { id: string; author: string; content: string }[];
    }[];
  }) => {
    setCard(card);
    updateBoard(board);
    setModalShow(true);
  }

  // --

  return (
    <>
      <ModalCard
        username={username}
        card={card}
        board={board}
        updateCard={updateCard}
        updateBoard={updateBoard}
        modalShow={modalShow}
        setModalShow={setModalShow}
      />
      <div className="board">
        <div className="board-title">
          <input
            key={board.id}
            type="text"
            name="board-title"
            defaultValue={board.title}
            onChange={(e) => updateBoard(board, "title", e.target.value)}
          />
        </div>
        {board.cards.length > 0 &&
          board.cards.map((card) => <Card board={board} card={card} updateBoard={update} />)}
        {!isNewCard?.[board.id] && (
          <div
            className="add-card"
            onClick={() => toggleNewCard(board.id, true)}
          >
            <img src="/images/plus.svg" alt="add card" />
            Добавить карточку
          </div>
        )}
        {isNewCard?.[board.id] && <AddingNewCardForm board={board} addCard={addCard} toggleNewCard={toggleNewCard} />}
      </div>
    </>
  );
};

export default Board;
