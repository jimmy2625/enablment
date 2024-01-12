// src/components/BookForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [stockCount, setStockCount] = useState('');
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');

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

  useEffect(() => {
    if (id) {
      const fetchBookDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/books/${id}`);
          const bookDetails = response.data;
          setTitle(bookDetails.title);
          setDescription(bookDetails.description);
          setPublishedYear(bookDetails.publishedYear);
          setStockCount(bookDetails.stockCount);
          setSelectedAuthor(bookDetails.authorId.toString());
        } catch (error) {
          console.error('Error fetching book details:', error);
        }
      };

      fetchBookDetails();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
      publishedYear,
      stockCount,
      authorId: selectedAuthor,
    };

    console.log('Form Data:', data); // Log form data for debugging

    try {
      if (id) {
        await axios.put(`http://localhost:3000/books/${id}`, data);
      } else {
        await axios.post('http://localhost:3000/books', data);
      }

      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Book' : 'Add Book'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Published Year:
          <input
            type="number"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
          />
        </label>
        <br />
        <label>
          Stock Count:
          <input
            type="number"
            value={stockCount}
            onChange={(e) => setStockCount(e.target.value)}
          />
        </label>
        <br />
        <label>
          Author:
          <select value={selectedAuthor} onChange={(e) => setSelectedAuthor(e.target.value)}>
            <option value="">Select an author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">{id ? 'Update Book' : 'Add Book'}</button>
      </form>
    </div>
  );
};

export default BookForm;
