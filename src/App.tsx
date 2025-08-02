import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddTaskPage from './pages/AddTaskPage';

function App() {

  return (
    <>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddTaskPage />} />
        </Routes>
    </>
  )
}

export default App
