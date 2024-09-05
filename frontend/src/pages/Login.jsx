import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';
import Input from '../components/Input';
import { Link } from 'react-router-dom';

export default function Login() {

  const [password, setPassword]= useState()
  const [email, setEmail]= useState()
  // const [loading, setLoading] = useState(false)

  const handelSubmit = (e)=>{
    e.preventDefault();
  }
  return <>
      <motion.div 
         initial = {{opacity: 0, y: 20}}
         animate = {{opacity: 1, y: 0}}
         transition={{duration: 0.5}}

         className='max-w-md w-full bg-gray-800 relative bg-opacity-50 pb-14 rounded-2xl
          backdrop-filter backdrop-blur-xl px-8 shadow-xl overflow-hidden'
         >
        <div className='pt-8 w-full'>
                <h2 className=' bg-gradient-to-r text-transparent bg-clip-text font-bold text-center text-2xl
                 from-green-700 to-green-500'>Welcome Back</h2>
        </div>
        <form onSubmit={handelSubmit}> {/* handel change to don't refresh on submit */}
               
                 <Input
                 icon={Mail}
                 value= {email}
                 placeholder= 'Ente Your Email'
                 type = 'text'
                 onChange = {(e)=>{
                    setEmail(e.target.value)
                 }}
                
                 />
                  <Input
                 icon={Lock}
                 value= {password}
                 placeholder= 'Ente Your Password'
                 type = 'password'
                 onChange = {(e)=>{
                    setPassword(e.target.value)
                 }}
                 />
                   <div className='w-full'>

                       <Link className= ' text-xs ml-2 text-green-600 hover:underline ' to = {'/login'}>Forget Password?</Link>

                    </div>
                 {/* password Check .. */}

                 {/* button */}
                 <motion.button
                    className='w-full rounded-lg font-bold text-gray-300 bg-gradient-to-r from-green-600 to-emerald-700 py-2 my-3 show-lg 
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200
                     hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-600
                     '
                    whileHover={{scale: 1.02}}
                    whileTap={{scale: 0.98}}
                    type='submit'
                 >
                    Sign Up
                 </motion.button>

                  
                 <div className='bg-gray-900 bg-opacity-50 py-3 text-sm absolute right-0 left-0 bottom-0 w-full flex justify-center text-gray-400 '>
                    <p>Don't have an account?</p>
                    <Link className= 'ml-2 text-green-600 hover:underline ' to = {'/signin'}>Sign Up</Link>
                 </div>
                 
        </form>
      </motion.div>
  </>
}
