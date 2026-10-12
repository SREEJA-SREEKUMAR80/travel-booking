import React from 'react'
import { Link } from 'react-router-dom'

const Pnf = () => {
  return (
    <>
    <div className='flex justify-center items-center p-2'>
      <img src="https://cdn.dribbble.com/userupload/24450589/file/original-7a69eb5b87401ce59325c3291535aebc.gif" alt="oops" style={{height:"400px"}} />
       </div>
      <div className='text-white flex justify-center items-center '>
<Link to={"/"}>
          <button className='bg-black border border-gray-400 hover:bg-gray-700 p-4 rounded'>Back Home</button>
  
</Link>
</div>
    
    </>
  )
}

export default Pnf