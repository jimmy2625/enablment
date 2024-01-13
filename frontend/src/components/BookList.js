// BookList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditBookForm from './EditBookForm';
import AddBook from './AddBook'
import './styles.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [expandedBookId, setExpandedBookId] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddBookForm, setShowAddBookForm] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get('http://localhost:3000/books');
      setBooks(response.data);
    };

    fetchBooks();
  }, []);

  const toggleDetails = (bookId) => {
    setExpandedBookId((prevId) => (prevId === bookId ? null : bookId));
  };

  const handleEdit = (bookId) => {
    setExpandedBookId(bookId);
    setShowEditForm(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.get('http://localhost:3000/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error updating book list', error);
    }
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:3000/books/${bookId}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error('Error deleting book', error);
    }
  };

  return (
    <div className="container">
      <h1 className="book-list-title">Book List</h1>
      <button className="form-button" onClick={() => setShowAddBookForm(!showAddBookForm)}>
        {showAddBookForm ? 'Hide Add Book Form' : 'Add Book'}
      </button>

      {showAddBookForm  && <AddBook setBooks={setBooks} setShowAddBookForm={setShowAddBookForm}/>}
      <ul className="book-list">
        {books.map((book) => (
          <li key={book.id} className="book-item">
            <div className="book-item-header" onClick={() => toggleDetails(book.id)}>
              <span className="book-item-title">{book.title}</span>
            </div>
            {expandedBookId === book.id && (
              <div className="book-details">
                <p>{book.description}</p>
                <p>Published Year: {book.publishedYear}</p>
                <p>Stock Count: {book.stockCount}</p>
                
                <div className="book-details-buttons">
                  <button onClick={() => handleEdit(book.id)}>Edit</button>
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
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
    </div>
  );
};

export default BookList;
