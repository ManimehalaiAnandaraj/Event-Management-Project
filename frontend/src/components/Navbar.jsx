import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const user = (() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  })();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/dashboard"
          className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition duration-200"
        >
          Eventify
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-indigo-600 transition duration-200"
          >
            Dashboard
          </Link>
          <Link
            to="/transactions"
            className="text-gray-700 hover:text-indigo-600 transition duration-200"
          >
            Transactions
          </Link>

          {user ? (
            <>
              <Link
                to="/create-event"
                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200"
              >
                Create
              </Link>
              <button
                onClick={logout}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
