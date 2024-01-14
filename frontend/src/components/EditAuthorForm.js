// EditAuthorForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditAuthorForm = ({ authorId, onClose, onUpdate }) => {
  const [author, setAuthor] = useState({
    name: '',
    bio: '',
  });

  const [isFormVisible, setIsFormVisible] = useState(true);

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/authors/${authorId}`);
        setAuthor(response.data);
      } catch (error) {
        console.error('Error fetching author details:', error);
      }
    };

    fetchAuthorDetails();
  }, [authorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor((prevAuthor) => ({
      ...prevAuthor,
      [name]: value,
    }));
  };

  const handleEditAuthor = async () => {
    try {
      await axios.put(`http://localhost:3000/authors/${author.id}`, {
        name: author.name,
        bio: author.bio,
      });
  
      onUpdate();
      onClose();
      setIsFormVisible(false);

      toast.success('An author has been edited!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: true
      });
    } catch (error) {
      console.error('Error editing author:', error.response || error.message || error);
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
          <h2>Edit Author</h2>
          <form className="book-form">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={author.name}
              onChange={handleChange}
            />

            <label>Bio:</label>
            <textarea
              name="bio"
              value={author.bio}
              onChange={handleChange}
            />

            <button type="button" className="save-changes-button" onClick={handleEditAuthor}>
              Save Changes
            </button>
            <button type="button" className="delete-button" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditAuthorForm;
