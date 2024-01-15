import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import AuthorList from './components/AuthorList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/authors" element={<AuthorList />} />
      </Routes>
    </Router>
  );
};

export default App;
