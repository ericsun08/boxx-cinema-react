import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { handleErrorMessage, openErrorModal } from '../features/AppSlice'
import { logoutUser } from '../features/AuthDetailSlice'

const ProtectedPages = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)  

  useEffect(() => {
    const tokenExp = localStorage.getItem('tokenExp')
    const tokenExpTime = new Date(tokenExp * 1000)

    if(tokenExp){
        if(tokenExpTime && new Date() > tokenExpTime){
            dispatch(logoutUser())
            navigate('/myaccount')
            dispatch(openErrorModal(true))
            dispatch(handleErrorMessage('Token Expired'))
        }
    }
  },[dispatch, navigate])

  if(!userInfo){
    return (
        <div>
          <span>Unauthorized</span>
        </div>
      )
  }

  return <Outlet/>
}

export default ProtectedPages
