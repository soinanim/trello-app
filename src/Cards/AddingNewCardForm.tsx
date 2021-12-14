import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export interface StandardComponentProps {
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
    addCard: any,
    toggleNewCard: any,
}

const AddingNewCardForm = ({board, addCard, toggleNewCard}: StandardComponentProps) => {
  const [cardTitle, setCardTitle] = useState("");


    return (
        <div className="new-card">
        <Form.Control
          as="textarea"
          rows={2}
          onChange={(e) => setCardTitle(e.target.value)}
        />
        <div className="buttons">
          <Button onClick={() => addCard(board, cardTitle)}>
            Добавить карточку
          </Button>
          <div
            className="close-new-card"
            onClick={() => toggleNewCard(board.id, false)}
          >
            <img src="/images/x.svg" alt="close" />
          </div>
        </div>
      </div>
    )
}

export default AddingNewCardForm;