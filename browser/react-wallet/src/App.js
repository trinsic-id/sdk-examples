import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TrinsicLogo from './components/Icons/TrinsicLogo';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <BrowserRouter> 
        <Navbar>
          <Navbar.Logo href="/#">
            <TrinsicLogo className="h-12" />
          </Navbar.Logo>
          <Navbar.List></Navbar.List>
        </Navbar>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
