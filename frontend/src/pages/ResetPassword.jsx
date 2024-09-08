import React, { useState } from 'react'
import { useAuthSrore } from '../store/authStore'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion';
import Input from './../components/Input';
import toast from 'react-hot-toast';
import { Loader, Lock } from 'lucide-react';

export default function ResetPassword() {
    const [password , setPassword] = useState()
    const [confirmPassword , setConfirmPassword] = useState()

    const {isloading, resetPassword, error} = useAuthSrore()
    const {token} = useParams()

    const navto = useNavigate()

    const handelSubmit = async (e)=>{
        e.preventDefault();
        if(password !== confirmPassword) return toast.error('Passwords Is Not Match')
        try {
            await resetPassword(token, password)
            toast.success('Password Changed Successfully')
            setTimeout(()=>{
                navto('/login')
            },2000)
        } catch (error) {
            console.log(error);
            toast.error('Passwoed Reset Not Completed')
        }
    }
  return (
    <motion.div 
    initial = {{opacity: 0, y: 20}}
    animate = {{opacity: 1, y: 0}}
    transition={{duration: 0.5}}
    className='max-w-md w-full bg-gray-800 relative bg-opacity-50 rounded-2xl
     backdrop-filter backdrop-blur-xl shadow-xl overflow-hidden'
    >
        <div className='p-8'>
        <h2 className='font-bold text-3xl mb-6 bg-gradient-to-r from-green-600
         to-emerald-600 text-transparent bg-clip-text text-center'>Reset Password</h2>
            {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
            <form onSubmit={handelSubmit}>
                 <Input
                 icon={Lock}
                 value= {password}
                 placeholder= 'Ente Your Password'
                 type = 'password'
                 onChange = {(e)=>{
                    setPassword(e.target.value)
                 }}
                 />
                 <Input
                 icon={Lock}
                 value= {confirmPassword}
                 placeholder= 'Ente Confirm Password'
                 type = 'password'
                 onChange = {(e)=>{
                    setConfirmPassword(e.target.value)
                 }}
                 />
                 <motion.button
                    className='w-full rounded-lg font-bold text-gray-300 bg-gradient-to-r from-green-600 to-emerald-700 py-2 my-2 show-lg 
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200
                     hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-600
                     '
                    whileHover={{scale: 1.02}}
                    whileTap={{scale: 0.98}}
                    type='submit'
                    disabled= {isloading}
                 >
                    {isloading ? <Loader className = ' animate-spin mx-auto' /> : "Send Reset Link"}
                 </motion.button>
        </form>
        </div>
        
    </motion.div>
  )
}
