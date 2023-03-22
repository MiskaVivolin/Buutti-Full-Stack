import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import "./App.css";

function Client() {

    const [bookList, setBookList] = useState([]);
    const [editedForm, setEditedForm] = useState(false);
    const [stateChanged, setStateChanged] = useState(false);
    const [book, setBook] = useState({
        title: "",
        author: "",
        description: "",
        id: "",
    });
    const [addBook, setAddBook] = useState({
        title: "",
        author: "",
        description: ""
    });

    useEffect(() => {
        axios.get("/books")
        .then((res) => {
            setBookList(res.data);
        })
        .catch((err) => console.log(err))
        if(editedForm){
            setStateChanged(true)
        }
    });

    const handleChange = (event) => {

        const {name, value} = event.target;
        setEditedForm(true)
        setBook(prevInput => {
            return {
                ...prevInput,
                [name]: value
            };
        })
        setAddBook(prevInput => {
            return {
                ...prevInput,
                [name]: value
            };
        })
    }

    const handleClickAdd = (event) => {
        event.preventDefault();
        if(addBook.title === "") {
            addBook.title = book.title
        }
        if(addBook.author === "") {
            addBook.author = book.author
        }
        if(addBook.description === "") {
            addBook.description = book.description
        }
        axios
            .post('/books', addBook)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        setBook({
            title: "",
            author: "",
            description: "",
            id: "",
        })
        setEditedForm(false)
        setStateChanged(false)
    }

    const handleClickEdit = (event) => {
        event.preventDefault();
        axios
            .put('/books', book)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        setBook({
            title: "",
            author: "",
            description: "",
            id: "",
        })
        setEditedForm(false)
        setStateChanged(false)
    }

    const handleClickDelete = (event) => {
        event.preventDefault();
        axios
            .delete(`/books/${book.id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        setBook({
            title: "",
            author: "",
            description: "",
            id: "",
        })
        setEditedForm(false)
        setStateChanged(false)
    }

    const selectDisabled = (id) => {
        if (id === book.id){
            return true
        } else {
            return false
        }
    }

    const deleteDisabled = () => {
        if(!editedForm && stateChanged){
            return false
        } else {
            return true
        }
    }

    return (
        <div class="appContainer">
            
            <form class="formContainer">
                <label>
                    Title: <br/>
                    <input type="text" value={book.title} onChange={handleChange} name="title"/>
                </label>
                <label>
                    Author: <br/>
                    <input type="text" value={book.author} onChange={handleChange} name="author"/>
                </label>
                <label>
                    Description: <br/>
                    <textarea class="descriptionInputField" type="textarea" value={book.description} onChange={handleChange} name="description"/>
                </label>
                <div class="buttonContainer">
                    <button disabled={!editedForm} onClick={handleClickAdd}>Save New</button>
                    <button disabled={!editedForm} onClick={handleClickEdit}>Save</button>
                    <button disabled={deleteDisabled()} onClick={handleClickDelete}>Delete</button>
                    <button disabled={!stateChanged}>Cancel</button>
                </div>
            </form>
            
            {bookList ? (
                <div class="bookListContainer">
                    {bookList.map(book => {
                        return (
                            <div class="bookContainer">
                                <div class="bookInfoContainer">
                                    <p>{book.title}</p>
                                    <p>{book.author}</p>
                                </div>
                                <button 
                                disabled={selectDisabled(book.id)}
                                onClick={() => {
                                    setStateChanged(true)
                                    setEditedForm(false)
                                    setBook({
                                        title: book.title,
                                        author: book.author,
                                        description: book.description,
                                        id: book.id
                                    })
                                }}>
                                    Select book
                                </button>
                            </div>
                        )
                    })}
                </div>
            ) : ""}
        </div>
    )
}

export default Client;