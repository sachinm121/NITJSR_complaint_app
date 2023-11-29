import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(data);

  const handleLogIn = async (e) => {
    const URL = `http://localhost:4000/api/v1/${data.role}/login`;
    console.log(URL);
    e.preventDefault();
    let res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(data),
    });

    // console.log(res);

    if (res.ok) {
      res = await res.json();
      console.log(res);
      if (data.role === "student")
        localStorage.setItem(data.role, JSON.stringify(res.student));
      else if (data.role === "admin")
        localStorage.setItem(data.role, JSON.stringify(res.admin));
      else if("serviceman") localStorage.setItem(data.role, JSON.stringify(res.serviceman));
      
      navigate("/");
    } else {
      alert("Someting is wrong in URL");
      console.log(res);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {/* heading */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {/* from container start*/}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* form  */}
          <form className="space-y-6" action="#" method="POST">
            {/* Role start */}
            <div>
              <div className="flex items-start">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Role
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="role"
                  name="role"
                  type="type"
                  autoComplete="type"
                  onChange={handleChange}
                  required
                  placeholder="  student, admin or serviceman"
                  className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Role ended */}

            {/* Email address start */}
            <div>
              <div className="flex items-start">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Email address ended  */}

            {/* Password start  */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Password ended  */}

            {/* Submit start */}
            <div>
              <button
                type="submit"
                onClick={handleLogIn}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>
            </div>
            {/* Submit ended  */}
          </form>

          {/* Signup start  */}
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </a>
          </p>
          {/* Signup ended  */}
        </div>
      </div>
    </>
  );
}
