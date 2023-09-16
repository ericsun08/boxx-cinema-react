import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PageHeader from '../components/PageHeader'
import { getSavedMovie } from '../features/SavedMovieSlice'
import Skeleton from 'react-loading-skeleton'

const SavedMovie = () => {
  const dispatch = useDispatch()
  const { savedMovies, loading } = useSelector((state) => state.savedMovie)
  const { userInfo } = useSelector((state) => state.auth)

  const savedmovie = savedMovies?.data?.SavedMovie

  useEffect(() => {
    dispatch(getSavedMovie(userInfo.UserId))
  },[dispatch, userInfo])

  return (
    <div className='scroll-div overflow-y-scroll scrollbar-none h-full pb-16'>
      <PageHeader title='Saved Movie'/>
      <div className='mx-5 my-3'>
        {
          !loading && savedmovie?.map((value, index) => 
                <div key={index} className='flex py-5 border-b-2'>
                    <div className='w-28'>
                        <img className='rounded-lg drop-shadow-2xl' src={value.Movie.ImageUrl} alt={value.Movie.Title}/>
                    </div>
                    <div className='ml-5'>
                        <span className='font-semibold text-lg'>{value.Movie.Title}</span>
                        <div className='flex mt-6'>
                            <div className='flex flex-col'>
                                <span className='sm:text-sm text-xs'>Genre: </span>
                                <span className='sm:text-sm text-xs'>Duration: </span>
                                <span className='sm:text-sm text-xs'>Language: </span>
                            </div>
                            <div className='flex flex-col ml-5'>
                                <span className='sm:text-sm text-xs font-bold'>{value.Movie.Genre}</span>
                                <span className='sm:text-sm text-xs font-bold'>{value.Movie.Duration}m</span>
                                <span className='sm:text-sm text-xs font-bold'>{value.Movie.Language}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        {
          loading && 
          <>
            <div className='my-2 p-1'>
              <Skeleton height={150} count={5} style={{marginTop:'10px'}}/>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default SavedMovie
