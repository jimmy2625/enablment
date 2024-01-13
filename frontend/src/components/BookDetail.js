import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/books/${id}`);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{book.title}</h2>
      <p>{book.description}</p>
      <p>Published Year: {book.publishedYear}</p>
      <p>Stock Count: {book.stockCount}</p>
      <Link to={`/books/${id}/edit`}>Edit</Link>
      <button onClick={handleDelete} className="delete-button">Delete </button>
    </div>
  );
};

export default BookDetail;
