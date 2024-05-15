import React from 'react'

const Button = ({className, onClick, type, children, ...props}) => {

    const classes = `flex justify-center text-white font-bold items-center bg-light-button py-2 px-4 rounded-md ${className || ""}`

  return (
    <button className={classes} type={type} onClick={onclick} {...props}>
        {children}
    </button>
  )
}

export default Button