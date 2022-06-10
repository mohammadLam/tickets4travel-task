import axios from 'axios'
import React, { Fragment, useContext } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/Auth'
import Container from './Container'

const Navbar = () => {
  const { auth, dispatch } = useContext(AuthContext)
  const logout = async () => {
    try {
      const { status } = await axios.get('/auth/logout', { withCredentials: true })

      if (status === 200) {
        dispatch({ type: 'unauthenticated' })
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className='bg-white border-b'>
      <Container className='h-14 flex gap-x-5 justify-end items-center'>
        {auth.isAuthenticated ? (
          <Fragment>
            <Link to='/profile'>Profile</Link>
            <button className='text-red-500' onClick={logout}>
              Logout
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <Link to='/signin'>Sign In</Link>
            <Link to='/signup'>Sign Up</Link>
          </Fragment>
        )}
      </Container>
    </div>
  )
}

export default Navbar
