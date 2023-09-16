import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handleErrorMessage, openErrorModal } from '../features/AppSlice'
import { IoCloseCircleOutline } from "react-icons/io5"

const ErrorMessage = () => {
  const dispatch = useDispatch()
  const { isErrorMessage, errorMessage } = useSelector((state) => state.app)

  const handleErrorModal = () => {
    dispatch(openErrorModal())
    dispatch(handleErrorMessage(null))
  }

  return (
    <div className={`overlay flex justify-center items-center ${isErrorMessage ? 'block' : 'hidden'}`} onClick={() => handleErrorModal()}>
      <div className={`error-modal-container ${isErrorMessage ? 'open' : ''}`}>
        <div className="error-modal-content text-center">
            <div className='border-b border-slate-950 border-solid'>
                <div className='flex justify-center'>
                    <IoCloseCircleOutline
                        size={55}
                        color={'#f87171'}
                    />
                </div>
                <div className='mt-1 mb-3'>
                    <span className='text-xl'>Fail!</span>
                </div>
            </div>
            <div className='mt-5'>
                <span>{errorMessage?.message || errorMessage?.data?.message || errorMessage}</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorMessage
