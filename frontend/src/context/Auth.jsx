import { createContext, useReducer } from 'react'

const initialValue = {
  isAuthenticated: false
}

const reducerFunction = (state, action) => {
  switch (action.type) {
    case 'authenticated': {
      const { name, email } = action.payload

      return {
        isAuthenticated: true,
        user: {
          name,
          email
        }
      }
    }
    case 'unauthenticated':
      return {
        authenticated: false
      }
    default:
      return state
  }
}

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(reducerFunction, initialValue)

  return <AuthContext.Provider value={{ auth, dispatch }}>{children}</AuthContext.Provider>
}
