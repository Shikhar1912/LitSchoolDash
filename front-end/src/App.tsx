import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import AddProfile from "./pages/AddProfile";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/add-profile" element={<AddProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
