import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoCheckmarkCircleOutline } from "react-icons/io5"

const SuccessPage = () => {
  const navigate = useNavigate()

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='text-center'>
        <div className='flex justify-center'>
            <IoCheckmarkCircleOutline 
                size={80}
                color={'#4ade80'}
            />
        </div>
        <div className='mt-4'>
            <span className='text-lg'>Your account has successfully registered!</span>
            <div className='mt-6'>
                <button className='p-2 border-solid border rounded bg-sky-950 text-slate-200 px-5' onClick={() => navigate('/myaccount')}>Login</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessPage
