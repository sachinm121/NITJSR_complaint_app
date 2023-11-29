import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import Help from './components/Help/Help.jsx'
import Login from './components/Login/Login.jsx'
import Signup from './components/Signup/Signup.jsx'
import AddComplaint from './components/Complaint/AddComplaint.jsx'
import ShowComplaint from './components/Complaint/ShowComplaint.jsx'
import AddAdmin from './components/AddUser/AddAdmin.jsx'
import AddServiceman from './components/AddUser/AddServiceman.jsx'
import StudentDetails from './components/StudentDetails/StudentDetails.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={<App/>} >
        <Route path='' element={<Home />}/>
        <Route path='about' element={<About />}/>
        <Route path='contact' element={<Contact />}/>
        <Route path='help' element={<Help />}/>
        <Route path='login' element={<Login/>} />
        <Route path='signup' element={<Signup/>} />
        <Route path='showComplaint' element={<ShowComplaint/>} />
        <Route path='addComplaint' element={<AddComplaint/>} />
        <Route path='addadmin' element={<AddAdmin/>} />
        <Route path='addserviceman' element={<AddServiceman/>} />
        <Route path='getstudentdetails' element={<StudentDetails/>} />
      </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
