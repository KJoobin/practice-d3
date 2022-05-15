import React from 'react';

import {
  Routes,
  Route,
  Link,
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import BarPage from './pages/BarPage';

function App() {
  return (
    <div>
      <header>
        <h1>
          <Link to="/">
            Home
          </Link>
        </h1>
      </header>
      <Routes>
        <Route path="/bar" element={<BarPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
