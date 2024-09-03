import axios from 'axios'
import {create} from 'zustand'


const API_URL = 'http://localhost:5000/auth/'
export const useAuthSrore = create((set)=>({
    user: null,
    isloading: false,
    isConfirmed: false,
    isAuthanticated: false,
    error: null,


    signup: async(name, email, password)=>{
        try {
            set({isloading: true, error: null})
           const response =  await axios.post('http://localhost:5000/auth/signup',{name, email,password})
            // set({user: data})
            console.log(response);
            set({user: response.data.newUser, error: null})
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
            set({user: response.data.user, isloading: false, error: null, isConfirmed: true})
        } catch (error) {
            set({isloading: false, error: error.response.data.message|| "Confirming Email Failed..!", isConfirmed: false})
            throw error
        }
    }
}))