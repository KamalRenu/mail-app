import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import ComposeMail from './components/ComposeMail';
import SingleMail from './components/SingleMail';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/compose" element={<ComposeMail />} />
      <Route path="/single-mail/:id" element={<SingleMail />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;