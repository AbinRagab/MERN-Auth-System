import React from 'react'
import { Outlet } from 'react-router-dom'
import FloatingShapes from "./FloatingShapes.jsx"

export default function Layout() {
  return <div className="min-h-screen bg-gradient-to-br from-gray-800 via-green-900
  to-emerald-900 flex justify-center items-center relative overflow-hidden">
       <FloatingShapes  color = 'bg-green-500' size = 'w-64 h-64' left = '10%' top = '-5%' delay = {0} />
       <FloatingShapes  color = 'bg-emerald-500' size = 'w-48 h-48' left = '80%' top = '70%' delay = {5} />
       <FloatingShapes  color = 'bg-lime-500' size = 'w-32 h-32' left = '-5%' top = '40%' delay = {2} />

    {/* pages By React Router Dom */}
    <Outlet/>
   </div>
}
