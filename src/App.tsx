import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddTaskPage from './pages/AddTaskPage';
import EditTaskPage from "./pages/EditTaskPage.tsx";

function App() {

  return (
    <>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddTaskPage />} />
            <Route path="/edit/:id" element={<EditTaskPage />} />
        </Routes>
    </>
  )
}

export default App
