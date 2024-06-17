import React, { useState, useEffect } from 'react'
/** @jsxImportSource theme-ui */
const styled = `
@import url('https://fonts.googleapis.com/css2?family=Slackey&family=Emblema+One&family=Gaegu&display=swap');

.slackey {
  font-family: "Slackey", sans-serif;
 }

 .gaegu {
  font-family: "Gaegu", sans-serif;
}

body {
  background-color: #FAEFD6;
}

`
const Quantity = ({ lbl, numOptions, onQuantityChange, id }) => {
  const [options, setOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState('')

  useEffect(() => {
    // Generate options based on the provided number
    function generateArray(n) {
      return Array.from({ length: n }, (_, i) => i + 1)
    }

    // Example usage:
    const n = numOptions
    const options = generateArray(n)

    setOptions(options)
  }, [numOptions]) // Dependency array includes numOptions to regenerate options if it changes

  const handleChange = event => {
    setSelectedOption(event.target.value)
    onQuantityChange(id, parseInt(event.target.value))
  }

  return (
    <>
      <select
        id={`dropdown-${lbl}`}
        value={selectedOption}
        onChange={handleChange}
        sx={{
          display: 'block',
          mr: 2,
          backgroundColor: '#FFEEC6',
          borderRadius: '5px',
          border: 'none'
        }}
        className="gaegu"
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <style>{styled}</style>
    </>
  )
}

export default Quantity
