import { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'

const useForm = (
  submitURL = '/',
  callback,
  options = { clearOnSubmit: 2000, method: 'post' }
) => {
  const [status, setStatus] = useState('default')
  const [data, setData] = useState({})
  const [touched, setTouched] = useState({})

  const onFieldChange = (e, name, type) => {
    e.persist()
    const value = e.target[type === 'checkbox' ? 'checked' : 'value']
    setData((data) => ({ ...data, [name]: value }))
  }

  useEffect(() => {
    setTouched(Object.keys(data))
  }, [data])

  const useField = (name, type = 'text', ...props) => {
    const checkbox = type === 'checkbox'
    const empty = checkbox ? false : ''
    const onChange = (e) => onFieldChange(e, name, type)
    const value = data[name]
    return {
      name,
      type: name === 'email' ? 'email' : type,
      [checkbox ? 'checked' : 'value']: value || empty,
      onChange,
      ...props
    }
  }

  const { method = 'post' } = options
  const action =
    submitURL?.startsWith('/') && process.env.NODE_ENV !== 'development'
      ? `https://v3.hackclub.com${submitURL}`
      : submitURL

  const onSubmit = (e) => {
    e.preventDefault()
    setStatus('submitting')
    fetch(action, {
      method,
      body: JSON.stringify(data)
    })
      .then((r) => r.json())
      .then((r) => {
        setStatus('success')
        if (callback) callback(r)
        setTimeout(() => setStatus('default'), 2000)
        if (options.clearOnSubmit) {
          setTimeout(() => setData({}), options.clearOnSubmit)
        }
      })
      .catch((e) => {
        console.error(e)
        setStatus('error')
      })
  }

  const formProps = { method, action, onSubmit }

  return { status, data, touched, useField, formProps }
}

export default useForm
