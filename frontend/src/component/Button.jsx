import React from 'react'

const Button = props => {
  const { children, type } = props
  return (
    <button
      type={type || 'button'}
      className='px-3 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600'
    >
      {children}
    </button>
  )
}

export default Button
