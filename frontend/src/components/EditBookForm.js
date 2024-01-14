// src/components/EditBookForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './styles.css';

const EditBookForm = ({ bookId, onClose, onUpdate }) => {
  const [book, setBook] = useState({
    title: '',
    authorId: '',
    description: '',
    publishedYear: '',
    stockCount: '',
  });

  const [isFormVisible, setIsFormVisible] = useState(true);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookResponse = await axios.get(`http://localhost:3000/books/${bookId}`);
        const authorsResponse = await axios.get('http://localhost:3000/authors');

        setBook(bookResponse.data);
        setAuthors(authorsResponse.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newValue =
    (name === 'publishedYear' || name === 'stockCount' || name === 'authorId') && value !== ''
    ? parseInt(value, 10)
    : value;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: newValue,
    }));
  };

  const handleEditBook = async () => {
    try {
      await axios.put(`http://localhost:3000/books/${bookId}`, book);

      onUpdate();
      onClose();

      setIsFormVisible(false);

      toast.success('A book has been edited!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: true
      });
    } catch (error) {
      console.error('Error editing book:', error);
    }
  };

  const handleCancel = () => {
    onClose();
    setIsFormVisible(false);
  };

  return (
    <>
      {isFormVisible && (
        <div className="book-container">
          <h3>Edit Book</h3>
          <form className="book-form">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
            />

            <label>Author:</label>
            <select
              name="authorId"
              value={book.authorId}
              onChange={handleChange}
            >
              <option value="">Select an Author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>

            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={book.description}
              onChange={handleChange}
            />

            <label>Published Year:</label>
            <input
              type="number"
              name="publishedYear"
              value={book.publishedYear}
              onChange={handleChange}
            />

            <label>Stock Count:</label>
            <input
              type="number"
              name="stockCount"
              value={book.stockCount}
              onChange={handleChange}
            />

            <button type="button" className="save-changes-button" onClick={handleEditBook} >
              Save Changes
            </button>
            <button type="button" className="delete-button" onClick={handleCancel} >
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditBookForm;
