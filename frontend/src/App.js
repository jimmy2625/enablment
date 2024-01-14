// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import AuthorList from './components/AuthorList';
import ApolloAppProvider from './ApolloProvider';

const App = () => {
  return (
    <ApolloAppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/authors" element={<AuthorList />} />
        </Routes>
      </Router>
    </ApolloAppProvider>
  );
};

export default App;
