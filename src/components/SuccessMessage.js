import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handleSuccessModal } from '../features/AppSlice'
import { IoCheckmarkCircleOutline } from "react-icons/io5"

const SuccessMessage = () => {
  const dispatch = useDispatch()
  const { isSuccessMessage, successMessage } = useSelector((state) => state.app)

  const handleSuccess = () => {
    dispatch(handleSuccessModal(null))
  }

  return (
    <div className={`overlay flex justify-center items-center ${isSuccessMessage ? 'block' : 'hidden'}`} onClick={() => handleSuccess()}>
      <div className={`error-modal-container ${isSuccessMessage ? 'open' : ''}`}>
        <div className="error-modal-content text-center">
            <div className='border-b border-slate-950 border-solid'>
                <div className='flex justify-center'>
                    <IoCheckmarkCircleOutline
                        size={55}
                        color={'#4ade80'}
                    />
                </div>
                <div className='mt-1 mb-3'>
                    <span className='text-xl'>Success!</span>
                </div>
            </div>
            <div className='mt-5'>
                <span>{successMessage}</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessMessage