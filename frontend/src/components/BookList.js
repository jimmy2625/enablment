// BookList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditBookForm from './EditBookForm';
import AddBook from './AddBook';
import Swal from 'sweetalert2'; 
import { toast, ToastContainer } from 'react-toastify';
import './styles.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [author, setAuthor] = useState(null);
  const [expandedBookId, setExpandedBookId] = useState(null); 
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching book list:', error);
      }
    };

    fetchBooks();
  }, []);

  const toggleDetails = async (bookId) => {
    try {
      setExpandedBookId((prevId) => (prevId === bookId ? null : bookId));

      if (expandedBookId !== bookId) {
        const book = books.find((book) => book.id === bookId);
        setExpandedBookId(bookId);

        const authorResponse = await axios.get(`http://localhost:3000/authors/${book.authorId}`);
        setAuthor(authorResponse.data);
      }
    } catch (error) {
      console.error('Error toggling book details:', error);
    }
  };

  const handleEdit = () => {
    setShowEditForm(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/books/${expandedBookId}`);
      const updatedBook = response.data;
  
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
      );
  
      const authorResponse = await axios.get(`http://localhost:3000/authors/${updatedBook.authorId}`);
      setAuthor(authorResponse.data);
    } catch (error) {
      console.error('Error updating book details', error);
    }
  };

  const handleDelete = async (bookId) => {
    const result = await Swal.fire({
      title: 'Are you sure you want to delete the book?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#007bff',
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#ff0800',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/books/${bookId}`);
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));

        toast.success('Book has been deleted!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          hideProgressBar: true
        });
      } catch (error) {
        console.error('Error deleting book', error);
      }
    }
  };

  const handleShowAuthorList = () => {
    navigate('/authors');
  };

  return (
    <div className="container">
      <h1 className="book-list-title">Book List</h1>
      <button className="form-button" onClick={() => setShowAddBookForm(!showAddBookForm)}>
        {showAddBookForm ? 'Hide Add Book Form' : 'Add Book'}
      </button>
      {showAddBookForm && <AddBook setBooks={setBooks} setShowAddBookForm={setShowAddBookForm} />}
      <ul className="book-list">
        {books.map((book) => (
          <li key={book.id} className="book-item">
            <div className="book-item-header" onClick={() => toggleDetails(book.id)}>
              <span className="book-item-title">{book.title}</span>
            </div>
            {expandedBookId === book.id && (
              <div className="book-details">
                <p>Description: {book.description}</p>
                {author && <p>Author: {author.name}</p>}
                <p>Published Year: {book.publishedYear}</p>
                <p>Stock Count: {book.stockCount}</p>
                <div>
                  <button className="form-button" onClick={() => handleEdit(book.id)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(book.id)} >Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      {showEditForm && (
        <EditBookForm
          bookId={expandedBookId}
          onClose={() => setShowEditForm(false)}
          onUpdate={handleUpdate}
        />
      )}
      <button className="change-button" onClick={handleShowAuthorList}>
        Show Author List
      </button>
      <ToastContainer />
    </div>
  );
};

export default BookList;
