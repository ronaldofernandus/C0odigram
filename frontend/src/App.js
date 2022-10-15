import { Navbar, MainContent } from "./Components/";
import { Login, Register, HomePage } from "./Pages";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="h-[100vh] text-black dark:bg-neutral-900 dark:text-white relative">
        <Navbar />
        <div className="text-center">
          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home/*" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
