import './App.css';
import { initializeApp } from 'firebase/app';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Header from './components/Header';
import Home from './pages/Home';
import ProtectedRoute from './utils/ProtectedRoute';
import AppContext from './context/AppContext';

const app = initializeApp({
  // Firebase things
})

function App() {
  return (
    <Router>
      <AppContext.Provider value={app}>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        </Routes>
      </AppContext.Provider>
    </Router>
  );
}

export default App;
