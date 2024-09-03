import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout.jsx"
import Login from "./pages/Login.jsx"
import Signin from "./pages/Signin.jsx"
import EmailVerification from "./pages/EmailVerification.jsx"
import { Toaster } from "react-hot-toast"


const router = createBrowserRouter([
  {path: '/', element: <Layout/>, children:[
    {path: '/signin', element: <Signin/> },
    {path: '/login', element: <Login/>},
    {path: '/vrefiy-email', element: <EmailVerification/>},
    // {path: '', element: ''},
  ]},
])

function App() {
  return<>
      <RouterProvider router={router} />
      <Toaster />
  </>
}

export default App
