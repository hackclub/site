import { useState, useEffect } from 'react'

export default function useOrganizationI18n() {
  const [org, setOrg] = useState('Project')

  useEffect(() => {
    if (navigator.language === 'en-GB') setOrg('Project')
  }, [])

  return org
}
