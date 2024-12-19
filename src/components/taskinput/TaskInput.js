import React, { useState } from 'react'
import './mainInput.css'
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

export default function TaskInput() {

    const [isCompletrScreen, setCompleteScreen] = useState(false);
    const [allTodos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");


    const handlrAddToDo = () => {
        let newToDoItems = {
            title: newTitle,
            description: newDescription,
            isComplete: false
        }

        let updateToArr = [...allTodos];
        updateToArr.push(newToDoItems);
        setTodos(updateToArr);

        setNewTitle('');
        setNewDescription('');
    }

    const completedTask = allTodos.filter((item, index) => {
        return item.isComplete === true;
    });


    return (
        <>
            <h1>My Todos</h1>
            <div className="todo-wrapper">
                <div className="todo-input">
                    <div className="todo-input-items">
                        <label htmlFor="title">Tite</label>
                        <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Whats the task title ?" />
                    </div>
                    <div className="todo-input-items">
                        <label htmlFor="description">Description</label>
                        <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Enter description" />
                    </div>
                    <div className="todo-input-items">
                        <button type='button' className='primaryBtn' onClick={handlrAddToDo}>Add</button>
                    </div>
                </div>

                <div className="btn-area">
                    <button className={`secondaryBtn ${isCompletrScreen === false && 'active'}`} onClick={() => setCompleteScreen(false)}>todo</button>
                    <button className={`secondaryBtn ${isCompletrScreen === true && 'active'}`} onClick={() => setCompleteScreen(true)} >completed</button>
                </div>

                <div className={`"todo-list"  ${!isCompletrScreen ? '' : 'd-none'}`}>
                    {allTodos.map((item, index) => {
                        return (
                            <div className='todo-list-item' key={index}>
                                <div>
                                    <h3>
                                        {item.title}
                                    </h3>
                                    <p>
                                        {item.description}
                                    </p>
                                </div>
                                <div className='svg-icons'>
                                    <BsCheckLg className='check-icon' onClick={(e) => {
                                        item.isComplete = true;
                                        e.currentTarget.closest('.todo-list-item').remove();
                                    }} />
                                    <AiOutlineDelete className='icon' onClick={(e) => {
                                        e.currentTarget.closest('.todo-list-item').remove();
                                    }} />
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className={`completedTask ${isCompletrScreen ? '' : 'd-none'}`}>
                    {completedTask.map((item, index) => {
                        return (
                            <div className='todo-list-item' key={index}>
                                <div className='taskDetails'>
                                    <h3>
                                        {item.title}
                                    </h3>
                                    <p>
                                        {item.description}
                                    </p>
                                </div>
                                <div>
                                    <BsCheckLg className='check-icon' onClick={(e) => {
                                    }} />
                                    <AiOutlineDelete className='icon' onClick={(e) => {
                                        e.currentTarget.closest('.todo-list-item').remove();
                                    }} />
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </>
    )
}
