import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'

import Home from './components/Home';
import Login from "./components/Login";
import ProfileDash from "./components/ProfileDash";
import Timetable from "./components/Timetable";
import ProfileForm from "./components/ProfileForm";
import Goals from "./components/Goals";
import Home2 from "./components/Home2";


const router  = createBrowserRouter(
  [{path:"/", element: <Home/>},
  {path:"/login",element:<Login/>},
  {path:'/dashboard', element:<ProfileDash/>},
{path:'/dashboard/timetable', element:<Timetable/>},
{path:'/dashboard/profile', element:<ProfileForm/> },
{path: '/dashboard/goals', element:<Goals/>},
{path: '/home2', element:<Home2/>}]

)

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App