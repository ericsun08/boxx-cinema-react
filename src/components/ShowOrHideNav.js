import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const ShowOrHideNav = ({children}) => {
    const location = useLocation()

    const isSignInOrRegister = location.pathname === '/myaccount' || location.pathname === '/Register' || location.pathname === '/seat-layout' || location.pathname === '/payment';

    const [showNavbar, setShowNavbar] = useState(!isSignInOrRegister)

    useEffect(() => {
        setShowNavbar(!isSignInOrRegister);
    },[location.pathname, isSignInOrRegister])

    return (
        <div>{showNavbar && children}</div>
    )
}

export default ShowOrHideNav