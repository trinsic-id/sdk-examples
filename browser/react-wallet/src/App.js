import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TrinsicLogo from './components/Icons/TrinsicLogo';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <>
      <Navbar className="bg-white shadow-md fixed w-full">
        <Navbar.Logo href="/#">
          <TrinsicLogo className="h-12" />
        </Navbar.Logo>
        <Navbar.List></Navbar.List>
      </Navbar>
      <div className="bg-gray-100">
        <BrowserRouter> 
          <Routes>
            <Route path="/" element={<LoginPage />} />
            
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
