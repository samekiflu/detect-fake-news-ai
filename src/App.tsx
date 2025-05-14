import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AlertProvider } from './context/AlertContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import HistoryPage from './pages/HistoryPage';
import ResourcesPage from './pages/ResourcesPage';

function App() {
  return (
    <AlertProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="resources" element={<ResourcesPage />} />
          </Route>
        </Routes>
      </Router>
    </AlertProvider>
  );
}

export default App;