import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NewsPage } from './pages/NewsPage';
import { PeaceOfNewsPage } from './pages/PeaceOfNewsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  background-color: #d5e2ed;
  min-height: 100%;
  padding: 20px;
  padding-top: 40px;
`;

function App() {
  return (
    <Wrapper>
      <Routes>
        <Route path="/" element={<Navigate to="/news" replace />}></Route>
        <Route path="/news" element={<NewsPage />}></Route>
        <Route path="/news/:newsId" element={<PeaceOfNewsPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </Wrapper>
  );
}

export default App;
