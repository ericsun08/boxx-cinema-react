import React from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { changeDate } from '../features/showDetailSlice'

const DatePicker = () => {
  const dispatch = useDispatch()

  const { selectedDate } = useSelector((state) => state.show)

  const todayDate = new Date()
  const endDate = new Date()
  const stopDate = endDate.setDate(endDate.getDate() + 5)

  const getNext5Days = (startDate, endDate) => {
    const date = new Date(startDate.getTime())

    let dates = []

    while (date <= endDate) {
        dates.push(moment(date).format('dddd, DD MMM YYYY'))
        date.setDate(date.getDate() + 1)
    }

    return dates 
  }

  const dateList = getNext5Days(todayDate, stopDate)

  const getDateString = (value) => {
    const dateString = value;
    const parts = dateString.split(" ");
    const day = parts[1];

    return day
  }

  const today = moment(new Date()).format('dddd, DD MMM YYYY')

  const handleChangeDate = (date) => {
    dispatch(changeDate(date))
  }

  return (
    <div>
        <div className='grid grid-cols-6'>
        {
            dateList.map((value, index) => 
                <div key={index} className='text-center' onClick={() => handleChangeDate(value)}>
                    <span className='text-gray-400'>{value === today ? 'Today' : value.slice(0,3)}</span>
                    <div className='mt-2 cursor-pointer'>
                        <span className={`hover:font-bold p-2 ${selectedDate === value ? 'bg-sky-950 text-slate-100 rounded-full font-bold' : ''}`}>{getDateString(value)}</span>
                    </div>
                </div>
            )
        }
        </div>
        <div className='mt-6 flex justify-center'>
            <span className='text-sm'>{selectedDate}</span>
        </div>
    </div>
  )
}

export default DatePicker
