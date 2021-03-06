import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { v4 as uuid } from "uuid";

export interface StandardComponentProps {
  username: string;
  modalShow: boolean;
  setModalShow: Dispatch<SetStateAction<boolean>>;
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
      title: string;
      description?: string;
      comments?: { id: string; author: string; content: string }[];
    }[];
  };
  updateCard: any;
  updateBoard: any;
}

function ModalCard({
  username,
  modalShow,
  updateCard,
  updateBoard,
  setModalShow,
  card,
  board,
}: StandardComponentProps) {
  const [isShowButtons, setShowButtons] = useState(false);
  const [isShowButton, setShowButton] = useState(false);
  const [cardDescription, setCardDescription] = useState<string>("");
  const [isChanging, setChanging] = useState<{ [key: string]: boolean }>(
    {} as { [key: number]: boolean }
  );
  const [comment, setComment] = useState<
    { id: string; author: string; content: string } | undefined
  >({} as { id: string; author: string; content: string } | undefined);
  const [newComment, setNewComment] = useState<
    { id: string; author: string; content: string } | undefined
  >({} as { id: string; author: string; content: string } | undefined);

  const refDescription = useRef<HTMLDivElement>(null);
  const refComment = useRef<HTMLDivElement>(null);

  const addComment = (
    comments: { id: string; author: string; content: string }[] | undefined,
    comment: { id: string; author: string; content: string } | undefined
  ) => {
    if (!comment) {
      return;
    }

    const data = comments ? [...comments, comment] : [comment];

    updateCard(board, card, "comments", data);
    setShowButton(false);
    setComment(undefined);
  };

  const changeComment = (
    comments: { id: string; author: string; content: string }[] | undefined,
    newComment: { id: string; author: string; content: string } | undefined
  ) => {
    if (!comments || !newComment) {
      return;
    }

    const data = comments.map((c) => {
      if (c.id === newComment.id) {
        return { ...newComment };
      } else {
        return { ...c };
      }
    });

    updateCard(board, card, "comments", data);
    setChanging({ [newComment.id]: false });
  };

  const deleteComment = (
    comments: { id: string; author: string; content: string }[] | undefined,
    id: string
  ) => {
    const data = comments ? comments.filter((c) => c.id !== id) : undefined;
    updateCard(board, card, "comments", data);
  };

  const deleteCard = () => {
    const cards = board.cards.filter((c) => c.id !== card.id);
    updateBoard(board, "cards", cards);
    setModalShow(false);
  }

  const handleClickOutside = (event: { target: any }) => {
    if (
      refDescription.current &&
      !refDescription.current.contains(event.target as Node)
    ) {
      setShowButtons(false);
    }
    if (
      refComment.current &&
      !refComment.current.contains(event.target as Node)
    ) {
      setComment(undefined);
      setShowButton(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refDescription, refComment]);

  // ---

  return (
    <Modal
      onHide={() => setModalShow(false)}
      show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="window">
        <Modal.Header closeButton>
          <div className="card-title">
            <div className="title">
              <img
                className="icon middle"
                src="./images/credit-card.svg"
                alt="card"
              />
              <Form.Control
                as="textarea"
                rows={1}
                defaultValue={card.title}
                onChange={(e) =>
                  updateCard(board, card, "title", e.target.value)
                }
              />
            </div>
            <div className="buttons">
              <Button variant="outline-secondary" onClick={deleteCard}>
                ?????????????? ????????????????
              </Button>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="card-about">
            ?? ?????????????? <span className="important-text">{board.title}</span>{" "}
            <br />
            ?????????? ???????????????? <span className="important-text">{card.author}</span>
          </div>
          <div className="card-actions" onFocus={() => setShowButtons(true)}>
            <div className="subtitle">
              <img
                className="icon middle"
                src="./images/align-left.svg"
                alt="actions"
              />
              ????????????????
            </div>
            <div ref={refDescription}>
              <Form.Control
                as="textarea"
                rows={4}
                defaultValue={card.description}
                placeholder="???????????????? ?????????? ?????????????????? ????????????????..."
                onChange={(e) => setCardDescription(e.target.value)}
              />
              {isShowButtons && (
                <div className="buttons">
                  <Button
                    onClick={() => {
                      updateCard(board, card, "description", cardDescription);
                      setShowButtons(false);
                    }}
                  >
                    ??????????????????
                  </Button>
                  <div
                    className="close-new-card"
                    onClick={() => setShowButtons(false)}
                  >
                    <img src="/images/x.svg" alt="close" />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="card-actions" onFocus={() => setShowButton(true)}>
            <div className="subtitle">
              <img
                className="icon middle"
                src="./images/list.svg"
                alt="actions"
              />
              ????????????????
            </div>
            <div ref={refComment}>
              <Form.Control
                as="textarea"
                rows={1}
                placeholder="???????????????? ??????????????????????"
                value={comment?.content || ""}
                onChange={(e) =>
                  setComment({
                    id: uuid(),
                    author: username,
                    content: e.target.value,
                  })
                }
              />
              {isShowButton && (
                <div className="buttons">
                  <Button onClick={() => addComment(card.comments, comment)}>
                    ??????????????????
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="card-actions">
            {card.comments && card.comments?.length > 0 && (
              <div className="subtitle">??????????????????????</div>
            )}
            {card.comments &&
              card.comments.map((comment) => (
                <div key={comment.id} className="card-comment">
                  <img
                    className="icon big"
                    src="./images/user.svg"
                    alt="user"
                  />
                  <div className="comment-container">
                    <span className="important-text">{comment.author}</span>
                    <div className="comment-content">
                      {isChanging[comment.id] ? (
                        <div>
                          <Form.Control
                            as="textarea"
                            rows={1}
                            defaultValue={comment.content}
                            onChange={(e) =>
                              setNewComment({
                                id: comment.id,
                                author: comment.author,
                                content: e.target.value,
                              })
                            }
                          />
                          <div className="buttons">
                            <Button
                              onClick={() =>
                                changeComment(card.comments, newComment)
                              }
                            >
                              ??????????????????
                            </Button>
                            <div
                              className="close-new-card"
                              onClick={() =>
                                setChanging({ [comment.id]: false })
                              }
                            >
                              <img src="/images/x.svg" alt="close" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        comment.content
                      )}
                    </div>
                    <div className="comment-reaction">
                      <span
                        className="link"
                        onClick={() => setChanging({ [comment.id]: true })}
                      >
                        ????????????????
                      </span>
                      <span> - </span>
                      <span
                        className="link"
                        onClick={() => deleteComment(card.comments, comment.id)}
                      >
                        ??????????????
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
