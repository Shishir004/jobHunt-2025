import React, { useState } from "react";
import AvatarDropdown from "../shadcn/Avatar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../redux/authslice";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const deleteData = async () => {
    try {
      const res = await axios.delete("http://localhost:3000/api/user/logout");
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Generate links dynamically so we can close sidebar on click
  const studentLinks = [
    { to: "/", label: "Home" },
    { to: "/all/jobs", label: "Job" },
    { to: "/browse", label: "Browse" },
  ];

  const adminLinks = [
    { to: "/admin/company", label: "Companies" },
    { to: "/admin/jobs/create", label: "Jobs" },
  ];

  const renderLinks = (links) =>
    links.map((link) => (
      <li key={link.to}>
        <Link
          to={link.to}
          className="hover:text-blue-400 block py-2"
          onClick={() => setIsSidebarOpen(false)}
        >
          {link.label}
        </Link>
      </li>
    ));

  return (
    <div className="bg-gray-900 text-white shadow-lg border-b border-gray-700">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-20 px-4">
        {/* Logo */}
        <button
          className="text-3xl font-bold"
          onClick={() => navigate("/")}
        >
          Job<span className="text-blue-500">Portal</span>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex font-semibold items-center gap-8 text-gray-300">
          {user?.role === "STUDENT"
            ? renderLinks(studentLinks)
            : renderLinks(adminLinks)}
        </ul>

        {/* Desktop Right Side */}
        <div className="hidden md:flex">
          {user ? (
            <AvatarDropdown src={user?.profile?.profilePhoto} fallback="ST">
              <div className="p-2">
                <h4 className="font-medium text-sm my-2 ml-2 text-white">
                  {user?.email}
                </h4>
                <ul className="text-sm text-gray-300">
                  {user?.role === "STUDENT" && (
                    <Link to="/profile" onClick={() => setIsSidebarOpen(false)}>
                      <li className="px-4 py-2 hover:bg-gray-700 rounded-md cursor-pointer">
                        Profile
                      </li>
                    </Link>
                  )}
                  <li
                    onClick={() => {
                      deleteData();
                      setIsSidebarOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-700 text-red-500 rounded-md cursor-pointer"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </AvatarDropdown>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" onClick={() => setIsSidebarOpen(false)}>
                <button className="px-5 py-2 font-semibold rounded-lg border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300">
                  Login
                </button>
              </Link>
              <Link to="/signup" onClick={() => setIsSidebarOpen(false)}>
                <button className="px-5 py-2 font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105">
                  Signup
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-gray-900 shadow-lg transform transition-transform duration-300 z-50 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
          {user ? (
            <div className="flex items-center gap-3">
              <img
                src={user?.profile?.profilePhoto}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border border-gray-600"
              />
              <div className="text-sm">
                <p className="font-semibold">{user?.email}</p>
                <p className="text-gray-400 text-xs capitalize">{user?.role}</p>
              </div>
            </div>
          ) : (
            <span className="text-xl font-bold">Menu</span>
          )}
          <button onClick={() => setIsSidebarOpen(false)}>
            <X size={28} />
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="p-4 font-semibold text-gray-300">
          {user?.role === "STUDENT"
            ? renderLinks(studentLinks)
            : renderLinks(adminLinks)}

          <hr className="my-4 border-gray-700" />

          {user ? (
            <>
              {user?.role === "STUDENT" && (
                <Link
                  to="/profile"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <li className="hover:text-blue-400 py-2">Profile</li>
                </Link>
              )}
              <li
                onClick={() => {
                  deleteData();
                  setIsSidebarOpen(false);
                }}
                className="text-red-500 hover:text-red-400 py-2 cursor-pointer"
              >
                Logout
              </li>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsSidebarOpen(false)}>
                <li className="hover:text-blue-400 py-2">Login</li>
              </Link>
              <Link to="/signup" onClick={() => setIsSidebarOpen(false)}>
                <li className="hover:text-blue-400 py-2">Signup</li>
              </Link>
            </>
          )}
        </ul>
      </div>

      {/* Background overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
