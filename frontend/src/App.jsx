import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroList from './components/HeroList';
import HeroDetail from './components/HeroDetail';
import { ToastProvider } from './components/ToastContext';

function App() {
  return (
    <ToastProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HeroList />} />
          <Route path="/marvel" element={<HeroList />} />
          <Route path="/dc" element={<HeroList />} />
          <Route path="/hero/:id" element={<HeroDetail />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
