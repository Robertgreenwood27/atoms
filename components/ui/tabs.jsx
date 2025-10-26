import * as React from "react"

const TabsContext = React.createContext()

const Tabs = ({ defaultValue, value, onValueChange, className, children, ...props }) => {
  const [selectedValue, setSelectedValue] = React.useState(defaultValue || value)
  
  const handleValueChange = (newValue) => {
    setSelectedValue(newValue)
    if (onValueChange) {
      onValueChange(newValue)
    }
  }

  return (
    <TabsContext.Provider value={{ value: value || selectedValue, onValueChange: handleValueChange }}>
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-800/50 backdrop-blur-sm p-1 text-gray-400 border border-gray-700 ${className || ''}`}
    {...props}
  />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef(({ className, value, ...props }, ref) => {
  const context = React.useContext(TabsContext)
  const isSelected = context.value === value

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={isSelected}
      onClick={() => context.onValueChange(value)}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-gray-900 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        isSelected 
          ? 'bg-gray-700 text-white shadow-sm shadow-purple-500/20' 
          : 'text-gray-400 hover:text-gray-200'
      } ${className || ''}`}
      {...props}
    />
  )
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef(({ className, value, ...props }, ref) => {
  const context = React.useContext(TabsContext)
  const isSelected = context.value === value

  if (!isSelected) return null

  return (
    <div
      ref={ref}
      role="tabpanel"
      className={`mt-2 ring-offset-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${className || ''}`}
      {...props}
    />
  )
})
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }