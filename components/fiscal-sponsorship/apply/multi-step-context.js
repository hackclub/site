import { createContext, useContext, useState } from 'react'

const MultiStepContext = createContext()
const useMultiStepContext = () => useContext(MultiStepContext)

const MultiStepProvider = ({ children }) => {
  const [step, setStep] = useState(0)

  const useStepper = steps => {
    const modifyStep = number => {
      const newStep = step + number

      // Guard against invalid step numbers
      if (newStep < 0 || newStep > steps.length - 1) {
        console.error(
          `[MultiStepProvider] Invalid new step number: ${newStep}. Current step number: ${step}`
        )
        return
      }

      setStep(newStep)
    }

    return {
      nextStep: () => modifyStep(1),
      previousStep: () => modifyStep(-1)
    }
  }

  return (
    <MultiStepContext.Provider value={{ step, useStepper }}>
      {children}
    </MultiStepContext.Provider>
  )
}

export { MultiStepProvider, useMultiStepContext }
