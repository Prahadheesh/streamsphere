import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Pending from "./pages/Pending";
import NotFound from "./pages/NotFound";

function MainLayout() {
  return (
    <>
      <Navbar />

      <div className="app-layout">
        <Sidebar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route
          path="/profile"
          element={
            <ProtectedRoute>
            <Profile />
            </ProtectedRoute>
          }
        />

            <Route
          path="/pending"
          element={
            <ProtectedRoute>
            <Pending />
            </ProtectedRoute>
          }
        />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;