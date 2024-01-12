// src/components/AuthorList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AuthorList = () => {
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
    <div>
      <h2>Author List</h2>
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            <strong>{author.name}</strong> - {author.bio}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorList;
