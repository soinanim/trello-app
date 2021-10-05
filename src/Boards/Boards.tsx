import React, {useState, useEffect, useCallback} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalWelcome from "../Modals/ModalWelcome";
import Board from "./Board";
import { v4 as uuid } from 'uuid';

const Boards = () => {

    const [userName, setUserName] = useState<string>(localStorage.getItem('userName') as string || '');
    const [boards, setBoards] = useState<{
        id: string;
        title: string;
        cards: { id: string, title: string, author: string, description?: string,
            comments?: {id: string, author: string, content: string}[]
        }[];
    }[]>(JSON.parse(localStorage.getItem('boards') as string) || [
        {id: uuid(), title: "TODO", cards: []},
        { id: uuid(), title: "In Progress", cards: [] },
        { id: uuid(), title: "Testing", cards: [] },
        { id: uuid(), title: "Done", cards: [] },
    ]);

    const updateBoard = useCallback((board, key: string, value) => {
        setBoards((boards) => {
            let data;

            if (key === 'add card') {
                data = boards.map((b) => (b.id === board.id)
                    ? ({
                        ...b,
                        cards: [...b.cards, { id: uuid(), title: value, author:  userName }],
                    })
                    : {...b}
                );
            } else {
                data = boards.map((b) => (b.id === board.id)
                    ? ({
                        ...board,
                        [key]: value,
                    })
                    : {...b}
                );
            }

            localStorage.setItem('boards', JSON.stringify(data));
            return data;
        });
    },[userName]);

    const updateUserName = useCallback((value) => {
        setUserName(value);
    }, []);

    useEffect(() => {
        localStorage.setItem('boards', JSON.stringify(boards));
    }, [boards]);

    // ---

    return (
        <>
            <ModalWelcome userName={userName} updateUserName={updateUserName} />
            <div className="boards">
                {boards.map((board) => (
                    <Board userName={userName} board={board} updateBoard={updateBoard} />
                ))}
            </div>
        </>
    );
}

export default Boards;