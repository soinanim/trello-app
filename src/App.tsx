import React, {useState} from 'react';
import './App.css';

const App = () => {

    const [boards, setBoards] = useState<({id: number, title: string, items: {id: number, title: string}[]})[]>([
        {id: 1, title: 'TODO', items: [{id: 1, title: 'create react app'},{id: 2, title: 'go to sleep'}]},
        {id: 2, title: 'In Progress', items: []},
        {id: 3, title: 'Testing', items: []},
        {id: 4, title: 'Done', items: []},
    ]);


    function changeTitle(board: { id: number; title: string; items: { id: number; title: string }[] } | { id: number; title: string; items?: undefined }, e: React.ChangeEvent<HTMLInputElement>) {
        // setBoards((boards) => {
        //     return boards.map((b) => (b.id === board.id)
        //         ? ({
        //             ...boards,
        //             title: e.target.value,
        //         })
        //         : {...boards}
        //     );
        // })
    }

    function addItem() {
        // setState, board.items.push()
    }

    return (
        <div className="app">
            {boards.map((board) => (
                <div className="board">
                    <div className="board-title">
                        <input key={board.id} type="text" defaultValue={board.title} onChange={(e) => changeTitle(board, e)}/>
                    </div>
                    {board.items.map((item) =>
                        <div className="item">{item.title}</div>
                    )}
                    {board.items.length > 0 &&
                        <div className="add-item" onClick={addItem}>
                            <img src="/images/plus.svg" alt="add card"/>
                            Добавить карточку
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}

export default App;