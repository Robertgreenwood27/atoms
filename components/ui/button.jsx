import * as React from "react"

const Button = React.forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-500/30",
    outline: "border border-gray-600 bg-gray-800/50 hover:bg-gray-700 text-gray-200",
    ghost: "hover:bg-gray-800 text-gray-200",
    destructive: "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/30",
  };
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ''}`}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }