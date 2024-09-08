import React from 'react'
import { motion } from 'framer-motion';
import { useAuthSrore } from '../store/authStore';
import { generateLocalDate } from '../utils/date.js';
import toast from 'react-hot-toast';

export default function DashBoard() {
  const {user,logOut} = useAuthSrore()

  const handelLogOut = async ()=>{
      try {
        await logOut()
        toast.success('logout Success')
      } catch (error) {
          console.log(error);
      }
  }
  return (
    <motion.div
      initial = {{opacity: 0, scale: 0.9}}
      animate = {{opacity: 1 , scale: 1}}
      exit = {{opacity: 0, scale: 0.9}}
      className='max-w-md w-full mx-auto bg-gray-800 opacity-80 backdrop-filter
       backdrop-blur-lg p-8 border border-gray-800 rounded-lg shadow-2xl '
    >

      <h2 className='text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600'>DashBoard</h2>
      <div className='space-y-6'>
          <motion.div
          initial = {{opacity: 0, y: 20}}
          animate = {{opacity: 1, y: 0}}
          transition={{delay: 0.2}}
            className='bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 p-4 '
          >
               <h3 className='font-semibold text-xl text-green-400 mb-3 '>Profile Information</h3>
               <p className='text-gray-300 '><span className='font-bold'>Name:</span> {user.name}</p>
               <p className='text-gray-300 '><span className='font-bold'>Email:</span> {user.email}</p>
          </motion.div>

          <motion.div
             initial = {{opacity: 0, y: 20}}
             animate= {{opacity: 1, y: 0}}
             transition={{delay: 0.4}}
             className='bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 p-4'
          >
            <h3 className='font-semibold text-xl mb-3 text-green-400'>Last Activity</h3>
            <p className='text-gray-300'>
              <span className='font-bold'>Joined: </span>
              {new Date(user.createdAt).toLocaleString('en-US',{
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
              })}
            </p>
            <p className='text-gray-300'>
               <span className='font-bold'>Last Login: </span>
               {user.lastloginDate? generateLocalDate(user.lastloginDate) :'You Just Created Your Account'}
            </p>
          </motion.div>

          <motion.div
            initial = {{opacity: 0, y: 20}}
            animate = {{opacity: 1 ,y: 0}}
            transition={{delay: 0.7}}
            className='mt-4'
          >
              <motion.button
                 whileHover={{scale: 1.02}}
                 whileTap={{scale: 0.98}}
                 onClick={handelLogOut}
                 className='mx-auto text-white bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg py-3 px-4 w-full font-bold
                 shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                 focus:ring-offset-gray-900
                 '
              >
                 LogOut
              </motion.button>
          </motion.div>
      </div>
    </motion.div>
  )
}
