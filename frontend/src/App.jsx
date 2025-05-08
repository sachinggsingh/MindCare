import React from 'react'
import Home from './Pages/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'
import ContactUs from './components/ContactUs'
import About from './components/About'
import Services from './components/Services'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Profile from './components/Profile'
import DetailServices from './Pages/DetailServices'
import CreateProblem from './components/Problems/CreateProblem'
import TaskViewerPage from './Pages/TaskViewerPage'
import Completion from './Pages/Completion'
import AdminLogin from './Pages/AdminLogin'
import AdminPanel from './Pages/AdminPanel'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/services/:id" element={<DetailServices />} />
        <Route path="/create-problem" element={<CreateProblem />} />
        <Route path="/tasks/:problemId" element={<TaskViewerPage/>}/> 
        <Route path="/completion" element={<Completion />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminPanel />} />
      </Routes>
    </Router>
  )
}

export default App
