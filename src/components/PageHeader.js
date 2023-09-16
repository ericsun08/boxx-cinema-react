import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'
import { IoArrowBack, IoHomeOutline } from "react-icons/io5"
import { LuEdit } from "react-icons/lu";
import CityDropDown from './CityDropDown'
import { editProfile } from '../features/AuthDetailSlice';
import { handleWarningModal } from '../features/AppSlice';

const PageHeader = (props) => {
    const {
        title
    } = props

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const path = location.pathname === '/scheduleByMovie' || location.pathname === '/schedule'
    const signInPath = location.pathname === '/myaccount'
    const ticketPath = location.pathname === '/ticket'
    const schedulePath = location.pathname === '/schedule'
    const profilePath = location.pathname === '/user-profile' 
    const paymentPath = location.pathname === '/payment' 

    const { isEdit } = useSelector((state) => state.auth)

    const goBack = () => {
        navigate(-1)
    }

    const navigateTo = (path) => {
        navigate(path)
    }

    return (
        <div className='flex flex-row justify-between p-5'>
            <div className='cursor-pointer' onClick={goBack}>
                {
                    !signInPath && !profilePath && !schedulePath && !ticketPath && <IoArrowBack size={25}/>
                }
            </div>
            <div>
                <span className='text-xl font-bold'>{title}</span>
            </div>
            {
                path ? 
                    <CityDropDown />
                :
                profilePath && !isEdit ?
                    <div className='cursor-pointer hover:text-sky-950' onClick={() => dispatch(editProfile())}>
                        <LuEdit size={25}/>
                    </div>
                :
                (profilePath && isEdit) ?
                    <span className='cursor-pointer' onClick={() => dispatch(editProfile())}>Cancel</span>
                :
                paymentPath ?
                    <span className='cursor-pointer' onClick={() => dispatch(handleWarningModal({isOpen:true, message:"Are you sure want to cancel this booking?"}))}>Cancel</span>
                :
                    <div className='cursor-pointer hover:text-sky-950 active:text-sky-950' onClick={() => navigateTo('/')}>
                        <IoHomeOutline size={25}/>
                    </div>
            }
        </div>
    )
}

export default PageHeader