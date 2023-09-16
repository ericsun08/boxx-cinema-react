import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MovieStatus from '../components/MovieStatus'
import { getAllMovieList } from '../features/movieDetailSlice'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { movies, loading } = useSelector((state) => state.movie)

    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        dispatch(getAllMovieList(searchValue))
    },[dispatch, searchValue])

    const navigatePage = (Page, MovieId) => {
        navigate(Page, {state: {MovieId:MovieId}})
    }

    return (
        <div className='scroll-div overflow-y-scroll scrollbar-none h-full pb-14'>
            <MovieStatus/>
            <div className='mt-4 mx-5'>
                <input placeholder='Search Movie' className='w-full p-2 border-solid border rounded focus:ring focus:outline-none' onChange={(e) => setSearchValue(e.target.value)}/>
            </div>
            <div className='grid grid-cols-2 gap-5 mt-6 mx-5'>
                {
                   !loading && movies && movies.map((value, idx) => 
                         (
                            <div key={idx} className='cursor-pointer mb-5'>
                                <div onClick={() => navigatePage('/movieDetail', value?.MovieId)}>
                                    <img className='mb-3 w-full object-cover rounded-lg drop-shadow-2xl' src={value?.ImageUrl} alt={value?.title}/>
                                    <span className='font-bold sm:text-sm text-xs'>{value?.Title.toUpperCase()}</span>
                                </div>
                                <div className='mt-5' >
                                    <button className='p-2 border-solid border rounded border-sky-950 text-sky-950 hover:bg-sky-950 hover:text-slate-100 active:bg-sky-950 active:text-slate-100' onClick={() => navigatePage('scheduleByMovie', value.MovieId)}>
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        )
                    )
                }
                {
                    loading &&
                    <>
                        <div className='mb-5'>
                            <Skeleton height={400}/>
                            <Skeleton width={'40%'} height={50} style={{marginTop: '20px'}}/>
                        </div>
                        <div className='mb-5'>
                            <Skeleton height={400}/>
                            <Skeleton width={'40%'} height={50} style={{marginTop: '20px'}}/>
                        </div>
                        <div className='mb-5'>
                            <Skeleton height={400}/>
                            <Skeleton width={'40%'} height={50} style={{marginTop: '20px'}}/>
                        </div>
                        <div className='mb-5'>
                            <Skeleton height={400}/>
                            <Skeleton width={'40%'} height={50} style={{marginTop: '20px'}}/>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Home