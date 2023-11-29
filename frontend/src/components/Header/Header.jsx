import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showComplaint, setShowComplaint] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [data, setData] = useState(null);


  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    const student = JSON.parse(localStorage.getItem("student"));
    const serviceman = JSON.parse(localStorage.getItem("serviceman"));

    if (admin || student || serviceman) {
      if (admin) {
        setData(admin);
        setShowAddUser(admin);
        setIsAdmin(true);
      } else if (student) {
        setData(student);
      } else if (serviceman) {
        setData(serviceman);
        setShowAddUser(serviceman);
      } else setData(null);
    }
  }, []);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    if (localStorage.getItem("admin")) {
      localStorage.removeItem("admin");
    }
    if (localStorage.getItem("student")) {
      localStorage.removeItem("student");
    }
    if (localStorage.getItem("serviceman")) {
      localStorage.removeItem("serviceman");
    }
    setData(null); // Reset data state to indicate logout
    setShowProfile(false);
  };

  const handleProfileToggle = () => {
    setShowProfile(!showProfile);
  };

  const handleComplaint = () => {
    setShowComplaint(!showComplaint);
  };

  

  return (
    <nav className="bg-gray-800 p-4 flex flex-col md:flex-row items-center justify-between md:w-full rounded-md">
      {/* logo and menu start */}
      <div className="flex items-center justify-between w-full md:w-auto">
        {/* Logo section start */}
        <NavLink to="/" className="text-white text-lg font-bold">
          NIT JSR Complaint App
        </NavLink>
        {/* Logo section end */}

        {/* Menu start */}
        <button
          onClick={handleMenuToggle}
          className="text-white md:hidden focus:outline-none"
        >
          Menu
        </button>
        {/* Menu ended */}

        {/* Search bar */}
        <div className="flex text-black gap-2 ml-3">
          {isAdmin && (
              <NavLink to='getstudentdetails' className='text-white' >Search Student</NavLink>
          )}
        </div>
      </div>
      {/* logo and menu start */}

      {/* navbar component start */}
      <div
        className={`${
          showMenu ? "flex" : "hidden"
        } md:flex md:items-center items-center md:space-x-4 w-full md:w-auto flex-col md:flex-row`}
      >
        <NavLink
          to="/"
          activeClassName="text-blue-500"
          className="text-white hover:text-blue-500"
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          activeClassName="text-blue-500"
          className="text-white hover:text-blue-500"
        >
          AboutUs
        </NavLink>
        <NavLink
          to="/contact"
          activeClassName="text-blue-500"
          className="text-white hover:text-blue-500"
        >
          ContactUs
        </NavLink>

        <NavLink
          to="/help"
          activeClassName="text-blue-500"
          className="text-white hover:text-blue-500"
        >
          Help
        </NavLink>
        {/* navbar component ended */}

        <div className="relative">
          <button onClick={handleComplaint}>
            {data && (
              <p className="text-white md:flex md:flex-row">Complaint</p>
            )}
          </button>

          {/* Show profile options */}
          {showComplaint && (
            <div
              onMouseLeave={handleComplaint}
              className="absolute text-center top-full right-0 bg-gray-800 mt-2 p-2 rounded-md text-white"
            >
              {!showAddUser && (
                <NavLink to="/addComplaint" className="mt-2 block">
                  Add Complaint
                </NavLink>
              )}
              <NavLink to="/showComplaint" className="mt-2 block">
                Show Complaint
              </NavLink>
            </div>
          )}
        </div>

        {/* Login start */}
        <div className="relative inline-block text-left">
          {!data && (
            <NavLink
              to="/login"
              className="text-white e px-4 py-2 hover:text-yellow-200"
            >
              Login
            </NavLink>
          )}
        </div>
        {/* Login ended */}

        {/* Signup start */}
        {!data && (
          <NavLink
            to="/signup"
            className="text-white border rounded-full border-white px-4 py-2 hover:bg-white hover:text-gray-800"
          >
            Signup
          </NavLink>
        )}
        {/* Signup ended */}

        <div className="relative">
          <button onClick={handleProfileToggle}>
            {data && (
              <p className="text-white font-bold md:flex md:flex-row">
                {data?.name}
              </p>
            )}
          </button>

          {/* Show profile options */}
          {showProfile && (
            <div
              onMouseLeave={handleProfileToggle}
              className="absolute top-full right-0 bg-gray-800 mt-2 p-2 rounded-md text-white md:mt-2 w-44 items-end"
            >
              <NavLink
                onClick={handleLogout}
                to="/login"
                className="mt-2 block"
              >
                Logout
              </NavLink>

              

              {showAddUser && isAdmin && (
                <div>
                  <NavLink to="/addadmin" className="mr-2 block my-2">
                    Add Admin
                  </NavLink>
                  <NavLink to="/addserviceman" className="mr-2 block">
                    Add Serviceman
                  </NavLink>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
