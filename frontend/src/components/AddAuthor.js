// AddAuthor.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const AddAuthor = ({ setAuthors, setShowAddAuthorForm }) => {
  const [newAuthor, setNewAuthor] = useState({
    name: '',
    bio: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAuthor((prevAuthor) => ({
      ...prevAuthor,
      [name]: value,
    }));
  };

  const handleAddAuthor = async () => {
    try {
      // Add the new author
      await axios.post('http://localhost:3000/authors', newAuthor);

      // Fetch the updated list of authors
      const response = await axios.get('http://localhost:3000/authors');

      // Update the state in the parent component with the new list of authors
      setAuthors(response.data);

      setShowAddAuthorForm(false);

      console.log('Author added successfully!');
    } catch (error) {
      console.error('Error adding author:', error);
    }
  };

  return (
    <div className="book-container">
      <form className="book-form">
        <input
          type="text"
          name="name"
          placeholder="Author Name"
          value={newAuthor.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="bio"
          placeholder="Author Bio"
          value={newAuthor.bio}
          onChange={handleChange}
        />

        <button type="button" className="save-changes-button" onClick={handleAddAuthor}>
          Add Author
        </button>
      </form>
    </div>
  );
};

export default AddAuthor;
