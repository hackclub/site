// Full credit to https://joshwcomeau.com/snippets/react-hooks/use-has-mounted
import React from 'react'

function useHasMounted() {
  const [hasMounted, setHasMounted] = React.useState(false)
  React.useEffect(() => {
    setHasMounted(true)
  }, [])
  return hasMounted
}

export default useHasMounted
