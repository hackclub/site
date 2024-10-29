import { createContext, useContext, useState } from 'react'

const TeenagerLedContext = createContext({
  teenagerLed: 'false',
  setTeenagerLed: () => {}
})
const useTeenagerLedContext = () => useContext(TeenagerLedContext)

const TeenagerLedProvider = ({ children }) => {
  const [teenagerLed, setTeenagerLed] = useState('false')

  return (
    <TeenagerLedContext.Provider value={{ teenagerLed, setTeenagerLed }}>
      {children}
    </TeenagerLedContext.Provider>
  )
}

export { TeenagerLedProvider, useTeenagerLedContext }
