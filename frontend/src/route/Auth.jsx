import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../context/Auth'

export const AuthenticateRoute = () => {
  const { auth } = useContext(AuthContext)

  return auth.isAuthenticated ? <Outlet /> : <Navigate to='/signin' />
}

export const UnauthenticatedRoute = () => {
  const { auth } = useContext(AuthContext)

  return auth.isAuthenticated ? <Navigate to='/profile' /> : <Outlet />
}
