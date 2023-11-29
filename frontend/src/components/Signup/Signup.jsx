import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [data, setData] = useState({
    name: "",
    rollNo:"",
    hostel:"",
    roomNo:"",
    phone: "",
    email: "",
    password: "",
    secret: "",
    role: "student"
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setData((prev) => (
      {...prev, [e.target.name]: e.target.value}
      
    ))
  }

  console.log(data)

  const handleSignUp = async(e) =>{
    const URL = `http://localhost:4000/api/v1/${data.role}/signup`;
    console.log(URL)
    e.preventDefault()

    let res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    console.log(res)

    if(res.ok){
      res = await res.json()
      console.log(res)
      if(data.role === "student"){
        localStorage.setItem(data.role, JSON.stringify(res.student))
      }
      else if(data.role === "admin"){
        localStorage.setItem(data.role, JSON.stringify(res.admin))
      }
      else{
        localStorage.setItem(data.role, JSON.stringify(res.serviceman))
      }
      navigate("/login")
    }
    else{
      alert("Something is wrong in URL");
      console.log(res)
    }
  }


    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-9 py-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w- mb-1">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign up to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
            <form className="space-y-6" action="#" method="POST">
              <div className="grid grid-cols-2 w-full ">
                <div className="grid">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    className="ml-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className="grid ml-1">
                  <label htmlFor="name">RollNo.</label>
                  <input
                    type="text"
                    name="rollNo"
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
              </div>
  
              <div className="grid grid-cols-2 w-full">
                <div className="grid mr-1">
                  <label htmlFor="name">Hostel</label>
                  <input
                    type="text"
                    name="hostel"
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className="grid ml-1">
                  <label htmlFor="name">Room No.</label>
                  <input
                    type="text"
                    name="roomNo"
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
              </div>
  
              <div className="grid grid-cols-2 w-full">
                <div className="grid mr-1">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className="grid ml-1">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
              </div>
  
              <div className="grid grid-cols-2 w-full">
                <div className="grid mr-1">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className="grid ml-1">
                  <label htmlFor="email">Secret</label>
                  <input
                    type="text"
                    name="secret"
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                
              </div>
  
              <div>
                <button
                  type="submit"
                  onClick={handleSignUp}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Already registered?{" "}
              <a
                href="login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </>
    );
  }
  