import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const AddBook = ({ setBooks, setShowAddBookForm }) => {
  const [newBook, setNewBook] = useState({
    title: '',
    authorId: '',
    description: '',
    publishedYear: '',
    stockCount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert publishedYear and stockCount to numbers if they are not empty
    const newValue =
      (name === 'publishedYear' || name === 'stockCount' || name === 'authorId') && value !== ''
        ? parseInt(value, 10)
        : value;

    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: newValue,
    }));
  };

  const handleAddBook = async () => {
    try {
      // Add the new book
      await axios.post('http://localhost:3000/books', newBook);

      // Fetch the updated list of books
      const response = await axios.get('http://localhost:3000/books');

      // Update the state in the parent component with the new list of books
      setBooks(response.data);

      setShowAddBookForm(false);

      console.log('Book added successfully!');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const [authors, setAuthors] = useState([]);

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

  return (
    <div className="book-container">
      <form className="book-form">
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={newBook.title}
          onChange={handleChange}
          required
        />

        <select name="authorId" value={newBook.authorId} onChange={handleChange}>
          <option value="">Select an Author</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newBook.description}
          onChange={handleChange}
        />

        <input
          type="number"
          min="1"
          name="publishedYear"
          placeholder="Year Published"
          value={newBook.publishedYear}
          onChange={handleChange}
        />

        <input
          type="number"
          name="stockCount"
          placeholder="Stock Count"
          value={newBook.stockCount}
          onChange={handleChange}
        />

        <button type="button" onClick={handleAddBook}>
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
