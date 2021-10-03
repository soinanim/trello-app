import React, {useState, useEffect, useCallback} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import ModalWelcome from "./ModalWelcome";
import Board from "./Board";

const Boards = () => {

    const [boards, setBoards] = useState<{
        id: number;
        title: string;
        cards: { id: number, title: string, description?: string,
            comments?: {id: number, author: string, content: string}[]
        }[];
    }[]>(JSON.parse(localStorage.getItem('boards') as string) || [
        {id: 1, title: "TODO", cards: []},
        { id: 2, title: "In Progress", cards: [] },
        { id: 3, title: "Testing", cards: [] },
        { id: 4, title: "Done", cards: [] },
    ]);
    const [userName, setUserName] = useState<string>('');

    const updateBoard = useCallback((board, key: string, value) => {
        // for board title:
        // setBoard((b) => {
        //     console.log(b);
        //     if (b.id !== board.id) {
        //         return;
        //     }
        //     return ({
        //         ...board,
        //         [key]: value,
        //     })
        // })
        setBoards((boards) => {
            let data;
            if (key === 'add card') {
                data = boards.map((b) => (b.id === board.id)
                    ? ({
                        ...b,
                        cards: [...b.cards, { id: b.cards.length + 1, title: value, description: '' }],
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
    },[]);

    const updateUserName = useCallback((value) => {
        setUserName(value);
    }, []);



    useEffect(() => {
        // localStorage.clear();
        localStorage.setItem('boards', JSON.stringify(boards));
    }, [boards]);

    // useEffect(() => {
    //     setBoards(() => {
    //         return [...boards, {...board}]
    //     })
    // }, [boards, board]);


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