import React, { useContext } from 'react'
import Container from '../component/Container'
import { AuthContext } from '../context/Auth'

const Profile = () => {
  const { auth } = useContext(AuthContext)
  return (
    <Container>
      <div className='w-full md:w-[400px] px-8 py-5 border rounded-xl mx-auto mt-10 md:mt-32 bg-white'>
        <h1 className='text-2xl md:text-3xl font-bold mb-5 text-gray-800'>Profile:</h1>

        <div>
          <p>Username: {auth.user.name}</p>
          <p>Email: {auth.user.email}</p>
        </div>
      </div>
    </Container>
  )
}

export default Profile
