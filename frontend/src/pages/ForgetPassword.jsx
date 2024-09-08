import React, { useState } from 'react'
import { useAuthSrore } from '../store/authStore'
import { motion, spring } from 'framer-motion';
import Input from './../components/Input';
import { ArrowLeft, Loader, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function ForgetPassword() {
    const [email, setEmail] = useState()
    const [isSend, SetIsSending] = useState(false)
    const {isloading, forgetPassword} = useAuthSrore()


    const handelSubmit = async (e)=>{
        e.preventDefault();
        try {
           await forgetPassword(email)
           toast.success('Check Your Email')
           SetIsSending(true)
        } catch (error) {
            console.log(error);
            toast.error('Error In Sending Email')
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
            <h2 className='font-bold text-3xl mb-6 bg-gradient-to-r from-green-600 to-emerald-600 text-transparent bg-clip-text text-center'>Forgot Password</h2>
            {!isSend ? (
                <form onSubmit={handelSubmit}>
                    <p className='mb-6 text-center text-gray-300' >Enter Your Email And we Will send Link to resr your Password</p>
                    <Input
                        icon={Mail}
                        value= {email}
                        placeholder= 'Ente Your Email'
                        type = 'email'
                        onChange = {(e)=>{
                            setEmail(e.target.value)
                        }}
                        required
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
            ) : (
                <div className='text-center'>
                    <motion.div
                        initial = {{scale: 0}}
                        animate= {{scale: 1}}
                        transition={{type: 'spring', stiffness: 500 , damping: 30}}
                        className='w-16 h-16 bg-green-600 rounded-full mx-auto mb-4 flex justify-center items-center'
                    >
                        <Mail className='w-8 h-8 text-white' />
                    </motion.div>
                    <p
                        className='text-gray-300 mb-6'                    
                    >
                        Eamil send To This Mail: <span className='font-bold text-gray-100'>{email}</span>, check Your inbox..
                    </p>
                </div>
            )}
    </div>
    <div className='w-full bg-gray-800 bg-opacity-50 px-8 py-4 flex justify-center'>
         <Link to = {'/login'} className = 'text-sm text-green-400 hover:underline flex items-center'> 
             <ArrowLeft className='mr-2 h-4 w-4' />Back To Login
         </Link>
    </div>
    </motion.div>
  )
}
