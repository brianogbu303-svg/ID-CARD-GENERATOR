import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/Form.css'

const Home:React.FC = () => {
  
  const navigate = useNavigate()
  return (

    <div className='text-black p-14 items-center bg-[url(../assets/ID_Background.jpg)] bg-no-repeat bg-cover h-dvh w-full flex flex-col text-2xl'>
      <div className='top-24 relative rounded-3xl bg-white/50 shadow-xl/40 p-28'>

        <div className='font-bold text-3xl'>
            DIGITAL ID CARD GENERATOR 
        </div>
        <div className='flex flex-col mt-2.5 items-center'>
            Generate your Digital ID Card 
            <div className='mt-4 p-1.5 w-[100px] font-semibold text-center text-shadow-black shadow-xl/20 bg-green-500 text-white rounded hover:bg-green-600 '>
               <button onClick={()=> navigate('./Form')}>Here</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home