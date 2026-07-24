import {
  House,
  Search,
  Film,
  Tv,
  Clock3,
  User,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <nav>
        <NavLink to="/">
          <House size={20} />
          <span>Home</span>
        </NavLink>

        <NavLink to="/search">
          <Search size={20} />
          <span>Search</span>
        </NavLink>

        <NavLink to="#">
          <Film size={20} />
          <span>Movies</span>
        </NavLink>

        <NavLink to="#">
          <Tv size={20} />
          <span>TV Shows</span>
        </NavLink>

        <NavLink to="#">
          <Clock3 size={20} />
          <span>Continue Watching</span>
        </NavLink>

        <NavLink to="/profile">
          <User size={20} />
          <span>Profile</span>
        </NavLink>
      </nav>

      <button
        className="logout-button"
        onClick={handleLogout}
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default Sidebar;