import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import AddProfile from "./pages/AddProfile";
import ProfilesList from "./pages/ProfilesList";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/add-profile" element={<AddProfile />} />
          <Route path="/profiles" element={<ProfilesList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
