import React from 'react'

const Input = props => {
  const { onChange, onBlur, placeholder, id, name, error } = props
  const className = error
    ? 'w-full px-3 py-2 border border-red-500 focus:border-red-500 text-red-500 rounded-lg outline-none'
    : 'w-full px-3 py-2 border focus:border-blue-500 text-gray-700 rounded-lg outline-none'

  return (
    <div className='mb-3'>
      <label htmlFor={id} className='text-sm text-gray-600'>
        {placeholder}
      </label>
      <input
        name={name}
        type={props.type || 'text'}
        onChange={onChange}
        onBlur={onBlur}
        className={className}
      />
      {error && <span className='text-sm text-red-500'>{error}</span>}
    </div>
  )
}

export default Input
