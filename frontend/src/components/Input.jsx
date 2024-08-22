import React from 'react'

export default function Input({ icon:Icon ,...props}) {
  return <div className='w-full my-3 relative'>
        <div className='pl-3 my-2 absolute inset-y-0 left-0'>
             <Icon  className = 'size-5 text-green-500' />
        </div>
        <input {...props} className='w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50  rounded-lg text-sm
         border border-gray-700 focus:border-green-700 focus:ring-2 focus:ring-green-500 placeholder-gray-400 text-white transition duration-200 ease-in' />
  </div>
}
