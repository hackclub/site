import { createContext, useContext, useState } from 'react'

const MultiStepContext = createContext()
const useMultiStepContext = () => useContext(MultiStepContext)

const MultiStepProvider = ({ children }) => {
  const [step, setStep] = useState(1)
  const modifyStep = direction => {
    setStep(step + direction) // either 1 or -1
  }

  return (
    <MultiStepContext.Provider value={{ step, modifyStep }}>
      {children}
    </MultiStepContext.Provider>
  )
}

export { MultiStepProvider, useMultiStepContext }
