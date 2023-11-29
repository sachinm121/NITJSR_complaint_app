import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import About from "../About/About";
import Help from "../Help/Help";
import Contact from "../Contact/Contact";
import bgIMG from './Background.jpeg';

function Home() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    const student = JSON.parse(localStorage.getItem("student"));
    const serviceman = JSON.parse(localStorage.getItem("serviceman"));

    if (admin || student || serviceman) {
      if (admin) setData(admin);
      else if (student) setData(student);
      else if (serviceman) setData(serviceman);
      else setData(null);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen mt-4">
      <header className="bg-gray-800 text-white text-center py-4">
        <h1 className="text-3xl font-bold">Welcome to NIT Jamshedpur</h1>
      </header>
      
      <main className="flex-1">
        <img className="w-full" src={bgIMG} alt="" />
        {/* Other sections/components */}
      </main>
      <footer className="bg-gray-900 text-white text-center py-4">
        <p>&copy; 2023 Your Website. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
