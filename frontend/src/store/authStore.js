import axios from 'axios'
import {create} from 'zustand'


const API_URL = 'http://localhost:5000/auth/'
export const useAuthSrore = create((set)=>({
    user: null,
    isloading: false,
    isConfirmed: false,
    isAuthanticated: false,
    isAuthanticating: false,
    error: null,


    signup: async(name, email, password)=>{
        try {
            set({isloading: true, error: null})
           const response =  await axios.post('http://localhost:5000/auth/signup',{name, email,password})
            // console.log(response);
            set({user: response.data.newUser, error: null})
            localStorage.setItem('token', response.data.token)
            
        } catch (error) {
            console.log(error.response.data.message);
            set({isloading: false, error: error.response.data.message|| "Error In Create Email..!"})
            throw error
        }
    },

    confirmEmail: async (code)=>{
        set({isloading: true, error: null})
        try {
            const response = await axios.put(`http://localhost:5000/auth/confirmEmail`,{code})
            set({user: response.data.user, isloading: false, error: null, isConfirmed: true, isAuthanticated:true})
        } catch (error) {
            set({isloading: false, error: error.response.data.message|| "Confirming Email Failed..!", isConfirmed: false, isAuthanticated: false})
            throw error
        }
    },

    checkAuth: async()=>{

        set({isAuthanticating: true, error: null})
        await new Promise((resolve)=> setTimeout(resolve, 2000))
        const token = localStorage.getItem('token')
        // if(!token) 
        try {
            const response = await axios.get('http://localhost:5000/auth/check-Auth',{
                headers: {
                    token
                }
            })
            // console.log(response);
            
            set({user: response.data.user, error: null, isAuthanticated: true, isAuthanticating: false})
        } catch (error) {
            set({isAuthanticated: false, isAuthanticating: false, error: null})
        }
    },
    login: async(email, password)=>{
        try {
            set({isloading: true, error: null})
            const response = await axios.post('http://localhost:5000/auth/login',{email, password})
            // console.log(response);
            
            localStorage.setItem('token', response.data?.token)
            set({isloading: false,error: null, user: response.data?.user , isAuthanticated:true})
        } catch (error) {
            set({isloading: false,error: error.response?.data?.message || "Sign In Error!, Email or Password is An correct"})
            throw error
        }
    },
    logOut: async ()=>{
        set({isloading: true, error: null})
        try {
            const response = await axios.post('http://localhost:5000/auth/logout').then(response => {
                localStorage.removeItem('token');
                console.log(response.data.message);
                set({isloading: false, error: null, isAuthanticated: false})
            });
        } catch (error) {
            set({isloading: false, error: 'logout Error', isAuthanticated: true})
            throw error
        }
    }
}))