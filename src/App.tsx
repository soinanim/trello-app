import React, {useState} from 'react';
import './App.css';

const App = () => {

    const [boards, setBoards] = useState([
        {id: 1, title: 'TODO', items: [{id: 1, title: 'create react app'},{id: 2, title: 'go to sleep'}]},
        {id: 2, title: 'In Progress', items: [{id: 0, title: ''}]},
        {id: 3, title: 'Testing', items: [{id: 0, title: ''}]},
        {id: 4, title: 'Done', items: [{id: 0, title: ''}]},
    ]);

    const [currentBoard, setCurrentBoard] = useState({
        id: 0,
        title: '',
        items: [{id: 0, title: ''}],
    });
    const [currentItem, setCurrentItem] = useState({
        id: 0,
        title: '',
    });

    function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
    }


    function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {

    }


    function dragStartHandler(e:  React.DragEvent<HTMLDivElement>, board: { id: number; title: string; items: { id: number; title: string; }[]; }, item: { id: number; title: string; }) {
        setCurrentBoard(board);
        setCurrentItem(item);
    }


    function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
    }


    function dropHandler(e: React.DragEvent<HTMLDivElement>, board: { id: number; title: string; items: { id: number; title: string; }[]; }, item: { id: number; title: string; }) {
        e.preventDefault();
        const currentIndex = currentBoard.items.indexOf(currentItem);
        currentBoard.items.splice(currentIndex, 1);
        const dropIndex = board.items.indexOf(item);
        board.items.splice(dropIndex + 1, 0, currentItem);
        // @ts-ignore
        setBoards(boards.map((b) => {
            if (b.id === board.id) {
                return board;
            }
        }))

    }

    return (
        <div className="app">
            {boards.map((board) => (
                <div className="board">
                    <div className="board-title">{board.title}</div>
                    {board.items.map((item) =>
                        <div className="item" draggable={true}
                             onDragOver={(e) => dragOverHandler(e)}
                             onDragLeave={(e) => dragLeaveHandler(e)}
                             onDragStart={(e) => dragStartHandler(e, board, item)}
                             onDragEnd={(e) => dragEndHandler(e)}
                             onDrop={(e) => dropHandler(e, board, item)}
                        >
                            {item.title}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default App;