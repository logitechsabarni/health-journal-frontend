import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow">
      <div className="flex gap-4 font-medium">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/history" className="hover:underline">History</Link>
        <Link to="/stats" className="hover:underline">Stats</Link>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
