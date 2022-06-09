import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
// import { Homepage } from './pages/HomePage';
import { NewsPage } from './pages/NewsPage';
import { PeaceOfNewsPage } from './pages/PeaceOfNewsPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/news" replace />}></Route>
        <Route path="/news" element={<NewsPage />}></Route>
        <Route path="/news/:newsId" element={<PeaceOfNewsPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
