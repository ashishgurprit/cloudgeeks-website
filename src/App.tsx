import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import GTSPage from './components/GTSPage';
import CookieConsent from './components/CookieConsent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gts" element={<GTSPage />} />
      </Routes>
      <CookieConsent />
    </Router>
  );
}

export default App;
