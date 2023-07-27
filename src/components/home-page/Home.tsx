import React from 'react'
import { useRouter } from 'next/router'
import RoutPath from '@/src/utils/routes'

const Home = () => {

    const router = useRouter()
  return (
    <div className='min-h-fit'>
        <div>
            <h2 className='text-blue-600'>Welcome to Movie Booking</h2>
        </div>
        <h5>Please login to book tickets for your favorite movies</h5>
        <div>
            <button onClick={() => router.push(RoutPath.LoginRoute) }>
                Login
            </button>
        </div>
    </div>
  )
}

export default Home