import React from "react";

export interface StandardComponentProps {
  card: {
      id: string;
      author: string;
      title: string;
      description?: string;
      comments?: { id: string; author: string; content: string }[];
    };
    board: {
        id: string;
        title: string;
        cards: {
          id: string;
          author: string;
          title: string;
          description?: string;
          comments?: { id: string; author: string; content: string }[];
        }[]
    };
    updateBoard: any;
}

interface OpenCardProps {
  board:  {
    id: string;
    title: string;
    cards: {
      id: string;
      author: string;
      title: string;
      description?: string;
      comments?: { id: string; author: string; content: string }[];
    }[]
    }, card: {
      id: string;
      author: string;
      title: string;
      description?: string;
      comments?: { id: string; author: string; content: string }[];
    }
}   

const Card = ({board, card, updateBoard}: StandardComponentProps) => {

    const openCard = ({ board, card }: OpenCardProps) => {
        updateBoard(card, board);
      }

  return (
    <div className="card" onClick={() => openCard({board, card})}>
      <div className="card-title">{card.title}</div>
      {card.comments && card.comments.length > 0 && (
        <div className="card-comments">
          <img
            className="icon"
            src="/images/message-square.svg"
            alt="comments"
          />
          {card.comments.length}
        </div>
      )}
    </div>
  );
};

export default Card;