import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/navbar';
import Footer from './components/footer';
import Tasks from "./pages/task";
import Profile from "./pages/profile";
import Signup from './components/signup';
import ResetPassword from './components/resetpassword';
import Home from './pages/home';
import TaskForm from "./components/taskform";
import UpdateTask from './components/updatetask';
import ViewTask from "./components/viewtask";
import Login from "./components/login";
import About from "./components/about";
import Contact from "./components/contact";





const App = () => {

  const handleLogin = (userData: any) => {
    // You can handle any global state updates here if needed
    console.log('User logged in:', userData);
  };

  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        
        <Route 
          path="/login" 
          element={<Login onLogin={handleLogin} />} 
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/resetpassword" element={< ResetPassword />} />
        <Route path="/add-task" element={<TaskForm />} />
        <Route path="/update-task/:id" element={<UpdateTask />} />
        <Route path="/view-task/:id" element={<ViewTask />} />

      </Routes>
      <Footer />
    </Router>


  );
};
export default App;
