import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./pages/Header";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

function App() {
  return (
    <div >
      <Router>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
