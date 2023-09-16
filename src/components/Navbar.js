import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { IoHomeOutline, IoHome, IoTicketOutline, IoTicket, IoPersonOutline, IoPerson } from "react-icons/io5"
import { BsCalendar2DateFill, BsCalendar2Date } from "react-icons/bs";
import { changeCurrentPath } from '../features/AppSlice'

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const { currentPath } = useSelector((state) => state.app)

    useEffect(() => {
        dispatch(changeCurrentPath(location.pathname))
    },[dispatch, location])

    const tabs = [
        { 
            label: 'Home', 
            icon: currentPath === '/' ? <IoHome size={23} className='mb-1' /> : <IoHomeOutline size={23} className='mb-1' />, 
            navigate:'/' 
        },
        { 
            label: 'Schedule', 
            icon: currentPath === '/schedule' ? <BsCalendar2DateFill size={23} className='mb-1' /> : <BsCalendar2Date size={23} className='mb-1' />, 
            navigate:'/schedule' 
        },
        { 
            label: 'Ticket', 
            icon: currentPath === '/ticket' ? <IoTicket size={23} className='mb-1' /> : <IoTicketOutline size={23} className='mb-1' />, 
            navigate:'/ticket' 
        },
        { 
            label: 'MyAccount', 
            icon: currentPath === '/user-profile' ? <IoPerson size={23} className='mb-1' /> : <IoPersonOutline size={23} className='mb-1' />, 
            navigate:'/myaccount' 
        },
    ];

    const navigatePage = (page) => {
        navigate(page)
    }

    return (
        <nav className='fixed bottom-0 left-0 right-0 w-full h-17 flex justify-center' style={{zIndex:100}}>
            <div className='bg-slate-200 p-2 pb-3' style={{width:'600px'}}>
                <ul className='grid grid-cols-4'>
                    {tabs.map((tab) => (
                        <li
                            key={tab.label}
                            className={`text-center flex flex-col items-center cursor-pointer hover:text-sky-950 ${
                                currentPath === tab.navigate ? 'text-sky-950' : ''
                            }`}
                            onClick={() => {dispatch(changeCurrentPath(tab.navigate)); navigatePage(tab.navigate)}}
                        >
                            {tab.icon}
                            <span className='text-sm'>{tab.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar