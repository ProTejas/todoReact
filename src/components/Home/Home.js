import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='flex justify-center'>
      <Link to='/sign-up' className='p-4 rounded bg-[#22c55e] '>Home</Link>
    </div>
  )
}

export default Home
