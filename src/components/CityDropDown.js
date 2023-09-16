import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoCaretDown } from "react-icons/io5"
import { openPanel, displayList } from '../features/showDetailSlice'

const CityDropDown = () => {
    const dispatch = useDispatch()

    const { selectedCityName } = useSelector((state) => state.city)

    const handleSlidePanel = () => {
        dispatch(openPanel())
        dispatch(displayList({isShowDetail:false, isCityList:true, isTheaterList:false, isPayment:false}))
    }

    return (
        <div onClick={() => handleSlidePanel()}>
            <div className='flex flex-row items-center cursor-pointer'>
                <span className='mr-2'>{selectedCityName}</span>
                <IoCaretDown/>
            </div>
        </div>
    )
}

export default CityDropDown