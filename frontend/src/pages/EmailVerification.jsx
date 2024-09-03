import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthSrore } from '../store/authStore';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast'


export default function EmailVerification() {

    const [inputsCode, setInputsCode] = useState(["","","","","",""])
    const inputRefs = useRef([])
    const navto = useNavigate()
    const {confirmEmail, isLoading, userSuccess,error} = useAuthSrore()

    const handelChange = (index, value)=>{
        let newCode = [...inputsCode]
        
        // handel Paste Code
        
        if(value.length > 1){
            const pastedCode = value.slice(0,6).split("")
            for (let index = 0; index < pastedCode.length; index++) {
                newCode[index] = pastedCode[index] || ""
            }
            setInputsCode(newCode)

            // Handel Focus Input
            const lastFilledInput = newCode.findLastIndex((digit)=> digit != "")
            const focusedInput = lastFilledInput <5? lastFilledInput+1 : 5
            inputRefs.current[focusedInput].focus()
        }else{
            newCode[index] = value
            setInputsCode(newCode)

            // Skip Focus Input
            if(value && index < 5){
                inputRefs.current[index+1].focus()
            }
        }
    }

    const handelKeyDown = (index, e)=>{

        if(e.key =='Backspace' && !inputsCode[index] && index > 0 ){
            inputRefs.current[index-1].focus()
        }
        
    }

    const handelSubmit = async (e) =>{
        e.preventDefault();
        const verification = inputsCode.join("")

        try {
            await confirmEmail(verification)
            navto('/')
            toast.success('Email Vrefied SuccessFully')
        } catch (error) {
            console.log(error);
        }
    }   

    useEffect(()=>{
        if(inputsCode.every((digit)=> digit != "")){
            handelSubmit(new Event("submit"))
        }
    },[inputsCode])

  return <>
    <motion.div
        initial= {{opacity:0, y: -50}}
        animate= {{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        className='max-w-md w-full bg-gray-800 relative bg-opacity-50 rounded-2xl
          backdrop-filter backdrop-blur-xl px-8 shadow-xl overflow-hidden'
    >
        <div className='w-full mt-5'>
            <h2 className='bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-emerald-500 mb-6 font-bold text-center text-3xl'>Vrefiy Your Email</h2>
            <p className='text-xs text-center text-gray-300 '>Enter the 6-digit Code That Sent To Your Email</p>

        </div>

        {/* Input For Code */}
        <form className="my-6" onSubmit={handelSubmit}>
            <div className='w-full flex justify-between'>
                {
                    inputsCode.map((inp, idx)=>{
                        return <input
                            key={idx}
                            ref = {(el)=>{inputRefs.current[idx] = el}}
                            type='text'
                            maxLength={6}
                            value={inp}
                            onChange={(e)=>{
                                handelChange(idx,e.target.value)
                            }}
                            onKeyDown={(e)=>{handelKeyDown(idx, e)}}
                            className='w-12 h-12 text-center bg-gray-700 text-white border-2 text-2xl border-gray-600 rounded-lg
                                focus:outline-none focus:border-green-600
                            '
                        />
                    })
                }
             </div>
                {error && <p className='text-red-500 font-semibold'>{error}</p>}
             <motion.button
                whileHover={{scale: 1.02}}
                whileTap={{scale: 0.98}}
                type='submit'
                disabled= {isLoading || inputsCode.some((digit)=>{ !digit})}  
                className='w-full rounded-lg font-bold text-gray-300 bg-gradient-to-r from-green-600 to-emerald-700 py-2 my-4 show-lg 
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200
                     hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-600
                     '          
             >
              {isLoading? <Loader className='animate-spin mx-auto' /> : "Vrefiy Email" }
             </motion.button>
        </form>
        
    </motion.div>
  </>
}
