import JobList from "./pages/joblistpage";
import LoginForm from "./pages/loginPage";
import UserDataForm from "./pages/userDetails";
import Navbar from "./components/Navbar" 
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  const navItems = [
    { label: 'Home', href: 'Home' },
    { label: 'Fill details', href: 'details' },
    { label: 'Apply', href: 'apply' },
    { label: 'Login', href: 'login' }
  ];

  return (
    <Router>
      <Navbar brandName="AnchorS" navItems={navItems} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/details" element={<UserDataForm />} />
        <Route path="/apply" element={<JobList />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
