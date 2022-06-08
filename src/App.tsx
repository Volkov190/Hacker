import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
// import { Homepage } from './pages/HomePage';
import { NewsPage } from './pages/NewsPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/news" replace />}></Route>
        <Route path="/news" element={<NewsPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
