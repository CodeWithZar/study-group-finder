import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../utils/storage";

const navLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/groups", label: "Groups" },
  { to: "/create-group", label: "Create Group" },
  { to: "/profile", label: "Profile" },
  { to: "/home", label: "About" },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link to="/dashboard" className="text-lg font-bold tracking-tight">
          Study Group Finder
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <nav className="flex flex-wrap gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                    isActive ?
                      "bg-amber-500 text-blue-950"
                    : "text-blue-100 hover:bg-blue-800"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md border border-blue-700 px-3 py-1.5 text-sm font-medium text-blue-100 transition hover:bg-blue-800"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
