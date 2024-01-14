// AuthorList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddAuthor from './AddAuthor';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [expandedAuthorId, setExpandedAuthorId] = useState(null);
  const [showAddAuthorForm, setShowAddAuthorForm] = useState(false);
  const [authorBooks, setAuthorBooks] = useState([]);
  const [author, setAuthor] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get('http://localhost:3000/authors');
        setAuthors(response.data);
      } catch (error) {
        console.error('Error fetching author list:', error);
      }
    };

    fetchAuthors();
  }, []);

  const toggleAuthorDetails = async (authorId) => {
    try {
      setExpandedAuthorId((prevId) => (prevId === authorId ? null : authorId));

      if (expandedAuthorId !== authorId) {
        const authorResponse = await axios.get(`http://localhost:3000/authors/${authorId}`);
        setAuthor(authorResponse.data);

        const booksResponse = await axios.get(`http://localhost:3000/authors/${authorId}/books`);
        setAuthorBooks(booksResponse.data);

        setExpandedAuthorId(authorId);
      }
    } catch (error) {
      console.error('Error toggling author details:', error);
    }
  };

  const handleShowBookList = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <h1 className="book-list-title">Author List</h1>
      <button className="form-button" onClick={() => setShowAddAuthorForm(!showAddAuthorForm)}>
        {showAddAuthorForm ? 'Hide Add Author Form' : 'Add Author'}
      </button>
      {showAddAuthorForm && <AddAuthor setAuthors={setAuthors} setShowAddAuthorForm={setShowAddAuthorForm} />}
      <ul className="book-list">
        {authors.map((author) => (
          <li key={author.id} className="book-item">
            <div className="book-item-header" onClick={() => toggleAuthorDetails(author.id)}>
              <span className="book-item-name">{author.name}</span>
            </div>
            {expandedAuthorId === author.id && (
              <div className="book-details">
                <p>Bio: {author.bio}</p>
                <h5>Books by: {author.name}</h5>
                <ul>
                  {authorBooks.map((book) => (
                    <li key={book.id}>{book.title}</li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
      <button className="change-button" onClick={handleShowBookList}>
        Show Book List
      </button>
      <ToastContainer />
    </div>
  );
};

export default AuthorList;
