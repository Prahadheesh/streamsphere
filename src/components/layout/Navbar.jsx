import { FaSearch, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>StreamSphere</h2>
      </div>

      <ul className="nav-links">
        <li>Home</li>
        <li>Movies</li>
        <li>TV Shows</li>
        <li>My List</li>
      </ul>

      <div className="nav-icons">
        <FaSearch className="icon" />
        <FaUserCircle className="icon profile" />
      </div>
    </nav>
  );
}

export default Navbar;