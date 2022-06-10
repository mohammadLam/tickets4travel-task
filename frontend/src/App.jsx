import React, { useContext } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './component/Navbar'

// Page
import Home from './page/Home'
import Signup from './page/Signup'
import SignIn from './page/Signin'
import Forgotpassword from './page/Forgotpassword'
import Profile from './page/Profile'

// Context
import { AuthContext } from './context/Auth'
import { AuthenticateRoute, UnauthenticatedRoute } from './route/Auth'

axios.defaults.baseURL = 'http://localhost:3001/api'

function App() {
  const { auth, dispatch } = useContext(AuthContext)

  // when page refresh then this request will send to database to get user data
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data, status } = await axios.get('/user/profile', { withCredentials: true })
        if (status === 200) {
          dispatch({ type: 'authenticated', payload: data })
        }
      } catch (error) {}
    }

    fetchUserInfo()
  }, [])

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<UnauthenticatedRoute />}>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgot-password' element={<Forgotpassword />} />
        </Route>

        <Route element={<AuthenticateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>

      <Toaster
        position='top-right'
        reverseOrder={false}
        gutter={8}
        containerClassName=''
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 2000,
          style: {
            background: '#363636',
            color: '#fff'
          },
          // Default options for specific types
          success: {
            duration: 2000,
            theme: {
              primary: 'green',
              secondary: 'black'
            }
          }
        }}
      />
    </BrowserRouter>
  )
}

export default App
