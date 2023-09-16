import React,{ useState } from 'react'
import CityDropDown from './CityDropDown'

const MovieStatus = () => {
    const [currentStatus, setCurrentStatus] = useState('Playing')

    const statusTab = [
        {
            label: 'Playing'
        },
        {
            label: 'Upcoming'
        }
    ]

    return (
        <div className='flex flex-row p-2 justify-between'>
            <div className='flex flex-row ml-2'>
                {
                    statusTab.map((item, index) => (
                        <div key={index} className={`mr-1 cursor-pointer p-3 hover:text-sky-900 ${currentStatus === item.label ? 'font-bold text-sky-950 border-solid border-b-2 border-sky-950' : ''}`} onClick={() => setCurrentStatus(item.label)}>
                            <span>{item.label}</span>
                        </div>
                    ))
                }
            </div>
            <div className='p-3'>
                <CityDropDown/>
            </div>
        </div>
    )
}

export default MovieStatus