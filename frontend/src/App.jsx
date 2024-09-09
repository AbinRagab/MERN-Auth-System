import { createBrowserRouter, Navigate, replace, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout.jsx"
import Login from "./pages/Login.jsx"
import Signin from "./pages/Signin.jsx"
import EmailVerification from "./pages/EmailVerification.jsx"
import { Toaster } from "react-hot-toast"
import { useAuthSrore } from "./store/authStore.js"
import { useEffect } from "react"
import DashBoard from "./pages/DashBoard.jsx"
import LoadingSpin from "./components/LoadingSpin.jsx"
import ForgetPassword from "./pages/ForgetPassword.jsx"
import ResetPassword from "./pages/ResetPassword.jsx"


const RedirectAuthenticatedUser = ({children})=>{
    const {isAuthanticated, user} = useAuthSrore();

    
    if(isAuthanticated && user.activation){
        return <Navigate to = '/' replace />
    }

    return children;
}

const ProtectedRoute = ({children})=>{
      const {isAuthanticated, user} = useAuthSrore()

      if(!isAuthanticated) {
         return <Navigate to= '/login' replace/>
      }
      
      if(!user.activation){
         return <Navigate to= '/vrefiy-email' replace />
      }

      return children
}


const router = createBrowserRouter([
  {path: '/', element: <Layout/>, children:[
    {path: '/', element:  <ProtectedRoute><DashBoard /></ProtectedRoute>},
    {path: '/dashboard', element:  <ProtectedRoute><DashBoard /></ProtectedRoute>},
    {path: '/signin', element: <RedirectAuthenticatedUser><Signin/></RedirectAuthenticatedUser> },
    {path: '/login', element: <RedirectAuthenticatedUser><Login/></RedirectAuthenticatedUser>},
    {path: '/forgetPassword', element: <RedirectAuthenticatedUser><ForgetPassword/></RedirectAuthenticatedUser>},
    {path: '/resetPassword/:token', element: <RedirectAuthenticatedUser><ResetPassword/></RedirectAuthenticatedUser>},
    {path: '/vrefiy-email', element: <EmailVerification/>},
    {path: '*', element :<Navigate to= "/login" replace />}
  ]},
])
 
function App() {
  const { isAuthanticating , checkAuth} = useAuthSrore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])


  if(isAuthanticating) return <LoadingSpin />
  return<>
      <RouterProvider router={router} />
      <Toaster />
  </>
}

export default App
