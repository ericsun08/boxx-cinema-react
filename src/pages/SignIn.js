import React, { useState } from 'react'
import { unwrapResult } from '@reduxjs/toolkit'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PageHeader from '../components/PageHeader'
import { ThreeDots } from 'react-loader-spinner'
import { signInUser } from '../features/AuthDetailSlice'
import { handleErrorMessage, openErrorModal } from '../features/AppSlice'

const SignIn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isLoggedin, userInfo, loading } = useSelector((state) => state.auth)

    const [users, setUsers] = useState({})

    const navigateToRegister = () => {
        navigate('/Register')
    }

    const loginValidation = () => {
        if(!users.email){
            return true
        }
        if(!users.password){
            return true
        }
        return false
    }

    const handleChangeDetail = (e) => {
        setUsers({...users, [e.target.name]: e.target.value})
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()

        const intendedPath = localStorage.getItem('intendedPath')
        localStorage.removeItem('intendedPath')

        dispatch(signInUser(users))
            .then(unwrapResult)
            .then(() => {
                navigate(intendedPath || '/')
            })
            .catch((err) => {
                dispatch(openErrorModal())
                dispatch(handleErrorMessage(err))
            })
    }

    if(isLoggedin && userInfo){
        return <Navigate to='/user-profile'/>
    }

    return (
        <div>
            <PageHeader title="Sign In"/>
            <div className='mx-7 mt-10'>
                <form onSubmit={handleSubmitForm}>
                    <div className=''>
                        <span>Email</span>
                        <div className='my-2'>
                            <input type='email' name='email' className='w-full p-2 border-solid border rounded focus:ring focus:outline-none' onChange={(e) => handleChangeDetail(e)}/>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <span>Password</span>
                        <div className='my-2'>
                            <input autoComplete='off' type="password" name='password' className='w-full p-2 border-solid border rounded focus:ring focus:outline-none' onChange={(e) => handleChangeDetail(e)}/>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <button className={`w-full p-2 border-solid border rounded border-sky-950 flex items-center justify-center active:bg-sky-950 active:text-slate-100 ${!loginValidation ? 'hover:bg-sky-950 hover:text-slate-100' : ''}`} disabled={loginValidation()}>
                        {
                            !loading ?
                                'Login'
                            :
                                <ThreeDots
                                    height={25}
                                    width={30}
                                    color='#082f49'
                                />
                        }
                        </button>
                    </div>
                    <div className='mt-4 text-center'>
                        <span className='text-xs'>Don't have account yet? <span className='text-sky-950 font-bold cursor-pointer hover:underline' onClick={() => navigateToRegister()}>Register Now</span></span>
                    </div>
                    <div className='mt-2 text-center'>
                        <span className='text-xs text-sky-950 font-bold cursor-pointer'>Forgot Password</span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn