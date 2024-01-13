// AuthorList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddAuthor from './AddAuthor';
import EditAuthorForm from './EditAuthorForm';
import './styles.css';

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [expandedAuthorId, setExpandedAuthorId] = useState(null);
  const [showAddAuthorForm, setShowAddAuthorForm] = useState(false);
  const [showEditAuthorForm, setShowEditAuthorForm] = useState(false);
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get('http://localhost:3000/authors');
        setAuthors(response.data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    fetchAuthors();
  }, []);

  const toggleAuthorDetails = (authorId) => {
    setExpandedAuthorId((prevId) => (prevId === authorId ? null : authorId));
  };

  const handleEditAuthor = (authorId) => {
    setSelectedAuthorId(authorId);
    setShowEditAuthorForm(true);
  };

  const handleUpdateAuthor = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/authors/${selectedAuthorId}`);
      const updatedAuthor = response.data;
  
      setAuthors((prevAuthors) =>
        prevAuthors.map((author) => (author.id === updatedAuthor.id ? updatedAuthor : author))
      );
    } catch (error) {
      console.error('Error updating author details', error);
    }
  };

  const handleDeleteAuthor = async (authorId) => {
    try {
      // Fetch the author to check for associated books
      const authorResponse = await axios.get(`http://localhost:3000/authors/${authorId}`);
      const author = authorResponse.data;

      if (author.books.length > 0) {
        // Author has associated books, handle deletion accordingly
        console.log('Author has associated books. Perform appropriate actions.');
      } else {
        // Author has no associated books, proceed with deletion
        await axios.delete(`http://localhost:3000/authors/${authorId}`);
        setAuthors((prevAuthors) => prevAuthors.filter((author) => author.id !== authorId));
        setExpandedAuthorId(null); // Collapse details after deleting an author
      }
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="book-list-title">Author List</h1>
      <button className="form-button" onClick={() => setShowAddAuthorForm(!showAddAuthorForm)}>
        {showAddAuthorForm ? 'Hide Add Author Form' : 'Add Author'}
      </button>
      {showAddAuthorForm && <AddAuthor setAuthors={setAuthors} setShowAddAuthorForm={setShowAddAuthorForm} />}
      {showEditAuthorForm && (
        <EditAuthorForm
          authorId={selectedAuthorId}
          onClose={() => setShowEditAuthorForm(false)}
          onUpdate={handleUpdateAuthor}
        />
      )}
      <ul className="book-list">
        {authors.map((author) => (
          <li key={author.id} className="book-item">
            <div className="book-item-header" onClick={() => toggleAuthorDetails(author.id)}>
              <span className="book-item-title">{author.name}</span>
            </div>
            {expandedAuthorId === author.id && (
              <div className="book-details">
                <p>{author.bio}</p>
                <h3>Books by {author.name}</h3>
                <ul>
                  {author.books.map((book) => (
                    <li key={book.id}>
                      <p>Title: {book.title}</p>
                      <p>Published Year: {book.publishedYear}</p>
                    </li>
                  ))}
                </ul>
                <div className="author-buttons">
                  <button className="form-button" onClick={() => handleEditAuthor(author.id)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDeleteAuthor(author.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorList;
