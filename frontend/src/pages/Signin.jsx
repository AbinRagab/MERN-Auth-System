import React, { useState } from 'react'
import { animate, motion } from 'framer-motion';
import Input from './../components/Input';
import { Loader, Lock, Mail, Scale, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordCheck from './../components/PasswordCheck';
import { useAuthSrore } from '../store/authStore';




export default function Signin() {

    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const {signup, isloading, error}= useAuthSrore()
    const navigateTo = useNavigate()

    const handelSubmit = async (e)=>{
        e.preventDefault();

        try {
        await signup(name, email, password)      
         navigateTo('/vrefiy-email')
        } catch (error) {
            console.log(error);
        }
    }

   //  console.log('hi');
    
    return <motion.div
        initial= {{opacity: 0, y: 20}}
        animate = {{opacity: 1 , y: 0}}
        transition={{duration: 0.5}}
        className='max-w-md w-full bg-gray-800 relative bg-opacity-50 pb-14 rounded-2xl backdrop-filter backdrop-blur-xl px-8 shadow-xl overflow-hidden'
    >
        <div className='pt-8 w-full'>
                <h2 className=' bg-gradient-to-r text-transparent bg-clip-text font-bold text-center text-2xl from-green-700 to-green-500'>Create Account</h2>
        </div>

        {/* form Sign in */}

        <form onSubmit={handelSubmit}> {/* handel change to don't refresh on submit */}
                <Input
                 icon={User}
                 value= {name}
                 placeholder= 'Full Name'
                 type = 'text'
                 onChange = {(e)=>{
                    setName(e.target.value)
                 }}
                 />
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

                 {/* password Check .. */}

                 {error && <p className='text-red-500  font-semibold'>{error}</p>}
                 {/* button */}
                 <motion.button
                    className='w-full rounded-lg font-bold text-gray-300 bg-gradient-to-r from-green-600 to-emerald-700 py-2 my-3 show-lg 
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200
                     hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-600
                     '
                    whileHover={{scale: 1.02}}
                    whileTap={{scale: 0.98}}
                    type='submit'
                    disabled={isloading}
                 >
                    {isloading? <Loader className=' animate-spin mx-auto' /> : 'Sign Up'}
                 </motion.button>

        </form>
        
         {/*  */}
                 <PasswordCheck password={password} />
        {/* Footer Of Div SignUp */}
                 <div className='bg-gray-900 bg-opacity-50 py-3 text-sm absolute right-0 left-0 bottom-0 w-full flex justify-center text-gray-400 '>
                    <p>Already have an account?</p>
                    <Link className= 'ml-2 text-green-600 hover:underline ' to = {'/login'}>Login</Link>
                 </div>
    </motion.div>
}
