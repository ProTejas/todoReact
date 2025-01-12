import React, { useEffect, useState } from 'react'
import './mainInput.css'
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { account, databases } from '../apiFolder/api';
import { Query } from 'appwrite';

export default function TaskInput() {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const [isCompletrScreen, setCompleteScreen] = useState(false);
    const [allTodos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");

    useEffect(() => {
        isLogined().then(() => {
            viewTodos();
        });
    }, []);

    const handlrAddToDo = async () => {


        if (newTitle === '') {
            alert('Please enter a todo');
        } else {
            try {
                let newToDoItems = {
                    title: newTitle,
                    description: newDescription,
                    isComplete: false
                }

                let updateToArr = [...allTodos];
                updateToArr.push(newToDoItems);

                let newTodo = await databases.createDocument(
                    process.env.REACT_APP_DB_ID,
                    process.env.REACT_APP_COLLECTION_ID,
                    'unique()',
                    { email: email, title: newToDoItems.title, descriptipon: newToDoItems.description }
                );
                console.log(newTodo);

                setNewTitle('');
                setNewDescription('');

                viewTodos(); // Refresh the todo list
            } catch (error) {
                console.error('Failed to add todo:', error);
            }
        }
    }

    const isLogined = async () => {
        try {
            let logInDetails = await account.get();
            setEmail(logInDetails.email);
            setName(logInDetails.name);
            viewTodos();
        } catch (error) {
            navigate('/log-in');
        }
    };
    const handleLogOut = async () => {
        try {
            await account.deleteSession('current');
            navigate('/log-in');
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    const completedTask = allTodos.filter((item, index) => {
        return item.isComplete === true;
    });


    const viewTodos = async () => {
        try {
            let todos = await databases.listDocuments(
                process.env.REACT_APP_DB_ID,
                process.env.REACT_APP_COLLECTION_ID,
                [Query.equal('email', email)]
            );
            setTodos(todos.documents);
        } catch (error) {
            console.error('Failed to fetch todos:', error);
        }
    };

    return (
        <>
            <div className="topContainer">
                <h1>{name} Todos</h1>
                <div className="logoutBtn">
                    <button onClick={handleLogOut} className="logoutBtn">Logout</button>
                </div>
            </div>
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
