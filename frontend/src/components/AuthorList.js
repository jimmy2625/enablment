// AuthorList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddAuthor from './AddAuthor';
import Swal from 'sweetalert2'; 
import { toast, ToastContainer } from 'react-toastify';
import EditAuthorForm from './EditAuthorForm';

import './styles.css';

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [expandedAuthorId, setExpandedAuthorId] = useState(null);
  const [showAddAuthorForm, setShowAddAuthorForm] = useState(false);
  const [showEditAuthorForm, setShowEditAuthorForm] = useState(false);
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);

  const navigate = useNavigate();

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
      const result = await Swal.fire({
        title: 'Are you sure you want to delete the author and all the books assigned to that author?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#007bff',
        confirmButtonText: 'Yes, delete it!',
        confirmButtonColor: '#ff0800',
      });
  
      if (result.isConfirmed) {
        try {
          // Fetch the author to get associated books
          const authorResponse = await axios.get(`http://localhost:3000/authors/${authorId}`);
          const author = authorResponse.data;
      
          if (author.books.length > 0) {
            // Delete all books associated with the author
            await Promise.all(
              author.books.map(async (book) => {
                await axios.delete(`http://localhost:3000/books/${book.id}`);
              })
            );
          }
      
          // After deleting books, delete the author
          await axios.delete(`http://localhost:3000/authors/${authorId}`);
      
          // Update the state to remove the author and collapse details
          setAuthors((prevAuthors) => prevAuthors.filter((author) => author.id !== authorId));
          setExpandedAuthorId(null);

          toast.success('Author and associated books has been deleted!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            hideProgressBar: true
          });
        } catch (error) {
          console.error('Error deleting author and associated books:', error);
        }
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
      <button className="change-button" onClick={handleShowBookList}>
        Show Book List
      </button>
      <ToastContainer />
    </div>
  );
};

export default AuthorList;
