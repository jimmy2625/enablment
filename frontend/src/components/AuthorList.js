import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddAuthor from './AddAuthor';
import EditAuthorForm from './EditAuthorForm';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import './styles.css';

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [expandedAuthorId, setExpandedAuthorId] = useState(null);
  const [showAddAuthorForm, setShowAddAuthorForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [books, setBooks] = useState([]);
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
        const author = authorResponse.data;
  
        setExpandedAuthorId(authorId);
        setAuthor(author); // Set the author details
  
        const booksResponse = await axios.get(`http://localhost:3000/books?authorId=${authorId}`);
        const authorBooks = booksResponse.data;
  
        setBooks(authorBooks);
      }
    } catch (error) {
      console.error('Error toggling author details:', error);
    }
  };
  
  const handleEditAuthor = () => {
    setShowEditForm(true);
  };

  const handleUpdateAuthor = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/authors/${expandedAuthorId}`);
      const updatedAuthor = response.data;

      setAuthors((prevAuthors) =>
        prevAuthors.map((author) => (author.id === updatedAuthor.id ? updatedAuthor : author))
      );

      const booksResponse = await axios.get(`http://localhost:3000/books?authorId=${expandedAuthorId}`);
      const updatedAuthorBooks = booksResponse.data;
      setBooks(updatedAuthorBooks);
    } catch (error) {
      console.error('Error updating author details', error);
    }
  };

  const handleDeleteAuthor = async (authorId) => {
    const result = await Swal.fire({
      title: 'Are you sure you want to delete the author?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#007bff',
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#ff0800',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/authors/${authorId}`);
        setAuthors((prevAuthors) => prevAuthors.filter((author) => author.id !== authorId));

        toast.success('Author has been deleted!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          hideProgressBar: true,
        });
      } catch (error) {
        console.error('Error deleting author', error);
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
      <ul className="book-list">
        {authors.map((author) => (
          <li key={author.id} className="book-item">
            <div className="book-item-header" onClick={() => toggleAuthorDetails(author.id)}>
              <span className="book-item-title">{author.name}</span>
            </div>
            {expandedAuthorId === author.id && (
              <div className="book-details">
                <p>Bio: {author.bio}</p>
                <h3>List of Books:</h3>
                <ul style={{ margin: '15px 0' }}>
                  {books
                    .filter((book) => book.authorId === expandedAuthorId)
                    .map((book) => (
                      <li key={book.id}>
                        <strong>{book.title}</strong> - Published Year: {book.publishedYear}
                      </li>
                    ))}
                </ul>
                <div>
                  <button className="form-button" onClick={() => handleEditAuthor(author.id)}>Edit Author</button>
                  <button className="delete-button" onClick={() => handleDeleteAuthor(author.id)}>Delete Author</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      {showEditForm && (
        <EditAuthorForm
          authorId={expandedAuthorId}
          onClose={() => setShowEditForm(false)}
          onUpdate={handleUpdateAuthor}
        />
      )}
      <button className="change-button" onClick={handleShowBookList}>
        Show Book List
      </button>
      <ToastContainer />
    </div>
  );
};

export default AuthorList;
