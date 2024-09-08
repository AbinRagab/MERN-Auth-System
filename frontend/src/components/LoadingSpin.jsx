import React from 'react'
import { motion, animate } from 'framer-motion';

export default function LoadingSpin() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-800 to-emerald-800 flex justify-center items-center 
    relative overflow-hidden
    '>

        <motion.dev
            className = 'w-16 h-16 border-4 rounded-full border-t-green-400 border-green-200'
            animate = {{rotate: 360}}
            transition ={{duration: 1, repeat: Infinity, ease: "linear" }}
        >

        </motion.dev>
    </div>
  )
}
