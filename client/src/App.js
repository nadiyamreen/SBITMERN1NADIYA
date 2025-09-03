// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import LogIn from './components/LogIn';
import Registration from './components/Registration';
import SearchProduct from './components/SearchProduct';

function App() {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<SearchProduct />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/search" element={<SearchProduct />} />
      </Routes>
    </Router>
  );
}

export default App;